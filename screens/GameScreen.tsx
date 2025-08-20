import React, { useState, useEffect, useCallback } from 'react';
import { GameOptions, Difficulty, WordItem } from '../types';
import { WORDS_DATA } from '../data/words';
import { ROUND_REQUIREMENTS, POINTS, MISTAKE_PENALTY, TIME_CHALLENGE_SECONDS, TIME_BONUS_CORRECT, TIME_PENALTY_INCORRECT, TOTAL_ROUNDS_PER_LEVEL, STREAK_BONUS_THRESHOLD, STREAK_BONUS_POINTS } from '../constants';
import { useStats } from '../context/StatsContext';
import Timer from '../components/Timer';
import StatsDisplay from '../components/StatsDisplay';

interface GameScreenProps {
  options: GameOptions;
  onGameEnd: (stats: { mode: GameOptions['mode'], score: number; matches: number; level?: Difficulty; round?: number; }) => void;
  onExit: () => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

interface ColumnItem {
    id: string; // This is the WordItem id
    text: string;
    difficulty: Difficulty;
}

interface Selection {
    id: string;
    column: 'en' | 'ar';
}

// Maps a WordItem to a ColumnItem based on language
const toColumnItem = (word: WordItem, lang: 'ar' | 'en'): ColumnItem => ({
    id: word.id,
    text: word[lang],
    difficulty: word.difficulty,
});

const GameScreen: React.FC<GameScreenProps> = ({ options, onGameEnd, onExit }) => {
  const { mode, difficulty: initialDifficulty = 'easy', category } = options;
  const { addSessionStats } = useStats();

  const [sessionWordPool, setSessionWordPool] = useState<WordItem[]>([]);
  const [activeWords, setActiveWords] = useState<WordItem[]>([]);
  
  const [enColumn, setEnColumn] = useState<ColumnItem[]>([]);
  const [arColumn, setArColumn] = useState<ColumnItem[]>([]);
  
  const [selection, setSelection] = useState<Selection | null>(null);
  const [feedback, setFeedback] = useState<Record<string, 'correct' | 'incorrect' | 'hint'>>({});
  const [isInteractionDisabled, setIsInteractionDisabled] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const [score, setScore] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const [matchesThisRound, setMatchesThisRound] = useState(0);
  const [streak, setStreak] = useState(0);

  const [level, setLevel] = useState<Difficulty>(initialDifficulty);
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(TIME_CHALLENGE_SECONDS);
  const [timeAdjustment, setTimeAdjustment] = useState(0);
  const [timeAdjustmentKey, setTimeAdjustmentKey] = useState(0);

  const difficultyLevels: Difficulty[] = ['easy', 'medium', 'hard'];

  const setupNewRound = useCallback((isNewLevel = false) => {
    setSelection(null);
    setFeedback({});
    setIsInteractionDisabled(false);

    let wordPool: WordItem[] = [];
    const numPairs = mode === 'time' ? ROUND_REQUIREMENTS[level] : (mode === 'category' ? 8 : 10);
    
    if (mode === 'time') {
      wordPool = shuffleArray(WORDS_DATA.filter(w => w.difficulty === level));
    } else if (mode === 'category' && category) {
      wordPool = shuffleArray(WORDS_DATA.filter(w => w.category === category));
    } else { 
      wordPool = shuffleArray(WORDS_DATA);
    }
    
    const initialWords = wordPool.slice(0, numPairs);
    const remainingPool = wordPool.slice(numPairs);

    setActiveWords(initialWords);
    setSessionWordPool(remainingPool);
    setMatchesThisRound(0);

    if (isNewLevel && mode === 'time') {
        setTimeLeft(TIME_CHALLENGE_SECONDS);
    }
  }, [mode, level, category]);

  useEffect(() => {
    setupNewRound(true);
  }, [level, setupNewRound]);

  useEffect(() => {
    setEnColumn(activeWords.map(word => toColumnItem(word, 'en')));
    setArColumn(shuffleArray(activeWords.map(word => toColumnItem(word, 'ar'))));
  }, [activeWords]);


  useEffect(() => {
    if (mode !== 'time') return;
    if (timeLeft <= 0) {
        addSessionStats(score, totalMatches);
        onGameEnd({ mode, score, matches: totalMatches, level, round });
        return;
    }
    const timerId = setInterval(() => setTimeLeft(prev => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(timerId);
  }, [mode, timeLeft, onGameEnd, score, totalMatches, level, round, addSessionStats]);

  useEffect(() => {
    if (mode !== 'time' || matchesThisRound < ROUND_REQUIREMENTS[level]) return;

    if (round < TOTAL_ROUNDS_PER_LEVEL) {
        setRound(r => r + 1);
        setupNewRound();
    } else {
        const currentLevelIndex = difficultyLevels.indexOf(level);
        if (currentLevelIndex < difficultyLevels.length - 1) {
            setLevel(difficultyLevels[currentLevelIndex + 1]);
            setRound(1);
        } else {
            addSessionStats(score, totalMatches);
            onGameEnd({ mode, score, matches: totalMatches, level, round });
        }
    }
  }, [matchesThisRound, mode, level, round, score, totalMatches, addSessionStats, onGameEnd, difficultyLevels, setupNewRound]);

  const handleItemClick = (item: ColumnItem, column: 'en' | 'ar') => {
      if (isInteractionDisabled) return;

      if (!selection) {
          setSelection({ id: item.id, column });
          return;
      }

      if (selection.column === column) {
          setSelection({ id: item.id, column });
          return;
      }

      const isMatch = item.id === selection.id;
      const wordId = selection.id;
      setIsInteractionDisabled(true);

      if (isMatch) {
          setFeedback({ [wordId]: 'correct' });

          if (mode === 'time') {
              setTimeLeft(t => t + TIME_BONUS_CORRECT);
              setTimeAdjustment(TIME_BONUS_CORRECT);
              setTimeAdjustmentKey(k => k + 1);
          }

          setTimeout(() => {
              const matchedWord = activeWords.find(w => w.id === wordId);
              if (!matchedWord) { 
                  setIsInteractionDisabled(false);
                  return;
              }

              const newStreak = streak + 1;
              setStreak(newStreak);
              let pointsToAdd = POINTS[matchedWord.difficulty];
              if (newStreak > 0 && newStreak % STREAK_BONUS_THRESHOLD === 0) {
                  pointsToAdd += STREAK_BONUS_POINTS;
              }
              setScore(prev => prev + pointsToAdd);
              setTotalMatches(prev => prev + 1);

              let newWords = [...activeWords];
              const matchIndex = newWords.findIndex(w => w.id === wordId);
              if (sessionWordPool.length > 0) {
                  const newWord = sessionWordPool[0];
                  newWords[matchIndex] = newWord;
                  setSessionWordPool(pool => pool.slice(1));
              } else {
                  newWords.splice(matchIndex, 1);
              }
              setActiveWords(newWords);

              setSelection(null);
              setFeedback({});
              setIsInteractionDisabled(false);
              
              if (mode === 'time') {
                  setMatchesThisRound(m => m + 1);
              } else if (newWords.length === 0) {
                  setupNewRound();
              }
          }, 400);

      } else { // Incorrect match
          setStreak(0);
          setScore(prev => prev + MISTAKE_PENALTY);
          setFeedback({
              [item.id]: 'incorrect',
              [wordId]: 'hint',
          });

          if (mode === 'time') {
              setTimeLeft(t => Math.max(0, t + TIME_PENALTY_INCORRECT));
              setTimeAdjustment(TIME_PENALTY_INCORRECT);
              setTimeAdjustmentKey(k => k + 1);
          }

          setTimeout(() => {
              if (column === 'ar') {
                setArColumn(c => shuffleArray(c));
              } else {
                setEnColumn(c => shuffleArray(c));
              }
              setFeedback({});
              setSelection(null);
              setIsInteractionDisabled(false);
          }, 1000);
      }
  };

  const handleExit = () => {
    if (mode === 'time') {
      setShowExitConfirm(true);
    } else {
      if (totalMatches > 0) {
        addSessionStats(score, totalMatches);
      }
      onExit();
    }
  };

  const ExitConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-sm text-center shadow-2xl">
            <h3 className="text-xl font-bold mb-4">هل أنت متأكد؟</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                ستفقد كل تقدمك في هذا التحدي إذا خرجت الآن.
            </p>
            <div className="flex justify-center gap-4">
                <button 
                    onClick={() => setShowExitConfirm(false)} 
                    className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-semibold py-2 px-4 rounded-lg transition-all"
                >
                    البقاء
                </button>
                <button 
                    onClick={onExit}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                    خروج
                </button>
            </div>
        </div>
    </div>
  );

  const ColumnItemComponent = ({ item, column, isSelected }: { item: ColumnItem, column: 'en' | 'ar', isSelected: boolean }) => {
    const feedbackType = feedback[item.id];
    const baseClasses = "w-full text-center p-3 my-1.5 rounded-lg border-2 transition-all duration-200 font-semibold text-lg cursor-pointer disabled:cursor-not-allowed";
    
    let stateClasses = "bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-sky-500 dark:hover:border-sky-400";
    if (isSelected) {
        stateClasses = "ring-4 ring-sky-400 border-sky-500";
    }

    if(feedbackType === 'correct') {
        stateClasses = "bg-green-500 border-green-600 text-white animate-pulse";
    } else if (feedbackType === 'incorrect') {
        stateClasses = "bg-red-500 border-red-600 text-white animate-shake";
    } else if (feedbackType === 'hint') {
        stateClasses = "bg-green-500 border-green-600 text-white";
    }
    
    const langFont = column === 'en' ? 'font-mono' : 'font-serif';

    return (
        <button
            onClick={() => handleItemClick(item, column)}
            className={`${baseClasses} ${langFont} ${stateClasses}`}
        >
            {item.text}
        </button>
    );
  };

  return (
    <div className="flex flex-col h-full max-h-screen">
        {showExitConfirm && <ExitConfirmationModal />}
        <header className="flex justify-between items-center mb-2 md:mb-4">
            <h2 className="text-xl md:text-2xl font-bold">{
                mode === 'time' ? 'تحدي الوقت' : mode === 'category' ? `فئة: ${category}` : 'وضع التدريب'
            }</h2>
            <button onClick={handleExit} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">
                خروج
            </button>
        </header>

        {mode === 'time' && (
            <Timer key={timeAdjustmentKey} timeLeft={timeLeft} initialTime={TIME_CHALLENGE_SECONDS} timeAdjustment={timeAdjustment} />
        )}
        
        <StatsDisplay
            score={score}
            matches={totalMatches}
            level={mode === 'time' ? level : undefined}
            round={mode === 'time' ? round : undefined}
            streak={streak}
        />
      
      <div className="flex-grow grid grid-cols-2 gap-4 md:gap-8 overflow-y-auto pb-4">
          <div className="flex flex-col">
            {enColumn.map(item => (
              <ColumnItemComponent key={`en-${item.id}`} item={item} column="en" isSelected={selection?.id === item.id && selection.column === 'en'} />
            ))}
          </div>
          <div className="flex flex-col">
            {arColumn.map(item => (
              <ColumnItemComponent key={`ar-${item.id}`} item={item} column="ar" isSelected={selection?.id === item.id && selection.column === 'ar'} />
            ))}
          </div>
        </div>
    </div>
  );
};

export default GameScreen;