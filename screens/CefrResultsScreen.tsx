import React, { useMemo } from 'react';
import { SessionStats, CefrLevel, QuestionType, CEFR_LEVELS_ORDER } from '../types';
import { VOCAB_ESTIMATES } from '../data/cefr';
import { LightBulbIcon, InformationCircleIcon, ChartBarIcon, TrophyIcon } from '@heroicons/react/24/solid';

const QUESTION_TYPE_NAMES: Record<QuestionType, string> = {
    meaning: "فهم معاني الكلمات",
    usage: "استخدام الكلمات في جمل",
    synonym: "المرادفات",
    antonym: "الأضداد",
    sentence_formation: "تكوين الجمل",
    reading_comprehension: "فهم المقروء",
    matching: "مطابقة الكلمات",
};

type PerformanceStat = {
    type: QuestionType;
    name: string;
    correct: number;
    total: number;
    successRate: number;
};

const getPerformanceAnalysis = (levelPerformance: SessionStats['cefrResult']['levelPerformance']) => {
    const advice: string[] = [];
    const allTypeStats: Partial<Record<QuestionType, { correct: number, total: number }>> = {};

    // 1. Aggregate performance across all tested levels
    Object.values(levelPerformance).forEach(level => {
        Object.entries(level.typePerformance).forEach(([type, stats]) => {
            const key = type as QuestionType;
            if (!allTypeStats[key]) {
                allTypeStats[key] = { correct: 0, total: 0 };
            }
            allTypeStats[key]!.correct += stats.correct;
            allTypeStats[key]!.total += stats.total;
        });
    });

    // Handle case with no data
    if (Object.keys(allTypeStats).length === 0) {
        advice.push("ابدأ بوضع 'تدريب المطابقة' لتعلم الكلمات الأساسية.", "شاهد فيديوهات تعليمية بسيطة للأطفال باللغة الإنجليزية.");
        return { performanceBreakdown: [], advice };
    }

    // 2. Convert aggregated stats into a structured array
    const performanceBreakdown: PerformanceStat[] = Object.entries(allTypeStats)
        .map(([type, stats]) => {
            const key = type as QuestionType;
            const successRate = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
            return {
                type: key,
                name: QUESTION_TYPE_NAMES[key],
                correct: stats.correct,
                total: stats.total,
                successRate,
            };
        });

    // 3. Sort by success rate (ascending) to show weakest areas first
    performanceBreakdown.sort((a, b) => a.successRate - b.successRate);

    // 4. Generate advice based on the weakest areas
    const weaknesses = performanceBreakdown.filter(p => p.successRate < 60);

    if (weaknesses.some(w => w.type === 'meaning' || w.type === 'matching')) {
        advice.push("استخدم البطاقات التعليمية (Flashcards) لتقوية حفظ معاني الكلمات.");
    }
    if (weaknesses.some(w => w.type === 'usage' || w.type === 'sentence_formation')) {
        advice.push("حاول كتابة جمل بسيطة يومياً باستخدام الكلمات الجديدة التي تتعلمها.");
        advice.push("اقرأ قصصاً قصيرة ولاحظ كيف يتم استخدام الكلمات في سياقها.");
    }
    if (weaknesses.some(w => w.type === 'reading_comprehension')) {
        advice.push("ابدأ بقراءة نصوص قصيرة جداً، ثم حاول الإجابة على سؤال واحد حول كل نص لتقوية الفهم.");
    }
    if (weaknesses.some(w => w.type === 'synonym' || w.type === 'antonym')) {
        advice.push("عندما تتعلم كلمة جديدة، ابحث عن مرادفاتها وأضدادها لتوسيع مفرداتك.");
    }
    
    if (advice.length === 0 && performanceBreakdown.every(p => p.successRate >= 75)) {
        advice.push("أداء رائع! استمر في الممارسة للحفاظ على مستواك وتطويره.");
    } else if (advice.length === 0) {
        advice.push("أداؤك متوازن. ركز على ممارسة جميع المهارات بانتظام لتحقيق تقدم مستمر.");
    }

    return { performanceBreakdown, advice: Array.from(new Set(advice)) };
};


interface CefrResultsScreenProps {
  stats: SessionStats;
  onRestart: () => void;
  onHome: () => void;
}

const LevelIndicator: React.FC<{ level: CefrLevel | 'Beginner', isAchieved: boolean }> = ({ level, isAchieved }) => {
    const baseClasses = "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300";
    const achievedClasses = "bg-green-500 text-white shadow-lg scale-110";
    const notAchievedClasses = "bg-slate-200 dark:bg-slate-700 text-slate-500";
    
    return (
        <div className="flex flex-col items-center gap-2">
            <div className={`${baseClasses} ${isAchieved ? achievedClasses : notAchievedClasses}`}>
                {level}
            </div>
        </div>
    );
}

const PerformanceItem: React.FC<PerformanceStat> = ({ name, correct, total, successRate }) => {
    const barColor = successRate >= 75 ? 'bg-green-500' : successRate >= 50 ? 'bg-yellow-500' : 'bg-red-500';
    
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-1 text-right">
                <span className="text-sm font-mono text-slate-500 dark:text-slate-400">{correct}/{total} ({successRate.toFixed(0)}%)</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{name}</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2.5">
                <div 
                    className={`${barColor} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${successRate}%` }}
                ></div>
            </div>
        </div>
    );
};


