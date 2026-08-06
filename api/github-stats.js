const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';
const CACHE_CONTROL = 'public, s-maxage=3600, stale-while-revalidate=86400, stale-if-error=86400';
const SERVER_CACHE_TTL = 60 * 60 * 1000;
const SERVER_STALE_TTL = 24 * 60 * 60 * 1000;

let serverCache = null;

class GitHubApiError extends Error {
  constructor(message, statusCode = 502, retryAfter = null) {
    super(message);
    this.name = 'GitHubApiError';
    this.statusCode = statusCode;
    this.retryAfter = retryAfter;
  }
}

const OVERVIEW_QUERY = `
  query GitHubOverview($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      login
      url
      createdAt
      contributionsCollection(from: $from, to: $to) {
        contributionYears
        contributionCalendar {
          totalContributions
          months {
            name
            firstDay
            totalWeeks
            year
          }
          weeks {
            firstDay
            contributionDays {
              date
              weekday
              contributionCount
              contributionLevel
            }
          }
        }
        totalCommitContributions
      }
      pullRequests(first: 1) {
        totalCount
      }
      issues(first: 1) {
        totalCount
      }
      repositoriesContributedTo(
        first: 1
        includeUserRepositories: true
        contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]
      ) {
        totalCount
      }
    }
  }
`;

const REPOSITORIES_QUERY = `
  query GitHubRepositories($login: String!, $after: String) {
    user(login: $login) {
      repositories(
        first: 100
        after: $after
        ownerAffiliations: [OWNER]
        privacy: PUBLIC
        isFork: false
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          stargazerCount
          languages(first: 100, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;

async function githubGraphQL(query, variables, token) {
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'vinit-portfolio'
    },
    body: JSON.stringify({ query, variables })
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload || payload.errors?.length) {
    const message = payload?.errors?.[0]?.message || `GitHub API request failed (${response.status})`;
    const remaining = response.headers.get('x-ratelimit-remaining');
    const resetTimestamp = Number(response.headers.get('x-ratelimit-reset')) * 1000;
    const isRateLimited = response.status === 429
      || (response.status === 403 && remaining === '0')
      || payload?.errors?.some((error) => error.type === 'RATE_LIMITED' || /rate limit/i.test(error.message));

    if (isRateLimited) {
      const retryAfter = Number.isFinite(resetTimestamp)
        ? Math.max(1, Math.ceil((resetTimestamp - Date.now()) / 1000))
        : 3600;
      throw new GitHubApiError(message, 429, retryAfter);
    }

    throw new GitHubApiError(message);
  }

  return payload.data;
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function startOfYear(year) {
  return `${year}-01-01T00:00:00.000Z`;
}

function endOfYear(year) {
  return `${year}-12-31T23:59:59.999Z`;
}

function addUtcDays(dateString, amount) {
  const date = new Date(`${dateString}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + amount);
  return isoDate(date);
}

function formatCalendar(calendar) {
  return {
    months: calendar.months,
    weeks: calendar.weeks.map((week) => ({
      firstDay: week.firstDay,
      days: week.contributionDays.map((day) => ({
        date: day.date,
        weekday: day.weekday,
        count: day.contributionCount,
        level: day.contributionLevel
      }))
    }))
  };
}

function flattenCalendar(calendar, from, to) {
  return calendar.weeks
    .flatMap((week) => week.contributionDays)
    .filter((day) => day.date >= from && day.date <= to)
    .map((day) => ({ date: day.date, count: day.contributionCount }));
}

function mergeContributionDays(calendars) {
  const merged = new Map();

  for (const calendar of calendars) {
    for (const day of calendar.days) {
      merged.set(day.date, Math.max(merged.get(day.date) || 0, day.count));
    }
  }

  return merged;
}

