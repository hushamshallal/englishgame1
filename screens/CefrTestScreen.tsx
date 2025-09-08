
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GameOptions, SessionStats, CefrLevel, CefrQuestion, CefrResult, QuestionType, CEFR_LEVELS_ORDER } from '../types';
import { useUser } from '../context/UserContext';
import { CEFR_WORD_BANK, VOCAB_ESTIMATES, CEFR_SENTENCE_BANK, CEFR_READING_BANK } from '../data/cefr';
import { generateQuestionsForLevel, QUESTIONS_PER_LEVEL } from '../utils/cefrTestHelper';
import InstructionsModal from '../components/InstructionsModal';
import { BeakerIcon } from '@heroicons/react/24/solid';

const MAX_INCORRECT_ANSWERS = 3;

interface CefrTestScreenProps {
  options: GameOptions;
  onGameEnd: (stats: SessionStats) => void;
  onExit: () => void;
}

const CefrTestScreen: React.FC<CefrTestScreenProps> = ({ options, onGameEnd, onExit }) => {
    const { setCefrResult } = useUser();
    const [showInstructions, setShowInstructions] = useState(true);
    const [currentLevel, setCurrentLevel] = useState<CefrLevel>(CEFR_LEVELS_ORDER[0]);
    const [questions, setQuestions] = useState<CefrQuestion[]>([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [levelPerformance, setLevelPerformance] = useState<CefrResult['levelPerformance']>({});
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [incorrectCountInLevel, setIncorrectCountInLevel] = useState(0);

    useEffect(() => {
        if (showInstructions) return;
        const wordBank = CEFR_WORD_BANK[currentLevel] || [];
        const sentenceBank = CEFR_SENTENCE_BANK[currentLevel] || [];
        const readingBank = CEFR_READING_BANK[currentLevel] || [];
        setQuestions(generateQuestionsForLevel(currentLevel, wordBank, sentenceBank, readingBank));
        setIncorrectCountInLevel(0); // Reset mistake counter for new level
    }, [currentLevel, showInstructions]);
    
    const currentQuestion = questions[questionIndex];

    const handleAnswer = async (answer: string) => {
        if (isAnswered) return;
        
        setSelectedAnswer(answer);
        setIsAnswered(true);

        const isCorrect = answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
        const questionType = currentQuestion.questionType;

        // Update performance stats
        setLevelPerformance(prev => {
            const newPerf = { ...prev };
            if (!newPerf[currentLevel]) {
                newPerf[currentLevel] = { score: 0, total: 0, typePerformance: {} };
            }
            if (!newPerf[currentLevel].typePerformance[questionType]) {
                newPerf[currentLevel].typePerformance[questionType] = { correct: 0, total: 0 };
            }

            newPerf[currentLevel].score += isCorrect ? 1 : 0;
            newPerf[currentLevel].total += 1;
            newPerf[currentLevel].typePerformance[questionType]!.correct += isCorrect ? 1 : 0;
            newPerf[currentLevel].typePerformance[questionType]!.total += 1;

            return newPerf;
        });
        
        // Check for incorrect answer and end game if limit is reached
        if (!isCorrect) {
            const newIncorrectCount = incorrectCountInLevel + 1;
            setIncorrectCountInLevel(newIncorrectCount);
            if (newIncorrectCount >= MAX_INCORRECT_ANSWERS) {
                setTimeout(() => endGame(true), 1200); // End game due to mistakes
            }
        }
    };

    const handleNext = () => {
        setIsAnswered(false);
        setSelectedAnswer(null);

        if (questionIndex < QUESTIONS_PER_LEVEL - 1) {
            setQuestionIndex(prev => prev + 1);
        } else {
            // End of level, passed because mistake limit was not reached
            const currentLevelIndex = CEFR_LEVELS_ORDER.indexOf(currentLevel);
            const nextLevel = CEFR_LEVELS_ORDER[currentLevelIndex + 1];
            if (nextLevel && (CEFR_WORD_BANK[nextLevel]?.length > 0 || CEFR_SENTENCE_BANK[nextLevel]?.length > 0 || CEFR_READING_BANK[nextLevel]?.length > 0)) {
                setCurrentLevel(nextLevel);
                setQuestionIndex(0);
            } else {
                endGame(false); // Completed all available levels successfully
            }
        }
    };
    
    const endGame = (dueToFailure: boolean = false) => {
        let finalLevel: CefrLevel | 'Beginner' = 'Beginner';
        let failedLevel: CefrLevel | undefined = undefined;

        const passedLevels = Object.keys(levelPerformance).filter(level => {
            const perf = levelPerformance[level as CefrLevel];
            // A level is passed if it was completed (10 questions) with less than 3 mistakes.
            // Or if it's not the current failing level.
            return (level as CefrLevel) !== currentLevel || !dueToFailure;
        });
        
        if (passedLevels.length > 0) {
            const lastPassedLevel = CEFR_LEVELS_ORDER.filter(l => passedLevels.includes(l)).pop();
            // If the user failed the very first level, they are a beginner.
             if (lastPassedLevel === CEFR_LEVELS_ORDER[0] && dueToFailure) {
                finalLevel = 'Beginner';
             } else {
                finalLevel = lastPassedLevel || 'Beginner';
             }
        }
        
        if (dueToFailure) {
            failedLevel = currentLevel;
        }

        const result: CefrResult = {
            finalLevel,
            failedLevel,
            estimatedVocab: finalLevel !== 'Beginner' ? VOCAB_ESTIMATES[finalLevel] : '≈ 0-100 كلمة',
            strengths: [], // Will be generated in ResultsScreen
            weaknesses: [], // Will be generated in ResultsScreen
            advice: [], // Will be generated in ResultsScreen
            levelPerformance,
        };
        
        setCefrResult(result);

        onGameEnd({
            mode: 'cefr-test',
            score: 0, matches: 0,
            cefrResult: result,
        });
    };
    
    const instructions = [
        'هذا الاختبار يحدد مستواك في اللغة الإنجليزية بناءً على الإطار الأوروبي (CEFR).',
        'ستجيب على 10 أسئلة لكل مستوى، تبدأ من الأسهل (A1).',
        'إذا أجبت على 3 أسئلة بشكل خاطئ في مستوى معين، سيتوقف الاختبار.',
        'بناءً على أدائك، سيتم تحديد مستواك النهائي من A1 إلى C2.',
        'ركز جيداً واقرأ كل سؤال بعناية. حظاً موفقاً!'
    ];

    if (showInstructions) {
        return (
            <InstructionsModal
                title="تعليمات اختبار تحديد المستوى"
                instructions={instructions}
                onStart={() => setShowInstructions(false)}
                gameIcon={<BeakerIcon className="w-10 h-10 text-sky-500" />}
            />
        );
    }
    
    if (!currentQuestion) {
        return <div className="flex items-center justify-center h-full">...جاري تحميل الاختبار</div>;
    }

    const progress = ((questionIndex + 1) / QUESTIONS_PER_LEVEL) * 100;
    const isSpecialLayout = ['reading_comprehension', 'usage', 'sentence_formation', 'matching'].includes(currentQuestion.questionType);

    return (
        <div className="flex flex-col h-full">
            <header className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-bold">اختبار تحديد المستوى - {currentLevel}</h2>
                <div className="flex items-center gap-4">
                     <div className="flex items-center gap-1">
                        <span className="font-bold text-lg text-red-500">{incorrectCountInLevel}</span>
                        <span className="text-sm text-slate-500">/ {MAX_INCORRECT_ANSWERS} أخطاء</span>
                    </div>
                    <button onClick={onExit} className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover-slate-600 font-bold py-2 px-4 rounded-lg">خروج</button>
                </div>
            </header>

            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-4">
                <div className="bg-sky-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center text-center bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <div className="text-lg text-slate-600 dark:text-slate-400 mb-4" dangerouslySetInnerHTML={{ __html: currentQuestion.questionText }}></div>
                
                <div className={`w-full max-w-lg grid ${isSpecialLayout ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2'} gap-4 mt-4`}>
                    {currentQuestion.options.map(option => {
                        const isCorrect = option === currentQuestion.correctAnswer;
                        let btnClass = "bg-slate-200 dark:bg-slate-700 hover:bg-sky-400 dark:hover:bg-sky-600";
                        if(isAnswered) {
                            if (isCorrect) {
                                btnClass = "bg-green-500 text-white";
                            } else if (option === selectedAnswer) {
                                btnClass = "bg-red-500 text-white animate-shake";
                            } else {
                                btnClass = "bg-slate-200 dark:bg-slate-700 opacity-50";
                            }
                        }

                        return (
                            <button key={option} onClick={() => handleAnswer(option)} disabled={isAnswered} className={`p-4 rounded-lg font-semibold text-lg transition ${btnClass} ${isSpecialLayout ? 'font-mono ltr' : ''}`}>
                                {option}
                            </button>
                        )
                    })}
                </div>

                 {isAnswered && (
                    <div className="mt-6 flex flex-col items-center animate-fade-in-up">
                        <button onClick={handleNext} className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-10 rounded-lg text-xl disabled:opacity-50 disabled:cursor-not-allowed" disabled={incorrectCountInLevel >= MAX_INCORRECT_ANSWERS}>
                            {incorrectCountInLevel >= MAX_INCORRECT_ANSWERS ? 'عرض النتائج...' : 'التالي'}
                        </button>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default CefrTestScreen;
