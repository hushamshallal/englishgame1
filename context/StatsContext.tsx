
import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface Stats {
  totalPoints: number;
  totalMatches: number;
}

interface StatsContextType extends Stats {
  addSessionStats: (points: number, matches: number) => void;
  resetStats: () => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

const INITIAL_STATS: Stats = { totalPoints: 0, totalMatches: 0 };

export const StatsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stats, setStats] = useLocalStorage<Stats>('em_stats', INITIAL_STATS);

  const addSessionStats = useCallback((points: number, matches: number) => {
    setStats(prevStats => ({
      totalPoints: prevStats.totalPoints + points,
      totalMatches: prevStats.totalMatches + matches,
    }));
  }, [setStats]);

  const resetStats = useCallback(() => {
    setStats(INITIAL_STATS);
  }, [setStats]);

  return (
    <StatsContext.Provider value={{ ...stats, addSessionStats, resetStats }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = (): StatsContextType => {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};
