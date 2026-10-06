import React from 'react';

export const TableSkeleton = ({ rows = 5, cols = 7 }) => {
  return (
    <div className="w-full divide-y divide-holly/10">
      {Array.from({ length: rows }).map((_, rIdx) => (
        <div key={rIdx} className="flex items-center px-6 py-4 gap-4 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-holly/10 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-holly/10 rounded w-1/4" />
            <div className="h-3 bg-holly/5 rounded w-1/3" />
          </div>
          <div className="h-4 bg-holly/10 rounded w-20 hidden md:block" />
          <div className="h-4 bg-holly/10 rounded w-24 hidden lg:block" />
          <div className="h-6 bg-holly/10 rounded-full w-20" />
          <div className="h-8 bg-holly/10 rounded-lg w-20" />
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="p-6 rounded-2xl bg-white border border-holly/10 animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-3 bg-holly/10 rounded w-1/3" />
        <div className="w-9 h-9 rounded-xl bg-holly/10" />
      </div>
      <div className="h-8 bg-holly/15 rounded w-1/2" />
      <div className="h-3 bg-holly/10 rounded w-2/3" />
    </div>
  );
};
