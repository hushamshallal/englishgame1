import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { CefrResult, CefrLevel, CEFR_LEVELS_ORDER } from '../types';

interface UserProfile {
  name: string | null;
  cefrResult: CefrResult | null;
}

interface UserContextType extends UserProfile {
  setUserName: (name: string) => void;
  setCefrResult: (result: CefrResult) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const INITIAL_PROFILE: UserProfile = {
  name: null,
  cefrResult: null,
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useLocalStorage<UserProfile>('wordup_user_profile', INITIAL_PROFILE);

  const setUserName = useCallback((name: string) => {
    setProfile(p => ({ ...p, name }));
  }, [setProfile]);

  const setCefrResult = useCallback((newResult: CefrResult) => {
    setProfile(p => {
      if (!p.cefrResult || !p.cefrResult.finalLevel || p.cefrResult.finalLevel === 'Beginner') {
        return { ...p, cefrResult: newResult };
      }
      
      const oldLevelIndex = CEFR_LEVELS_ORDER.indexOf(p.cefrResult.finalLevel as CefrLevel);
      const newLevelIndex = CEFR_LEVELS_ORDER.indexOf(newResult.finalLevel as CefrLevel);

      if (newLevelIndex > oldLevelIndex) {
        return { ...p, cefrResult: newResult };
      }
      
      if (newLevelIndex === oldLevelIndex && newResult.levelPerformance[newResult.finalLevel as CefrLevel]) {
         const oldPerf = p.cefrResult.levelPerformance[p.cefrResult.finalLevel as CefrLevel];
         const newPerf = newResult.levelPerformance[newResult.finalLevel as CefrLevel];
         if (newPerf && oldPerf && newPerf.score > oldPerf.score) {
             return { ...p, cefrResult: newResult };
         }
      }

      return p; // Keep the old, better result
    });
  }, [setProfile]);

  return (
    <UserContext.Provider value={{ ...profile, setUserName, setCefrResult }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
