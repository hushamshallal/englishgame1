
import React, { useState, useCallback } from 'react';
import { GameMode, Difficulty, Category, GameOptions, SessionStats } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { StatsProvider } from './context/StatsContext';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import ResultsScreen from './screens/ResultsScreen';

type Screen = 'home' | 'game' | 'results';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [gameOptions, setGameOptions] = useState<GameOptions | null>(null);
  const [lastSessionStats, setLastSessionStats] = useState<SessionStats | null>(null);

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
      // Create a new object to ensure re-render
      setGameOptions({ ...gameOptions });
      setScreen('game');
    } else {
      goHome();
    }
  }, [gameOptions, goHome]);

  const renderScreen = () => {
    switch (screen) {
      case 'game':
        return gameOptions && <GameScreen options={gameOptions} onGameEnd={showResults} onExit={goHome} />;
      case 'results':
        return lastSessionStats && <ResultsScreen stats={lastSessionStats} onRestart={restartGame} onHome={goHome} />;
      case 'home':
      default:
        return <HomeScreen onStartGame={startGame} />;
    }
  };

  return (
    <ThemeProvider>
      <StatsProvider>
        <div className="min-h-screen w-full font-sans transition-colors duration-300">
          <div className="container mx-auto p-4 max-w-4xl">
            {renderScreen()}
          </div>
        </div>
      </StatsProvider>
    </ThemeProvider>
  );
};

export default App;
