import React, { useMemo } from 'react';
import {
  CircleDot,
  GitBranch,
  GitCommitHorizontal,
  GitPullRequest,
  Star
} from 'lucide-react';

const MAX_VISIBLE_LANGUAGES = 5;

function compactLanguages(languages) {
  if (languages.length <= MAX_VISIBLE_LANGUAGES) return languages;

  const visible = languages.slice(0, MAX_VISIBLE_LANGUAGES);
  const remaining = languages.slice(MAX_VISIBLE_LANGUAGES);
  const other = remaining.reduce((summary, language) => ({
    ...summary,
    bytes: summary.bytes + language.bytes,
    percent: summary.percent + language.percent
  }), {
    name: 'Other',
    color: '#8B949E',
    bytes: 0,
    percent: 0
  });

  return [...visible, { ...other, percent: Number(other.percent.toFixed(2)) }];
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value || 0);
}

export function LanguagesCard({ languages }) {
  const visibleLanguages = useMemo(() => compactLanguages(languages), [languages]);

  return (
    <div className="github-detail-card group">
      <h3 className="text-xl sm:text-2xl font-bold text-indigo-500 dark:text-indigo-400 mb-6">
        My Programming Languages
      </h3>

      {visibleLanguages.length ? (
        <>
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 mb-6">
            {visibleLanguages.map((language) => (
              <span
                key={language.name}
                className="h-full transition-[width] duration-700 first:rounded-l-full last:rounded-r-full"
                style={{
                  width: `${language.percent}%`,
                  backgroundColor: language.color
                }}
                title={`${language.name}: ${language.percent.toFixed(2)}%`}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
            {visibleLanguages.map((language) => (
              <div key={language.name} className="flex items-center gap-2 min-w-0 text-xs sm:text-sm">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: language.color }}
                  aria-hidden="true"
                />
                <span className="truncate text-slate-600 dark:text-slate-300">{language.name}</span>
                <span className="ml-auto font-mono text-slate-500 dark:text-slate-400">
                  {language.percent.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="min-h-28 flex items-center justify-center text-sm text-slate-500 dark:text-slate-400">
          No public repository language data is available yet.
        </div>
      )}
    </div>
  );
}

function GradeRing({ grade }) {
  return (
    <div
      className="relative w-28 h-28 rounded-full p-2 shrink-0"
      style={{
        background: `conic-gradient(#818CF8 ${grade.score * 3.6}deg, rgba(129, 140, 248, 0.16) 0deg)`
      }}
      title="Derived portfolio activity score; this is not an official GitHub grade."
    >
      <div className="w-full h-full rounded-full bg-white dark:bg-slate-950 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800">
        <span className="text-3xl font-black text-slate-900 dark:text-white">{grade.label}</span>
        <span className="text-[9px] uppercase tracking-widest text-slate-500 dark:text-slate-400">Activity</span>
      </div>
    </div>
  );
}

export function GitHubStatisticsCard({ year, yearStats, profileStats, grade }) {
  const rows = [
    { label: 'Total Stars', value: profileStats.stars, icon: Star },
    { label: `Total Commits (${year})`, value: yearStats.commits, icon: GitCommitHorizontal },
    { label: 'Total Pull Requests', value: profileStats.pullRequests, icon: GitPullRequest },
    { label: 'Total Issues', value: profileStats.issues, icon: CircleDot },
    { label: 'Contributed To', value: profileStats.contributedTo, icon: GitBranch }
  ];

  return (
    <div className="github-detail-card group">
      <h3 className="text-xl sm:text-2xl font-bold text-indigo-500 dark:text-indigo-400 mb-5">
        My GitHub Statistics
      </h3>

      <div className="flex flex-col sm:flex-row sm:items-center gap-7">
        <div className="flex-1 space-y-3.5 w-full">
          {rows.map((row) => {
            const Icon = row.icon;
            return (
              <div key={row.label} className="grid grid-cols-[20px_1fr_auto] items-center gap-2.5 text-sm">
                <Icon className="w-[18px] h-[18px] text-teal-500" />
                <span className="font-semibold text-slate-600 dark:text-slate-300">{row.label}</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {formatNumber(row.value)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="self-center sm:self-auto">
          <GradeRing grade={grade} />
        </div>
      </div>
    </div>
  );
}