const CefrResultsScreen: React.FC<CefrResultsScreenProps> = ({ stats, onRestart, onHome }) => {
    const { cefrResult } = stats;

    const { finalLevel, failedLevel, levelPerformance } = useMemo(() => {
        if (!stats.cefrResult) {
            return {
                finalLevel: 'Beginner' as const,
                failedLevel: undefined,
                levelPerformance: {}
            };
        }
        return stats.cefrResult;
    }, [stats.cefrResult]);

    const estimatedVocab = finalLevel !== 'Beginner' ? VOCAB_ESTIMATES[finalLevel] : '≈ 0-100 كلمة';

    const { performanceBreakdown, advice } = useMemo(() => getPerformanceAnalysis(levelPerformance), [levelPerformance]);

    if (!cefrResult) {
        return (
             <div className="flex flex-col items-center justify-center h-full text-center">
                <p>حدث خطأ في عرض النتائج.</p>
                <button onClick={onHome} className="mt-4 bg-sky-500 text-white p-3 rounded-lg">العودة للرئيسية</button>
            </div>
        )
    }

    const achievedLevelIndex = finalLevel === 'Beginner' ? -1 : CEFR_LEVELS_ORDER.indexOf(finalLevel);

    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4 animate-fade-in">
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-sky-500">
                    تقرير مستواك
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-6">بناءً على الإطار الأوروبي المرجعي العام للغات (CEFR)</p>

                <div className="relative bg-gradient-to-br from-violet-500 to-sky-500 p-6 rounded-2xl shadow-lg text-white text-center overflow-hidden mb-8">
                    <TrophyIcon className="absolute -left-4 -top-4 w-24 h-24 text-white/10" />
                    <TrophyIcon className="absolute -right-8 bottom-0 w-32 h-32 text-white/10 transform rotate-12" />
                    <h2 className="text-lg font-semibold opacity-80">مستواك النهائي</h2>
                    <p className={`text-6xl font-black my-2 tracking-tight`}>{finalLevel}</p>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 inline-block">
                        <p className="font-semibold">{estimatedVocab}</p>
                    </div>
                     {failedLevel && (
                        <p className="mt-3 text-sm opacity-70">
                            توقف الاختبار عند مستوى {failedLevel}
                        </p>
                    )}
                </div>
                
                 <div className="flex justify-center items-center gap-2 sm:gap-4 my-8">
                   {CEFR_LEVELS_ORDER.map((level, index) => (
                       <LevelIndicator key={level} level={level} isAchieved={index <= achievedLevelIndex} />
                   ))}
                </div>


                <div className="text-right space-y-6">
                    {Object.keys(levelPerformance).length > 0 && (
                        <div>
                             <h3 className="flex items-center justify-end text-xl font-bold mb-3 text-slate-800 dark:text-slate-200">
                                تفاصيل الأداء حسب المستوى
                                <ChartBarIcon className="w-6 h-6 mr-2"/>
                            </h3>
                             <div className="space-y-4 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-lg">
                                {Object.entries(levelPerformance).map(([level, perf]) => {
                                    const successRate = perf.total > 0 ? (perf.score / perf.total) * 100 : 0;
                                    const barColor = successRate >= 75 ? 'bg-green-500' : successRate >= 50 ? 'bg-yellow-500' : 'bg-red-500';
                                    return (
                                        <div key={level} className="w-full">
                                            <div className="flex justify-between items-center mb-1 text-right">
                                                <span className="text-sm font-mono text-slate-500 dark:text-slate-400">{perf.score}/{perf.total} ({successRate.toFixed(0)}%)</span>
                                                <span className="font-semibold text-slate-700 dark:text-slate-300">المستوى {level}</span>
                                            </div>
                                            <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2.5">
                                                <div 
                                                    className={`${barColor} h-2.5 rounded-full transition-all duration-500`}
                                                    style={{ width: `${successRate}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    <div>
                        <h3 className="flex items-center justify-end text-xl font-bold mb-3 text-slate-800 dark:text-slate-200">
                            تحليل الأداء حسب نوع السؤال
                            <ChartBarIcon className="w-6 h-6 mr-2"/>
                        </h3>
                        {performanceBreakdown.length > 0 ? (
                            <div className="space-y-4 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-lg">
                                {performanceBreakdown.map((perf) => <PerformanceItem key={perf.type} {...perf} />)}
                            </div>
                        ) : (
                            <p className="text-slate-500 dark:text-slate-400 text-center p-4">لم يتم جمع بيانات أداء كافية.</p>
                        )}
                    </div>
                     <div>
                        <h3 className="flex items-center justify-end text-xl font-bold mb-3 text-sky-600 dark:text-sky-400">
                            نصائح مقترحة
                            <LightBulbIcon className="w-6 h-6 mr-2"/>
                        </h3>
                        <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300 bg-sky-50 dark:bg-sky-900/30 p-4 rounded-lg">
                           {advice.map((a, i) => <li key={i}>{a}</li>)}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <button 
                        onClick={onRestart}
                        className="w-full text-lg bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 active:scale-[0.98]"
                    >
                        إعادة الاختبار
                    </button>
                    <button 
                        onClick={onHome}
                        className="w-full text-lg bg-slate-500 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 active:scale-[0.98]"
                    >
                        العودة للرئيسية
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CefrResultsScreen;
