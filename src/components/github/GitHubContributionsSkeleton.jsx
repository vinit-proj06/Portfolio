import React from 'react';

function SkeletonLine({ className = '' }) {
  return <div className={`github-skeleton rounded-lg ${className}`} aria-hidden="true" />;
}

export default function GitHubContributionsSkeleton() {
  return (
    <div className="github-shell" aria-label="Loading GitHub contribution data" aria-busy="true">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="github-stat-card min-h-32 flex flex-col items-center justify-center gap-3">
            <SkeletonLine className="w-20 h-8" />
            <SkeletonLine className="w-28 h-4" />
            <SkeletonLine className="w-16 h-3" />
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-5 min-h-52">
        <div className="flex items-center justify-between gap-4">
          <SkeletonLine className="w-64 h-5" />
          <SkeletonLine className="w-32 h-4" />
        </div>
        <div className="grid grid-cols-[32px_1fr] gap-3">
          <SkeletonLine className="h-28" />
          <div className="grid grid-cols-12 sm:grid-cols-[repeat(20,minmax(0,1fr))] lg:grid-cols-[repeat(32,minmax(0,1fr))] gap-1.5">
            {Array.from({ length: 112 }, (_, index) => (
              <SkeletonLine key={index} className="w-3 h-3 rounded-[3px]" />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-5 lg:gap-7 mt-9">
        {[0, 1].map((card) => (
          <div key={card} className="github-detail-card min-h-64 space-y-6">
            <SkeletonLine className="w-52 h-6" />
            <SkeletonLine className="w-full h-3 rounded-full" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }, (_, index) => (
                <SkeletonLine key={index} className="w-full h-4" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto mt-10 github-streak-card min-h-56 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            <SkeletonLine className="w-20 h-9" />
            <SkeletonLine className="w-28 h-4" />
            <SkeletonLine className="w-24 h-3" />
          </div>
        ))}
      </div>

      <SkeletonLine className="w-64 h-14 mx-auto mt-12 rounded-2xl" />
    </div>
  );
}