function calculateStreaks(dayMap, today) {
  const activeDates = [...dayMap.entries()]
    .filter(([, count]) => count > 0)
    .map(([date]) => date)
    .sort();

  if (!activeDates.length) {
    return {
      current: { days: 0, from: null, to: null },
      longest: { days: 0, from: null, to: null }
    };
  }

  let longestDays = 0;
  let longestFrom = null;
  let longestTo = null;
  let runningDays = 0;
  let runningFrom = null;
  let cursor = activeDates[0];

  while (cursor <= today) {
    if ((dayMap.get(cursor) || 0) > 0) {
      if (runningDays === 0) runningFrom = cursor;
      runningDays += 1;

      if (runningDays > longestDays) {
        longestDays = runningDays;
        longestFrom = runningFrom;
        longestTo = cursor;
      }
    } else {
      runningDays = 0;
      runningFrom = null;
    }

    cursor = addUtcDays(cursor, 1);
  }

  let currentTo = today;
  if ((dayMap.get(currentTo) || 0) === 0) {
    currentTo = addUtcDays(today, -1);
  }

  if ((dayMap.get(currentTo) || 0) === 0) {
    return {
      current: { days: 0, from: null, to: null },
      longest: { days: longestDays, from: longestFrom, to: longestTo }
    };
  }

  let currentDays = 0;
  let currentFrom = currentTo;
  let currentCursor = currentTo;

  while ((dayMap.get(currentCursor) || 0) > 0) {
    currentDays += 1;
    currentFrom = currentCursor;
    currentCursor = addUtcDays(currentCursor, -1);
  }

  return {
    current: { days: currentDays, from: currentFrom, to: currentTo },
    longest: { days: longestDays, from: longestFrom, to: longestTo }
  };
}

function buildHistoryQuery(years) {
  const variableDefinitions = years.flatMap((_, index) => [
    `$from${index}: DateTime!`,
    `$to${index}: DateTime!`
  ]);

  const collections = years.map((year, index) => `
    year${index}: contributionsCollection(from: $from${index}, to: $to${index}) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  `);

  return `
    query ContributionHistory($login: String!, ${variableDefinitions.join(', ')}) {
      user(login: $login) {
        ${collections.join('\n')}
      }
    }
  `;
}

async function fetchContributionHistory(years, token, login) {
  if (!years.length) return [];

  const variables = { login };
  years.forEach((year, index) => {
    variables[`from${index}`] = startOfYear(year);
    variables[`to${index}`] = endOfYear(year);
  });

  const data = await githubGraphQL(buildHistoryQuery(years), variables, token);

  return years.map((year, index) => {
    const calendar = data.user[`year${index}`].contributionCalendar;
    return {
      year,
      total: calendar.totalContributions,
      days: calendar.weeks.flatMap((week) => week.contributionDays)
        .filter((day) => day.date.startsWith(`${year}-`))
        .map((day) => ({ date: day.date, count: day.contributionCount }))
    };
  });
}

async function fetchRepositories(token, login) {
  const repositories = [];
  let after = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data = await githubGraphQL(REPOSITORIES_QUERY, {
      login,
      after
    }, token);

    const connection = data.user.repositories;
    repositories.push(...connection.nodes);
    hasNextPage = connection.pageInfo.hasNextPage;
    after = connection.pageInfo.endCursor;
  }

  return repositories;
}

function aggregateLanguages(repositories) {
  const languageMap = new Map();

  for (const repository of repositories) {
    for (const edge of repository.languages.edges) {
      const current = languageMap.get(edge.node.name) || {
        name: edge.node.name,
        color: edge.node.color || '#8B949E',
        bytes: 0
      };

      current.bytes += edge.size;
      languageMap.set(current.name, current);
    }
  }

  const totalBytes = [...languageMap.values()].reduce((sum, language) => sum + language.bytes, 0);

  return [...languageMap.values()]
    .sort((a, b) => b.bytes - a.bytes)
    .map((language) => ({
      ...language,
      percent: totalBytes ? Number(((language.bytes / totalBytes) * 100).toFixed(2)) : 0
    }));
}

function calculateGrade({ contributions, activePercent, stars, pullRequests, issues, contributedTo }) {
  const contributionScore = Math.min(40, (Math.log10(contributions + 1) / 3) * 40);
  const consistencyScore = Math.min(25, activePercent * 0.25);
  const collaborationScore = Math.min(20, ((pullRequests * 3) + issues + (contributedTo * 2)) * 0.4);
  const recognitionScore = Math.min(15, (Math.log10(stars + 1) / 2) * 15);
  const score = Math.max(0, Math.min(100, Math.round(
    contributionScore + consistencyScore + collaborationScore + recognitionScore
  )));

  const label = score >= 90
    ? 'S'
    : score >= 80
      ? 'A+'
      : score >= 70
        ? 'A'
        : score >= 60
          ? 'B+'
          : score >= 50
            ? 'B'
            : score >= 35
              ? 'C'
              : 'D';

  return { label, score, algorithm: 'portfolio-v1', isDerived: true };
}

