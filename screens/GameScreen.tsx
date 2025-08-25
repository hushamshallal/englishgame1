
import React, { useState, useEffect, useCallback } from 'react';
import { GameOptions, Difficulty, WordItem, Category, SessionStats } from '../types';
import { WORDS_DATA } from '../data/words';
import { ROUND_REQUIREMENTS, POINTS, MISTAKE_PENALTY, TIME_CHALLENGE_SECONDS, TIME_BONUS_CORRECT, TIME_PENALTY_INCORRECT, TOTAL_ROUNDS_PER_LEVEL, STREAK_BONUS_THRESHOLD, STREAK_BONUS_POINTS } from '../constants';
import { useStats } from '../context/StatsContext';
import Timer from '../components/Timer';
import StatsDisplay from '../components/StatsDisplay';
import { StarIcon } from '@heroicons/react/24/solid';

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

const toColumnItem = (word: WordItem, lang: 'ar' | 'en'): ColumnItem => ({
    id: word.id,
    text: word[lang],
    difficulty: word.difficulty,
});

const getCategoryName = (catKey: Category) => {
    return catKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

const difficultyMap: Record<Difficulty, string> = {
    easy: 'السهل',
    medium: 'المتوسط',
    hard: 'الصعب',
};

const LevelTransitionScreen: React.FC<{ title: string; message: string; }> = ({ title, message }) => (
    <div className="fixed inset-0 bg-slate-900/70 dark:bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-fade-in p-4">
        <div className="bg-slate-800/30 dark:bg-black/40 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center animate-scale-in-bounce">
            <div>
                <StarIcon 
                    className="w-24 h-24 sm:w-28 sm:h-28 text-amber-400 mx-auto animate-star-pulse" 
                    style={{filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.7))'}} 
                />
            </div>
            <h2 
                className="text-3xl sm:text-4xl font-bold mt-6 mb-2 text-white animate-fade-in-up opacity-0"
                style={{ animationDelay: '0.3s' }}
            >
                {title}
            </h2>
            <p 
                className="text-lg sm:text-xl mt-2 text-slate-200 animate-fade-in-up opacity-0"
                style={{ animationDelay: '0.6s' }}
            >
                {message}
            </p>
            <div 
                className="mt-8 w-full bg-white/20 rounded-full h-3.5 overflow-hidden animate-fade-in opacity-0"
                style={{ animationDelay: '0.8s' }}
            >
                <div className="bg-gradient-to-r from-amber-400 to-yellow-500 h-full rounded-full animate-progress-fill"></div>
            </div>
        </div>
    </div>
);

const ExitConfirmationModal: React.FC<{ onClose: () => void; onConfirm: () => void; }> = ({ onClose, onConfirm }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md text-center shadow-2xl">
            <h3 className="text-xl font-bold mb-4">هل أنت متأكد؟</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                ستفقد كل تقدمك في هذا التحدي إذا خرجت الآن.
            </p>
            <div className="flex justify-center gap-4">
                <button 
                    onClick={onClose} 
                    className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-semibold py-2 px-4 rounded-lg transition-all active:scale-[0.98]"
                >
                    البقاء
                </button>
                <button 
                    onClick={onConfirm}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all active:scale-[0.98]"
                >
                    خروج
                </button>
            </div>
        </div>
    </div>
);

interface ColumnItemComponentProps {
    item: ColumnItem;
    column: 'en' | 'ar';
    isSelected: boolean;
    feedbackType: 'correct' | 'incorrect' | 'hint' | undefined;
    onClick: (item: ColumnItem, column: 'en' | 'ar') => void;
}

const ColumnItemComponent: React.FC<ColumnItemComponentProps> = React.memo(({ item, column, isSelected, feedbackType, onClick }) => {
    const baseClasses = "w-full text-center p-3 my-2 rounded-lg border-2 transition-all duration-200 font-semibold text-base md:text-lg cursor-pointer disabled:cursor-not-allowed active:scale-[0.98]";
    
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
            onClick={() => onClick(item, column)}
            className={`${baseClasses} ${langFont} ${stateClasses}`}
        >
            {item.text}
        </button>
    );
});

