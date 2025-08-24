import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GameOptions, GrammarQuestion, SessionStats } from '../types';
import { useStats } from '../context/StatsContext';
import { GRAMMAR_POINTS_CORRECT, GRAMMAR_POINTS_INCORRECT, GRAMMAR_TIMER_SECONDS, GRAMMAR_INITIAL_LIVES, GRAMMAR_LEVEL_UP_THRESHOLD } from '../constants';
import { HeartIcon, ClockIcon, SparklesIcon, StarIcon } from '@heroicons/react/24/solid';
import { GRAMMAR_QUESTIONS } from '../data/grammar';

const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const LevelTransitionScreen = ({ level }: { level: number }) => (
    <div className="flex flex-col items-center justify-center h-full w-full bg-slate-100 dark:bg-slate-900">
        <div className="text-center p-8 rounded-lg bg-white dark:bg-slate-800 shadow-xl animate-fade-in-up">
            <StarIcon className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-sky-500 dark:text-sky-400">
                أحسنت! لقد وصلت للمستوى {level}!
            </h2>
            <p className="text-xl mt-2 text-slate-600 dark:text-slate-400">
                استعد لتحدٍ جديد...
            </p>
            <div className="mt-8 w-16 h-16 border-4 border-t-sky-500 border-slate-200 dark:border-slate-600 rounded-full animate-spin mx-auto"></div>
        </div>
    </div>
);

interface GrammarGameScreenProps {
  options: GameOptions;
  onGameEnd: (stats: SessionStats) => void;
  onExit: () => void;
}

