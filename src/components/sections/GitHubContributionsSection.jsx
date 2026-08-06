import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  ExternalLink,
  Flame,
  Github,
  RefreshCw,
  Trophy
} from 'lucide-react';
import { useGitHubStats } from '../../hooks/useGitHubStats';
import {
  ContributionHeatmap,
  GitHubContributionsSkeleton,
  GitHubStatisticsCard,
  LanguagesCard
} from '../github';

function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value || 0);
}

function formatDate(dateString, options = {}) {
  if (!dateString) return '—';
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
    ...options
  }).format(new Date(`${dateString}T00:00:00.000Z`));
}

function formatRange(from, to, presentLabel = false) {
  if (!from || !to) return 'No active streak';

  const startYear = from.slice(0, 4);
  const endYear = to.slice(0, 4);
  const start = formatDate(from, startYear !== endYear ? { year: 'numeric' } : {});
  const end = presentLabel ? 'Present' : formatDate(to);
  return `${start} – ${end}`;
}

function AnnualStatCard({ value, label, meta }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="github-stat-card min-h-32 flex flex-col items-center justify-center text-center"
    >
      <div className="text-3xl sm:text-4xl font-black text-emerald-500 font-mono tracking-tight">
        {formatNumber(value)}
      </div>
      <div className="mt-2 text-sm font-bold text-slate-800 dark:text-slate-100">{label}</div>
      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 font-mono">{meta}</div>
    </motion.div>
  );
}

function StreakSummary({ lifetime, streaks }) {
  const items = [
    {
      icon: Activity,
      value: lifetime.contributions,
      label: 'Total Contributions',
      meta: formatRange(lifetime.from, lifetime.to, true)
    },
    {
      icon: Flame,
      value: streaks.current.days,
      label: 'Current Streak',
      meta: formatRange(streaks.current.from, streaks.current.to)
    },
    {
      icon: Trophy,
      value: streaks.longest.days,
      label: 'Longest Streak',
      meta: formatRange(streaks.longest.from, streaks.longest.to)
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="github-streak-card max-w-2xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3"
    >
      {items.map((item, index) => {
        const Icon = item.icon;
        const isCurrent = index === 1;
        return (
          <div
            key={item.label}
            className={`relative px-6 py-7 flex flex-col items-center justify-center text-center ${
              index > 0 ? 'border-t md:border-t-0 md:border-l border-slate-700/50' : ''
            }`}
          >
            {isCurrent ? (
              <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex flex-col items-center justify-center mb-4 shadow-[0_0_28px_rgba(59,130,246,0.18)]">
                <Icon className="w-5 h-5 text-blue-500 mb-1" />
                <span className="text-3xl font-black font-mono text-blue-500">{formatNumber(item.value)}</span>
              </div>
            ) : (
              <>
                <Icon className="w-5 h-5 text-blue-500 mb-3" />
                <div className="text-3xl font-black font-mono text-blue-500 mb-3">
                  {formatNumber(item.value)}
                </div>
              </>
            )}
            <div className="font-bold text-blue-500">{item.label}</div>
            <div className="mt-3 text-[11px] text-cyan-700 dark:text-cyan-300/60 font-mono">{item.meta}</div>
          </div>
        );
      })}
    </motion.div>
  );
}

function ProfileButton({ url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="theme-inverse group mx-auto mt-12 w-fit flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 text-white font-bold shadow-xl shadow-purple-500/20 hover:shadow-purple-500/35 hover:-translate-y-1 transition-all"
    >
      <Github className="w-5 h-5" />
      <span>View Full GitHub Profile</span>
      <ExternalLink className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </a>
  );
}

function GitHubErrorState({ message, onRetry }) {
  return (
    <div className="github-shell">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {['Total Contributions', 'Current Streak', 'Best Day', 'Active Days'].map((label) => (
          <div key={label} className="github-stat-card min-h-32 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black text-slate-400">—</span>
            <span className="mt-2 text-sm font-bold text-slate-700 dark:text-slate-200">{label}</span>
          </div>
        ))}
      </div>

      <div className="min-h-72 mt-8 rounded-2xl border border-rose-500/20 bg-rose-500/5 flex flex-col items-center justify-center text-center px-6">
        <AlertCircle className="w-10 h-10 text-rose-400 mb-4" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">GitHub activity is unavailable</h3>
        <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
          {message || 'The live GitHub data could not be loaded right now.'}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-500 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}

export default function GitHubContributionsSection() {
  const { data, loading, error, retry } = useGitHubStats();

  return (
    <section id="github" className="py-24 relative z-10 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mx-auto opacity-70" />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-bold tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            <span>ACTIVITY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            GitHub <span className="text-gradient">Contributions</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Real-time contribution data from my GitHub profile
          </p>
        </div>

        {loading && !data && <GitHubContributionsSkeleton />}
        {!loading && error && !data && <GitHubErrorState message={error} onRetry={retry} />}

        {data && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.55 }}
            className="github-shell"
          >
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
              <AnnualStatCard
                value={data.yearStats.contributions}
                label="Total Contributions"
                meta={data.period.year}
              />
              <AnnualStatCard
                value={data.streaks.current.days}
                label="Current Streak"
                meta="Days"
              />
              <AnnualStatCard
                value={data.yearStats.bestDay.count}
                label="Best Day"
                meta={formatDate(data.yearStats.bestDay.date)}
              />
              <AnnualStatCard
                value={data.yearStats.activeDays}
                label="Active Days"
                meta={`${data.yearStats.activePercent}% of days`}
              />
            </div>

            <div className="mt-9">
              <ContributionHeatmap calendar={data.calendar} period={data.period} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-5 lg:gap-7 mt-10">
              <LanguagesCard languages={data.languages} />
              <GitHubStatisticsCard
                year={data.period.year}
                yearStats={data.yearStats}
                profileStats={data.profileStats}
                grade={data.grade}
              />
            </div>

            <StreakSummary lifetime={data.lifetime} streaks={data.streaks} />
            <ProfileButton url={data.profile.url} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
