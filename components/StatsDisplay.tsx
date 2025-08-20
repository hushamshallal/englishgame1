import React from 'react';
import { FireIcon } from '@heroicons/react/24/solid';

interface StatItemProps {
  label: string;
  value: string | number;
  children?: React.ReactNode;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, children }) => (
  <div className="flex flex-col items-center justify-center bg-slate-200 dark:bg-slate-800 p-3 rounded-lg text-center">
    <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
      {children}
      {label}
    </span>
    <span className={`text-xl font-bold ${children ? 'text-orange-500 dark:text-orange-400' : 'text-sky-600 dark:text-sky-400'}`}>{value}</span>
  </div>
);


interface StatsDisplayProps {
  score: number;
  matches: number;
  level?: string;
  round?: number;
  streak?: number;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ score, matches, level, round, streak }) => {
  const showStreak = streak && streak > 1;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 my-4">
      <StatItem label="النقاط" value={score} />
      <StatItem label="المطابقات" value={matches} />
      
      {level && <StatItem label="المستوى" value={level} />}
      
      {round && (
        !showStreak ? (
          <StatItem label="الجولة" value={round} />
        ) : (
          <StatItem label="متتالية" value={streak}>
            <FireIcon className="w-4 h-4 mr-1 text-orange-500" />
          </StatItem>
        )
      )}

      {!level && !round && showStreak && (
          <StatItem label="متتالية" value={streak}>
            <FireIcon className="w-4 h-4 mr-1 text-orange-500" />
          </StatItem>
      )}
    </div>
  );
};

export default StatsDisplay;
