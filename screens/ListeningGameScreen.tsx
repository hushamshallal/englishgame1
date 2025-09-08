
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GameOptions, ListeningQuestion, SessionStats } from '../types';
import { useStats } from '../context/StatsContext';
import { LISTENING_POINTS_CORRECT, LISTENING_POINTS_INCORRECT, LISTENING_LEVEL_UP_THRESHOLD, LISTENING_INITIAL_LIVES } from '../constants';
import { SpeakerWaveIcon, StarIcon, LightBulbIcon, HeartIcon } from '@heroicons/react/24/solid';
import { LISTENING_QUESTIONS_DATA } from '../data/listeningWords';
import InstructionsModal from '../components/InstructionsModal';

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
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

interface ListeningGameScreenProps {
  options: GameOptions;
  onGameEnd: (stats: SessionStats) => void;
  onExit: () => void;
}

const ListeningGameScreen: React.FC<ListeningGameScreenProps> = ({ options, onGameEnd, onExit }) => {
    const { addListeningSessionStats } = useStats();

    const [showInstructions, setShowInstructions] = useState(true);
    const [questionPool, setQuestionPool] = useState<Record<number, ListeningQuestion[]>>({});
    const [questionIndices, setQuestionIndices] = useState<Record<number, number>>({});
    const [isLevelTransitioning, setIsLevelTransitioning] = useState(false);

    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [correctAnswersInLevel, setCorrectAnswersInLevel] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    
    const [isAnswered, setIsAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [lives, setLives] = useState(LISTENING_INITIAL_LIVES);
    const [isGameOver, setIsGameOver] = useState(false);
    
    useEffect(() => {
        const shuffledPool: Record<number, ListeningQuestion[]> = {};
        const initialIndices: Record<number, number> = {};
        const availableLevels = Object.keys(LISTENING_QUESTIONS_DATA).map(Number);
        
        for (const levelKey of availableLevels) {
            shuffledPool[levelKey] = shuffleArray(LISTENING_QUESTIONS_DATA[levelKey as keyof typeof LISTENING_QUESTIONS_DATA]);
            initialIndices[levelKey] = 0;
        }
        setQuestionPool(shuffledPool);
        setQuestionIndices(initialIndices);
        
        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);
    
    const currentQuestionIndex = questionIndices[level] ?? 0;
    const question = useMemo(() => {
        if (!questionPool[level] || Object.keys(questionPool).length === 0) {
            return null;
        }
        return questionPool[level][currentQuestionIndex] || null;
    }, [questionPool, level, currentQuestionIndex]);

    const endGame = useCallback(() => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        addListeningSessionStats({
            score: score,
            correct: correctAnswers,
            incorrect: incorrectAnswers,
        });
        onGameEnd({
            mode: 'listening',
            score: score,
            matches: correctAnswers,
            incorrectAttempts: incorrectAnswers,
            listeningLevel: level,
        });
    }, [score, correctAnswers, incorrectAnswers, level, addListeningSessionStats, onGameEnd]);
    
    const resetForNewQuestion = () => {
        setIsAnswered(false);
        setSelectedAnswer(null);
    };

    const handleNext = () => {
        resetForNewQuestion();
        const newIndex = (questionIndices[level] ?? 0) + 1;
        
        if (!questionPool[level] || newIndex >= questionPool[level].length) {
            endGame(); // Fallback if questions run out
            return;
        }

        setQuestionIndices(prev => ({
            ...prev,
            [level]: newIndex
        }));
    };

    const handleAnswer = (selected: string) => {
        if (isAnswered || !question || isGameOver) return;
        
        setIsAnswered(true);
        setSelectedAnswer(selected);
        const isCorrect = selected === question.correct_answer;

        if (isCorrect) {
            setScore(s => s + LISTENING_POINTS_CORRECT);
            setCorrectAnswers(c => c + 1);
            const newCorrectInLevel = correctAnswersInLevel + 1;
            const maxLevel = Math.max(...Object.keys(LISTENING_QUESTIONS_DATA).map(Number));

            if (level === maxLevel && newCorrectInLevel >= LISTENING_LEVEL_UP_THRESHOLD) {
                setIsGameOver(true);
                setTimeout(endGame, 2000);
            } else if (level < maxLevel && newCorrectInLevel >= LISTENING_LEVEL_UP_THRESHOLD) {
                const newLevel = level + 1;
                setIsLevelTransitioning(true);
                setTimeout(() => {
                    setLevel(newLevel);
                    setCorrectAnswersInLevel(0);
                    resetForNewQuestion();
                    setIsLevelTransitioning(false);
                }, 3000);
            } else {
                setCorrectAnswersInLevel(newCorrectInLevel);
            }
        } else {
            setScore(s => s + LISTENING_POINTS_INCORRECT);
            setIncorrectAnswers(i => i + 1);
            const newLives = lives - 1;
            setLives(newLives);
            if (newLives <= 0) {
                setIsGameOver(true);
                setTimeout(endGame, 2000);
            }
        }
    };
    
    const handlePlaySound = useCallback(() => {
        if (!question?.correct_answer) return;
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(question.correct_answer);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        } else {
            console.error("Text-to-Speech is not supported in this browser.");
        }
    }, [question]);

    useEffect(() => {
        if (question && !isAnswered && !showInstructions) {
           const timer = setTimeout(() => handlePlaySound(), 500);
           return () => clearTimeout(timer);
        }
    }, [question, isAnswered, handlePlaySound, showInstructions]);

    const instructions = [
        'استمع جيداً للكلمة التي يتم نطقها.',
        'اختر الإملاء الصحيح للكلمة التي سمعتها من بين الخيارات.',
        'لديك 5 حيوات. كل إجابة خاطئة تفقدك حياة واحدة.',
        'أجب على 5 أسئلة صحيحة للارتقاء إلى المستوى التالي وزيادة صعوبة الكلمات.',
    ];

    if (showInstructions) {
        return (
            <InstructionsModal
                title="تعليمات اختبار الاستماع"
                instructions={instructions}
                onStart={() => setShowInstructions(false)}
                gameIcon={<SpeakerWaveIcon className="w-10 h-10 text-sky-500" />}
            />
        );
    }

    const renderHeader = () => (
        <div className="grid grid-cols-3 items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg mb-6 w-full gap-4">
             {/* Score */}
            <div className="flex items-center justify-start space-i-2">
                <span className="text-lg font-bold text-slate-600 dark:text-slate-300">النقاط:</span>
                <span className="text-3xl font-bold text-green-500">{score}</span>
            </div>
            {/* Level */}
            <div className="flex flex-col items-center justify-center text-center">
                 <span className="font-bold text-lg text-slate-600 dark:text-slate-300">المستوى: {level}</span>
                 <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mt-1 overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-400 to-amber-500 h-3 rounded-full transition-all duration-500 ease-out" style={{ width: `${(correctAnswersInLevel / LISTENING_LEVEL_UP_THRESHOLD) * 100}%` }}></div>
                 </div>
            </div>
             {/* Lives */}
            <div className="flex items-center justify-end">
                {Array.from({ length: LISTENING_INITIAL_LIVES }).map((_, i) => (
                    <HeartIcon key={i} className={`w-8 h-8 ml-1 transition-all duration-300 ${i < lives ? 'text-red-500 animate-pulse' : 'text-slate-300 dark:text-slate-600'}`} />
                ))}
            </div>
        </div>
    );
    
    if (isLevelTransitioning) {
        const nextLevel = level + 1;
        return <LevelTransitionScreen title={`وصلت للمستوى ${nextLevel}!`} message="استعد لأسئلة أكثر صعوبة!" />;
    }
    
    return (
        <div className="flex flex-col h-full w-full items-center">
            <header className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-2xl font-bold">اختبار الاستماع</h2>
                <button onClick={endGame} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-transform active:scale-[0.98]">
                    إنهاء
                </button>
            </header>
            
            <div className="w-full max-w-2xl flex flex-col items-center flex-grow">
                {renderHeader()}

                <div className="flex-grow flex flex-col items-center justify-center text-center w-full">
                    {question ? (
                        <>
                            <div className="my-auto flex flex-col items-center">
                                <p className="mb-6 text-xl text-slate-600 dark:text-slate-400 font-semibold">استمع للكلمة واختر الإجابة الصحيحة</p>
                                <button
                                    onClick={handlePlaySound}
                                    className={`relative w-48 h-48 bg-gradient-to-br from-sky-400 to-cyan-500 dark:from-sky-500 dark:to-cyan-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-100 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 ${!isAnswered ? 'animate-pulse-glow' : ''}`}
                                    aria-label="استمع للكلمة"
                                >
                                    <SpeakerWaveIcon className="w-24 h-24" />
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 w-full mt-8 mb-4">
                                {question.options.map((option) => {
                                    const isCorrect = option === question.correct_answer;
                                    const isSelected = option === selectedAnswer;
                                    const showHint = isAnswered && isCorrect && question.pronunciation_hint_ar;
                                    
                                    let buttonClass = "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-sky-500 dark:hover:border-sky-400 hover:shadow-lg hover:-translate-y-1";
                                    
                                    if (isAnswered) {
                                        if (isCorrect) {
                                            buttonClass = "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-300 ring-2 ring-green-500";
                                        } else if (isSelected) {
                                            buttonClass = "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-300 animate-shake";
                                        } else {
                                            buttonClass = "bg-slate-100 dark:bg-slate-800 opacity-60 cursor-not-allowed";
                                        }
                                    }

                                    return (
                                        <div key={option} className="relative">
                                            {showHint && (
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs z-10 animate-fade-in-up">
                                                    <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/80 border border-yellow-300 dark:border-yellow-700 shadow-lg backdrop-blur-sm">
                                                        <p className="font-bold text-yellow-800 dark:text-yellow-200 flex items-center text-sm">
                                                            <LightBulbIcon className="w-4 h-4 ml-1" />
                                                            {question.pronunciation_hint_ar}
                                                        </p>
                                                    </div>
                                                    <div className="absolute left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-yellow-300 dark:border-t-yellow-700"></div>
                                                </div>
                                            )}
                                            <button 
                                                onClick={() => handleAnswer(option)}
                                                disabled={isAnswered}
                                                className={`w-full py-5 px-4 rounded-xl shadow-md border-2 transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed flex items-center justify-center ${buttonClass}`}
                                            >
                                                <span className="font-mono font-bold text-xl">{option}</span>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="h-20 w-full mt-4 flex items-center justify-center">
                                {isAnswered && (
                                    <button 
                                        onClick={handleNext}
                                        disabled={isGameOver}
                                        className="w-full max-w-sm text-xl bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-4 px-4 rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 animate-fade-in-up">
                                        <span>
                                            {isGameOver 
                                                ? (lives <= 0 ? 'انتهت الحيوات...' : 'أحسنت! انتهى الاختبار!')
                                                : 'السؤال التالي'}
                                        </span>
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="text-center p-8 my-auto">
                             <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300">رائع!</h3>
                             <p className="mt-2 text-slate-500 dark:text-slate-400">لقد أكملت كل الأسئلة المتاحة. أحسنت!</p>
                             <button onClick={endGame} className="mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all">
                                عرض النتائج
                             </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListeningGameScreen;