function elapsedDaysInYear(year, today) {
  const start = Date.UTC(year, 0, 1);
  const end = Date.parse(`${today}T00:00:00.000Z`);
  return Math.floor((end - start) / 86400000) + 1;
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.GITHUB_TOKEN;
  const login = process.env.GITHUB_USERNAME?.trim();

  if (!token || !login) {
    response.setHeader('Cache-Control', 'no-store');
    return response.status(503).json({
      error: 'GitHub activity configuration is unavailable.'
    });
  }

  if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(login)) {
    response.setHeader('Cache-Control', 'no-store');
    return response.status(500).json({ error: 'GitHub activity configuration is invalid.' });
  }

  const cachedAge = serverCache && serverCache.login === login
    ? Date.now() - serverCache.storedAt
    : Number.POSITIVE_INFINITY;

  if (cachedAge < SERVER_CACHE_TTL) {
    response.setHeader('Cache-Control', CACHE_CONTROL);
    response.setHeader('X-GitHub-Data', 'server-cache');
    return response.status(200).json(serverCache.payload);
  }

  try {
    const now = new Date();
    const today = isoDate(now);
    const year = now.getUTCFullYear();
    const from = startOfYear(year);
    const to = now.toISOString();

    const overviewData = await githubGraphQL(OVERVIEW_QUERY, {
      login,
      from,
      to
    }, token);

    if (!overviewData.user) {
      return response.status(404).json({ error: 'GitHub profile was not found.' });
    }

    const user = overviewData.user;
    const currentCollection = user.contributionsCollection;
    const currentCalendar = currentCollection.contributionCalendar;
    const previousYears = currentCollection.contributionYears
      .filter((contributionYear) => contributionYear < year)
      .sort((a, b) => a - b);

    const [repositories, history] = await Promise.all([
      fetchRepositories(token, login),
      fetchContributionHistory(previousYears, token, login)
    ]);

    const currentDays = flattenCalendar(currentCalendar, `${year}-01-01`, today);
    const calendars = [
      ...history,
      { year, total: currentCalendar.totalContributions, days: currentDays }
    ];
    const dayMap = mergeContributionDays(calendars);
    const streaks = calculateStreaks(dayMap, today);
    const activeDays = currentDays.filter((day) => day.count > 0).length;
    const observedDays = elapsedDaysInYear(year, today);
    const activePercent = observedDays ? Math.round((activeDays / observedDays) * 100) : 0;
    const bestDay = currentDays.reduce((best, day) => (
      day.count >= best.count ? day : best
    ), { date: null, count: 0 });
    const totalStars = repositories.reduce((sum, repository) => sum + repository.stargazerCount, 0);
    const lifetimeContributions = calendars.reduce((sum, calendar) => sum + calendar.total, 0);
    const firstActiveDate = [...dayMap.entries()]
      .filter(([, count]) => count > 0)
      .map(([date]) => date)
      .sort()[0] || null;

    const grade = calculateGrade({
      contributions: currentCalendar.totalContributions,
      activePercent,
      stars: totalStars,
      pullRequests: user.pullRequests.totalCount,
      issues: user.issues.totalCount,
      contributedTo: user.repositoriesContributedTo.totalCount
    });

    const payload = {
      schemaVersion: 1,
      generatedAt: new Date().toISOString(),
      profile: {
        login: user.login,
        url: user.url
      },
      period: {
        year,
        from: `${year}-01-01`,
        to: today
      },
      yearStats: {
        contributions: currentCalendar.totalContributions,
        activeDays,
        observedDays,
        activePercent,
        bestDay,
        commits: currentCollection.totalCommitContributions
      },
      profileStats: {
        stars: totalStars,
        pullRequests: user.pullRequests.totalCount,
        issues: user.issues.totalCount,
        contributedTo: user.repositoriesContributedTo.totalCount
      },
      streaks,
      lifetime: {
        contributions: lifetimeContributions,
        from: firstActiveDate,
        to: today
      },
      calendar: formatCalendar(currentCalendar),
      languages: aggregateLanguages(repositories),
      grade
    };

    serverCache = {
      login,
      storedAt: Date.now(),
      payload
    };

    response.setHeader('Cache-Control', CACHE_CONTROL);
    response.setHeader('X-GitHub-Data', 'live');
    return response.status(200).json(payload);
  } catch (error) {
    console.error('GitHub stats request failed:', error.message);

    if (serverCache?.login === login && cachedAge < SERVER_STALE_TTL) {
      response.setHeader('Cache-Control', CACHE_CONTROL);
      response.setHeader('X-GitHub-Data', 'stale-cache');
      return response.status(200).json(serverCache.payload);
    }

    response.setHeader('Cache-Control', 'no-store');
    if (error.statusCode === 429) {
      response.setHeader('Retry-After', String(error.retryAfter || 3600));
      return response.status(429).json({
        error: 'GitHub rate limit reached. Please try again shortly.'
      });
    }

    return response.status(502).json({
      error: 'Unable to load GitHub activity right now.'
    });
  }
}
