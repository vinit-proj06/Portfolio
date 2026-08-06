import { useCallback, useEffect, useState } from 'react';

const CLIENT_CACHE_TTL = 5 * 60 * 1000;

let cachedStats = null;
let cachedAt = 0;
let pendingRequest = null;

async function requestGitHubStats(force = false) {
  const cacheIsFresh = cachedStats && (Date.now() - cachedAt) < CLIENT_CACHE_TTL;

  if (!force && cacheIsFresh) {
    return cachedStats;
  }

  if (!force && pendingRequest) {
    return pendingRequest;
  }

  pendingRequest = fetch('/api/github-stats', {
    headers: { Accept: 'application/json' }
  })
    .then(async (response) => {
      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload) {
        throw new Error(payload?.error || 'Unable to load GitHub activity.');
      }

      cachedStats = payload;
      cachedAt = Date.now();
      return payload;
    })
    .finally(() => {
      pendingRequest = null;
    });

  return pendingRequest;
}

export function useGitHubStats() {
  const [state, setState] = useState(() => ({
    data: cachedStats,
    loading: !cachedStats,
    error: null
  }));

  const load = useCallback(async (force = false) => {
    setState((current) => ({
      ...current,
      loading: !current.data,
      error: null
    }));

    try {
      const data = await requestGitHubStats(force);
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState((current) => ({
        ...current,
        loading: false,
        error: error.message
      }));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    ...state,
    retry: () => load(true)
  };
}
