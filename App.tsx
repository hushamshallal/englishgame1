import React, { useState, useCallback } from 'react';
import { GameMode, Difficulty, Category, GameOptions, SessionStats } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { StatsProvider } from './context/StatsContext';
import { UserProvider, useUser } from './context/UserContext';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import GrammarGameScreen from './screens/GrammarGameScreen';
import ListeningGameScreen from './screens/ListeningGameScreen';
import ResultsScreen from './screens/ResultsScreen';
import CefrTestScreen from './screens/CefrTestScreen';
import CefrResultsScreen from './screens/CefrResultsScreen';
import { UserIcon } from '@heroicons/react/24/solid';

type Screen = 'home' | 'game' | 'results';

const NamePromptModal: React.FC<{ onSubmit: (name: string) => void; }> = ({ onSubmit }) => {
  const [inputName, setInputName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      onSubmit(inputName.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 w-full max-w-sm text-center shadow-2xl animate-scale-in-bounce">
        <UserIcon className="w-16 h-16 mx-auto text-sky-500 bg-sky-100 dark:bg-sky-900 rounded-full p-3 mb-4" />
        <h2 className="text-2xl font-bold mb-2">مرحباً بك في WordUp!</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">ما هو اسمك؟ سيتم استخدامه لتخصيص تجربتك.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="w-full text-center text-lg px-4 py-3 border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            placeholder="اكتب اسمك هنا"
            aria-label="Your name"
            required
          />
          <button
            type="submit"
            className="w-full mt-4 text-lg bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg transition-all active:scale-[0.98]"
          >
            حفظ و بدء اللعب
          </button>
        </form>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { name, setUserName } = useUser();
  const [screen, setScreen] = useState<Screen>('home');
  const [gameOptions, setGameOptions] = useState<GameOptions | null>(null);
  const [lastSessionStats, setLastSessionStats] = useState<SessionStats | null>(null);

  const handleNameSubmit = (newName: string) => {
    setUserName(newName);
  };

  const startGame = useCallback((options: GameOptions) => {
    setGameOptions(options);
    setScreen('game');
  }, []);

  const showResults = useCallback((stats: SessionStats) => {
    setLastSessionStats(stats);
    setScreen('results');
  }, []);

  const goHome = useCallback(() => {
    setGameOptions(null);
    setLastSessionStats(null);
    setScreen('home');
  }, []);

  const restartGame = useCallback(() => {
    if (gameOptions) {
      setGameOptions({ ...gameOptions });
      setScreen('game');
    } else {
      goHome();
    }
  }, [gameOptions, goHome]);

  const renderScreen = () => {
    switch (screen) {
      case 'game':
        if (gameOptions?.mode === 'grammar') {
            return <GrammarGameScreen options={gameOptions} onGameEnd={showResults} onExit={goHome} />;
        }
        if (gameOptions?.mode === 'listening') {
            return <ListeningGameScreen options={gameOptions} onGameEnd={showResults} onExit={goHome} />;
        }
        if (gameOptions?.mode === 'cefr-test') {
            return <CefrTestScreen options={gameOptions} onGameEnd={showResults} onExit={goHome} />;
        }
        return gameOptions && <GameScreen options={gameOptions} onGameEnd={showResults} onExit={goHome} />;
      case 'results':
        if (lastSessionStats?.mode === 'cefr-test') {
            return lastSessionStats && <CefrResultsScreen stats={lastSessionStats} onRestart={restartGame} onHome={goHome} />;
        }
        return lastSessionStats && <ResultsScreen stats={lastSessionStats} onRestart={restartGame} onHome={goHome} />;
      case 'home':
      default:
        return <HomeScreen onStartGame={startGame} />;
    }
  };

  return (
     <>
      {!name && <NamePromptModal onSubmit={handleNameSubmit} />}
      <div className="min-h-screen w-full font-sans transition-colors duration-300 flex flex-col">
        <main className="container mx-auto p-4 max-w-4xl flex-grow">
          {renderScreen()}
        </main>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <StatsProvider>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </StatsProvider>
    </ThemeProvider>
  );
};

export default App;