interface GameScreenProps {
  options: GameOptions;
  onGameEnd: (stats: SessionStats) => void;
  onExit: () => void;
}

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
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [matchesThisRound, setMatchesThisRound] = useState(0);
  const [streak, setStreak] = useState(0);

  const [level, setLevel] = useState<Difficulty>(initialDifficulty);
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(TIME_CHALLENGE_SECONDS);
  const [timeAdjustment, setTimeAdjustment] = useState(0);
  const [timeAdjustmentKey, setTimeAdjustmentKey] = useState(0);

  const [isLevelTransition, setIsLevelTransition] = useState(false);
  const [nextLevel, setNextLevel] = useState<Difficulty | null>(null);

  const difficultyLevels: Difficulty[] = ['easy', 'medium', 'hard'];

  const setupNewRound = useCallback((isNewLevel = false) => {
    setSelection(null);
    setFeedback({});
    setIsInteractionDisabled(false);

    const numPairs = 6;
    
    let wordPool: WordItem[] = [];
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
    if (mode !== 'time' || isLevelTransition) return;
    if (timeLeft <= 0) {
        addSessionStats(score, totalMatches, incorrectAttempts);
        onGameEnd({ mode, score, matches: totalMatches, incorrectAttempts, level, round });
        return;
    }
    const timerId = setInterval(() => setTimeLeft(prev => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(timerId);
  }, [mode, timeLeft, onGameEnd, score, totalMatches, incorrectAttempts, level, round, addSessionStats, isLevelTransition]);

  useEffect(() => {
    if (mode !== 'time' || matchesThisRound < ROUND_REQUIREMENTS[level]) return;

    if (round < TOTAL_ROUNDS_PER_LEVEL) {
        setRound(r => r + 1);
        setupNewRound();
    } else {
        const currentLevelIndex = difficultyLevels.indexOf(level);
        if (currentLevelIndex < difficultyLevels.length - 1) {
            const nextLvl = difficultyLevels[currentLevelIndex + 1];
            setNextLevel(nextLvl);
            setIsLevelTransition(true);
            setTimeout(() => {
                setLevel(nextLvl);
                setRound(1);
                setIsLevelTransition(false);
                setNextLevel(null);
            }, 3000);
        } else {
            addSessionStats(score, totalMatches, incorrectAttempts);
            onGameEnd({ mode, score, matches: totalMatches, incorrectAttempts, level, round, win: true });
        }
    }
  }, [matchesThisRound, mode, level, round, score, totalMatches, incorrectAttempts, addSessionStats, onGameEnd, difficultyLevels, setupNewRound]);

  const handleItemClick = useCallback((item: ColumnItem, column: 'en' | 'ar') => {
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
          setFeedback(f => ({ ...f, [wordId]: 'correct' }));

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
          setIncorrectAttempts(prev => prev + 1);
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
  }, [isInteractionDisabled, selection, mode, activeWords, streak, sessionWordPool, setupNewRound]);

  const handleExit = () => {
    if (mode === 'time') {
      setShowExitConfirm(true);
    } else {
      if (totalMatches > 0 || incorrectAttempts > 0) {
        addSessionStats(score, totalMatches, incorrectAttempts);
      }
      onExit();
    }
  };
  
  if (isLevelTransition && nextLevel) {
    const fromLevelText = difficultyMap[level];
    const toLevelText = difficultyMap[nextLevel];
    return <LevelTransitionScreen title={`أنهيت المستوى ${fromLevelText}!`} message={`استعد للمستوى التالي: ${toLevelText}`} />;
  }

  return (
    <div className="flex flex-col h-full">
        {showExitConfirm && <ExitConfirmationModal onClose={() => setShowExitConfirm(false)} onConfirm={onExit} />}
        <header className="flex justify-between items-center mb-2 md:mb-4">
            <h2 className="text-xl md:text-2xl font-bold">{
                mode === 'time' ? 'تحدي المطابقة' : mode === 'category' && category ? `فئة: ${getCategoryName(category)}` : 'تدريب المطابقة'
            }</h2>
            <button onClick={handleExit} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-transform active:scale-[0.98]">
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
      
      <div className="flex-grow grid grid-cols-2 gap-4 md:gap-6 overflow-y-auto pb-4">
          <div className="flex flex-col">
            {enColumn.map(item => (
              <ColumnItemComponent 
                key={`en-${item.id}`} 
                item={item} 
                column="en" 
                isSelected={selection?.id === item.id && selection.column === 'en'}
                feedbackType={feedback[item.id]}
                onClick={handleItemClick}
              />
            ))}
          </div>
          <div className="flex flex-col">
            {arColumn.map(item => (
              <ColumnItemComponent 
                key={`ar-${item.id}`} 
                item={item} 
                column="ar" 
                isSelected={selection?.id === item.id && selection.column === 'ar'} 
                feedbackType={feedback[item.id]}
                onClick={handleItemClick}
              />
            ))}
          </div>
        </div>
    </div>
  );
};

export default GameScreen;
