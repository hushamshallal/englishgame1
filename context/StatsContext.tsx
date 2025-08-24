import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { GrammarStats, ListeningStats } from '../types';

interface Stats {
  totalPoints: number;
  totalMatches: number;
  totalIncorrectAttempts: number;
  totalSessionsPlayed: number;
}

interface StatsContextType extends Stats {
  addSessionStats: (points: number, matches: number, incorrectAttempts: number) => void;
  resetStats: () => void;
  grammarStats: GrammarStats;
  addGrammarSessionStats: (session: { score: number, correct: number, incorrect: number, topicPerformance: Record<string, 'correct' | 'incorrect'> }) => void;
  listeningStats: ListeningStats;
  addListeningSessionStats: (session: { score: number, correct: number, incorrect: number }) => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

const INITIAL_STATS: Stats = { 
  totalPoints: 0, 
  totalMatches: 0,
  totalIncorrectAttempts: 0,
  totalSessionsPlayed: 0,
};

const INITIAL_GRAMMAR_STATS: GrammarStats = {
  totalPoints: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  topicStats: {},
};

const INITIAL_LISTENING_STATS: ListeningStats = {
  totalPoints: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
};

export const StatsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stats, setStats] = useLocalStorage<Stats>('em_stats', INITIAL_STATS);
  const [grammarStats, setGrammarStats] = useLocalStorage<GrammarStats>('em_grammar_stats', INITIAL_GRAMMAR_STATS);
  const [listeningStats, setListeningStats] = useLocalStorage<ListeningStats>('em_listening_stats', INITIAL_LISTENING_STATS);

  const addSessionStats = useCallback((points: number, matches: number, incorrectAttempts: number) => {
    setStats(prevStats => ({
      totalPoints: prevStats.totalPoints + points,
      totalMatches: prevStats.totalMatches + matches,
      totalIncorrectAttempts: prevStats.totalIncorrectAttempts + incorrectAttempts,
      totalSessionsPlayed: prevStats.totalSessionsPlayed + 1,
    }));
  }, [setStats]);

  const addGrammarSessionStats = useCallback((session: { score: number, correct: number, incorrect: number, topicPerformance: Record<string, 'correct' | 'incorrect'> }) => {
    setGrammarStats(prev => {
      const newTopicStats = { ...prev.topicStats };
      for (const [topic, result] of Object.entries(session.topicPerformance)) {
        if (!newTopicStats[topic]) {
          newTopicStats[topic] = { correct: 0, incorrect: 0 };
        }
        if (result === 'correct') {
          newTopicStats[topic].correct += 1;
        } else {
          newTopicStats[topic].incorrect += 1;
        }
      }

      return {
        totalPoints: prev.totalPoints + session.score,
        totalCorrect: prev.totalCorrect + session.correct,
        totalIncorrect: prev.totalIncorrect + session.incorrect,
        topicStats: newTopicStats,
      };
    });
  }, [setGrammarStats]);
  
  const addListeningSessionStats = useCallback((session: { score: number, correct: number, incorrect: number }) => {
    setListeningStats(prev => ({
      totalPoints: prev.totalPoints + session.score,
      totalCorrect: prev.totalCorrect + session.correct,
      totalIncorrect: prev.totalIncorrect + session.incorrect,
    }));
  }, [setListeningStats]);

  const resetStats = useCallback(() => {
    setStats(INITIAL_STATS);
    setGrammarStats(INITIAL_GRAMMAR_STATS);
    setListeningStats(INITIAL_LISTENING_STATS);
  }, [setStats, setGrammarStats, setListeningStats]);

  return (
    <StatsContext.Provider value={{ ...stats, addSessionStats, resetStats, grammarStats, addGrammarSessionStats, listeningStats, addListeningSessionStats }}>
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