const GrammarGameScreen: React.FC<GrammarGameScreenProps> = ({ options, onGameEnd, onExit }) => {
    const { addGrammarSessionStats } = useStats();
    const { subMode } = options;

    const [questionPool, setQuestionPool] = useState<Record<number, GrammarQuestion[]>>({});
    const [questionIndices, setQuestionIndices] = useState<Record<number, number>>({});
    const [isLevelTransitioning, setIsLevelTransitioning] = useState(false);

    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [correctAnswersInLevel, setCorrectAnswersInLevel] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [topicPerformance, setTopicPerformance] = useState<Record<string, 'correct' | 'incorrect'>>({});
    
    const [isAnswered, setIsAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    
    const [lives, setLives] = useState(GRAMMAR_INITIAL_LIVES);
    const [timeLeft, setTimeLeft] = useState(GRAMMAR_TIMER_SECONDS);
    
    // Initialize question pool and indices
    useEffect(() => {
        const shuffledPool: Record<number, GrammarQuestion[]> = {};
        const initialIndices: Record<number, number> = {};
        for (const levelKey in GRAMMAR_QUESTIONS) {
            const numericLevelKey = parseInt(levelKey, 10);
            if (!isNaN(numericLevelKey)) {
                shuffledPool[numericLevelKey] = shuffleArray(GRAMMAR_QUESTIONS[numericLevelKey as keyof typeof GRAMMAR_QUESTIONS]);
                initialIndices[numericLevelKey] = 0;
            }
        }
        setQuestionPool(shuffledPool);
        setQuestionIndices(initialIndices);
    }, []);
    
    const currentQuestionIndex = questionIndices[level] ?? 0;
    const question = useMemo(() => {
        if (!questionPool[level] || Object.keys(questionPool).length === 0) {
            return null;
        }
        return questionPool[level][currentQuestionIndex] || null;
    }, [questionPool, level, currentQuestionIndex]);

    useEffect(() => {
        if (subMode !== 'timed' || isAnswered || isLevelTransitioning || !question) return;

        if (timeLeft <= 0) {
            handleAnswer(""); // Time's up, counts as incorrect
            return;
        }
        const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timerId);
    }, [subMode, timeLeft, isAnswered, question, isLevelTransitioning]);

    const endGame = useCallback(() => {
        addGrammarSessionStats({
            score: score,
            correct: correctAnswers,
            incorrect: incorrectAnswers,
            topicPerformance: topicPerformance
        });
        onGameEnd({
            mode: 'grammar',
            score: score,
            matches: correctAnswers,
            incorrectAttempts: incorrectAnswers,
            grammarLevel: level,
        });
    }, [score, correctAnswers, incorrectAnswers, level, topicPerformance, addGrammarSessionStats, onGameEnd]);
    
    const resetForNewQuestion = () => {
        setIsAnswered(false);
        setSelectedAnswer(null);
        if (subMode === 'timed') setTimeLeft(GRAMMAR_TIMER_SECONDS);
    };

    const handleNext = () => {
        if (subMode === 'lives' && lives <= 0) {
            endGame();
            return;
        }
        resetForNewQuestion();
        setQuestionIndices(prev => ({
            ...prev,
            [level]: (prev[level] ?? 0) + 1
        }));
    };

    const handleAnswer = (selected: string) => {
        if (isAnswered || !question) return;
        
        setIsAnswered(true);
        setSelectedAnswer(selected);
        const isCorrect = selected === question.correct_answer;
        const topic = question.grammar_topic || 'unknown';

        setTopicPerformance(prev => ({ ...prev, [topic]: isCorrect ? 'correct' : 'incorrect' }));

        if (isCorrect) {
            setScore(s => s + GRAMMAR_POINTS_CORRECT);
            setCorrectAnswers(c => c + 1);
            const newCorrectInLevel = correctAnswersInLevel + 1;

            if (level < 10 && newCorrectInLevel >= GRAMMAR_LEVEL_UP_THRESHOLD) {
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
            setScore(s => s + GRAMMAR_POINTS_INCORRECT);
            setIncorrectAnswers(i => i + 1);
            if (subMode === 'lives') {
                const newLives = lives - 1;
                setLives(newLives);
                if (newLives <= 0) setTimeout(endGame, 2000);
            }
        }
    };

    const renderHeader = () => (
        <div className="grid grid-cols-3 items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md mb-6">
            <div className="flex items-center space-i-2">
                <span className="text-lg font-bold">النقاط:</span>
                <span className="text-2xl font-bold text-green-500">{score}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
                 <span className="font-bold text-lg">المستوى: {level}</span>
                 {level < 10 && (
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mt-1">
                        <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${(correctAnswersInLevel / GRAMMAR_LEVEL_UP_THRESHOLD) * 100}%` }}></div>
                    </div>
                 )}
            </div>
            <div className="flex items-center justify-end text-xl font-bold">
                {subMode === 'timed' ? (
                    <div className="flex items-center">
                        <ClockIcon className="w-6 h-6 ml-2 text-sky-500" />
                        <span>{timeLeft}s</span>
                    </div>
                ) : (
                    <div className="flex items-center">
                        {Array.from({ length: GRAMMAR_INITIAL_LIVES }).map((_, i) => (
                            <HeartIcon key={i} className={`w-7 h-7 ml-1 ${i < lives ? 'text-red-500' : 'text-slate-300 dark:text-slate-600'}`} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
    
    if (isLevelTransitioning) return <LevelTransitionScreen level={level + 1} />;
    
    return (
        <div className="flex flex-col h-full">
            <header className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">اختبار القواعد</h2>
                <button onClick={endGame} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-transform active:scale-[0.98]">
                    إنهاء اللعبة
                </button>
            </header>
            
            {renderHeader()}

            <div className="flex-grow flex flex-col items-center justify-center text-center">
                <div className="w-full max-w-2xl">
                    {question ? (
                        <>
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg mb-8 min-h-[120px] flex items-center justify-center">
                                <p 
                                    className="text-2xl md:text-3xl font-mono leading-relaxed ltr" 
                                    dir="ltr"
                                    dangerouslySetInnerHTML={{ __html: question.sentence_with_blank.replace('____', '<span class="font-bold text-sky-500 underline underline-offset-4 decoration-dashed">____</span>') }}
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                {question.options.map((option) => {
                                    const isCorrect = option === question.correct_answer;
                                    const isSelected = option === selectedAnswer;
                                    let buttonClass = "bg-slate-200 dark:bg-slate-700 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-400";
                                    
                                    if (isAnswered) {
                                        if(isCorrect) {
                                            buttonClass = "bg-green-500 text-white animate-pulse";
                                        } else if (isSelected) {
                                            buttonClass = "bg-red-500 text-white animate-shake";
                                        } else {
                                            buttonClass = "bg-slate-200 dark:bg-slate-700 opacity-60";
                                        }
                                    }

                                    return (
                                        <button 
                                            key={option}
                                            onClick={() => handleAnswer(option)}
                                            disabled={isAnswered}
                                            className={`w-full text-lg font-mono font-bold py-4 px-4 rounded-lg shadow-md transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed ${buttonClass}`}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <div className="text-center p-8">
                             <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300">رائع!</h3>
                             <p className="mt-2 text-slate-500 dark:text-slate-400">لقد أكملت كل الأسئلة المتاحة لهذا المستوى.</p>
                        </div>
                    )}
                        
                    {isAnswered && question && (
                        <div className="mt-6 w-full max-w-2xl flex flex-col items-center">
                            <div className="w-full p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700">
                                <p className="font-bold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center justify-center">
                                    <SparklesIcon className="w-5 h-5 ml-2" />
                                    توضيح
                                </p>
                                <p className="text-yellow-700 dark:text-yellow-300">{question.explanation_ar} ({question.grammar_topic})</p>
                            </div>

                             <button 
                                onClick={handleNext} 
                                className="mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all transform hover:scale-105 active:scale-[0.98] min-w-[200px]">
                                <span>{subMode === 'lives' && lives <= 0 ? 'عرض النتائج' : 'السؤال التالي'}</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GrammarGameScreen;
