import React, { useMemo } from 'react';

const LEVEL_CLASS_NAMES = {
  NONE: 'github-level-0',
  FIRST_QUARTILE: 'github-level-1',
  SECOND_QUARTILE: 'github-level-2',
  THIRD_QUARTILE: 'github-level-3',
  FOURTH_QUARTILE: 'github-level-4'
};

const DAY_LABELS = [
  { label: 'Mon', row: 2 },
  { label: 'Wed', row: 4 },
  { label: 'Fri', row: 6 }
];

function formatDate(dateString, options) {
  if (!dateString) return '—';
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    ...options
  }).format(new Date(`${dateString}T00:00:00.000Z`));
}

function buildMonthPositions(months, weeks, periodEnd) {
  let previousWeek = -4;

  return months
    .filter((month) => month.firstDay <= periodEnd)
    .map((month) => {
      const weekIndex = weeks.findIndex((week) => (
        week.days.some((day) => day.date === month.firstDay)
        || (month.firstDay >= week.firstDay && month.firstDay <= week.days.at(-1)?.date)
      ));

      return { ...month, weekIndex };
    })
    .filter((month) => {
      if (month.weekIndex < 0 || month.weekIndex - previousWeek < 3) return false;
      previousWeek = month.weekIndex;
      return true;
    });
}

export default function ContributionHeatmap({ calendar, period }) {
  const monthPositions = useMemo(
    () => buildMonthPositions(calendar.months, calendar.weeks, period.to),
    [calendar.months, calendar.weeks, period.to]
  );

  const rangeLabel = `${formatDate(period.from, { month: 'short' })} ${period.year} – ${formatDate(period.to, { month: 'short' })} ${period.year}`;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          Contribution Activity <span className="text-slate-500 dark:text-slate-300">({rangeLabel})</span>
        </h3>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          <span>Less</span>
          {Object.values(LEVEL_CLASS_NAMES).map((className) => (
            <span key={className} className={`w-3 h-3 rounded-[3px] ${className}`} aria-hidden="true" />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2 github-scrollbar" aria-label={`GitHub contribution calendar for ${period.year}`}>
        <div className="min-w-max">
          <div
            className="relative h-6 ml-10"
            style={{ width: `${Math.max(calendar.weeks.length * 15, 1)}px` }}
            aria-hidden="true"
          >
            {monthPositions.map((month) => (
              <span
                key={`${month.year}-${month.name}-${month.firstDay}`}
                className="absolute top-0 text-[11px] text-slate-500 dark:text-slate-400 font-mono"
                style={{ left: `${month.weekIndex * 15}px` }}
              >
                {month.name.slice(0, 3)}
              </span>
            ))}
          </div>

          <div className="flex items-start gap-2">
            <div
              className="grid w-8 shrink-0 text-[10px] text-slate-500 dark:text-slate-400 font-mono"
              style={{ gridTemplateRows: 'repeat(7, 12px)', gap: '3px' }}
              aria-hidden="true"
            >
              {DAY_LABELS.map((day) => (
                <span key={day.label} style={{ gridRow: day.row }} className="leading-3">
                  {day.label}
                </span>
              ))}
            </div>

            <div className="flex gap-[3px]" role="grid">
              {calendar.weeks.map((week) => {
                const daysByWeekday = new Map(week.days.map((day) => [day.weekday, day]));

                return (
                  <div key={week.firstDay} className="flex flex-col gap-[3px]" role="row">
                    {Array.from({ length: 7 }, (_, weekday) => {
                      const day = daysByWeekday.get(weekday);

                      if (!day) {
                        return <span key={weekday} className="w-3 h-3" aria-hidden="true" />;
                      }

                      const activityLabel = day.count === 1 ? 'contribution' : 'contributions';
                      return (
                        <span
                          key={day.date}
                          role="gridcell"
                          title={`${day.count} ${activityLabel} on ${formatDate(day.date, { month: 'short', day: 'numeric', year: 'numeric' })}`}
                          aria-label={`${day.count} ${activityLabel} on ${day.date}`}
                          className={`w-3 h-3 rounded-[3px] border border-black/5 transition-transform duration-200 hover:scale-125 ${LEVEL_CLASS_NAMES[day.level] || LEVEL_CLASS_NAMES.NONE}`}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
