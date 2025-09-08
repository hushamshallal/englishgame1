import React, { useState, useMemo, useEffect } from 'react';
import { useStats } from '../context/StatsContext';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { GameOptions, Category, CATEGORIES, CefrResult, QuestionType } from '../types';
import { SunIcon, MoonIcon, PuzzlePieceIcon, ClockIcon, HeartIcon, ChartBarIcon as ChartBarIconSolid, LightBulbIcon, SpeakerWaveIcon, ChatBubbleBottomCenterTextIcon, AcademicCapIcon, QueueListIcon, HomeIcon as HomeIconSolid, BeakerIcon, ArrowUpOnSquareIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { HomeIcon as HomeIconOutline, ChartBarIcon as ChartBarIconOutline } from '@heroicons/react/24/outline';
import { VOCAB_ESTIMATES } from '../data/cefr';

// --- Extracted Components ---

// ... (CategoryPicker, GrammarOptionsModal, and AboutModal remain the same) ...
const CategoryPicker: React.FC<{ onChoice: (category: Category) => void; onClose: () => void; }> = ({ onChoice, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md text-center">
            <h3 className="text-2xl font-bold mb-6">اختر فئة</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                {CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => onChoice(cat)} className="bg-slate-200 dark:bg-slate-700 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-600 font-semibold py-3 px-2 rounded-lg transition-all duration-200 text-sm active:scale-[0.97] active:bg-sky-600">
                        {cat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </button>
                ))}
            </div>
            <button onClick={onClose} className="mt-6 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">إلغاء</button>
        </div>
    </div>
);

const GrammarOptionsModal: React.FC<{ onStartGame: (options: GameOptions) => void; onClose: () => void; }> = ({ onStartGame, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-sm text-center shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center justify-center"><PuzzlePieceIcon className="w-7 h-7 ml-2 text-yellow-500" />اختر وضع اختبار القواعد</h3>
            <div className="space-y-4">
                <button
                    onClick={() => onStartGame({ mode: 'grammar', subMode: 'timed' })}
                    className="w-full flex items-center justify-center text-lg bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg transition-all active:scale-[0.98]"
                >
                    <ClockIcon className="w-6 h-6 ml-2" />
                    تحدي الوقت
                </button>
                <button
                    onClick={() => onStartGame({ mode: 'grammar', subMode: 'lives' })}
                    className="w-full flex items-center justify-center text-lg bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-lg transition-all active:scale-[0.98]"
                >
                    <HeartIcon className="w-6 h-6 ml-2" />
                    نظام الحيوات
                </button>
            </div>
            <button
                onClick={onClose}
                className="mt-6 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
                إلغاء
            </button>
        </div>
    </div>
);

const AboutModal: React.FC<{ onClose: () => void; }> = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 pb-4 text-center shrink-0">
          <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-violet-500">عن WordUp</h3>
        </div>
        <div className="px-6 pb-6 overflow-y-auto">
          <div className="text-right space-y-4 text-slate-600 dark:text-slate-300">
            <div>
              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-1">لماذا WordUp؟</h4>
              <p>WordUp هو مدربك الشخصي لإتقان مفردات وقواعد اللغة الإنجليزية بطريقة تفاعلية وممتعة. عبر أوضاع لعب متنوعة، ستبني مهاراتك من الصفر في بيئة محفزة وجذابة.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-1">رسالتنا</h4>
              <p>نهدف لتوفير أداة تعليمية مجانية ومفتوحة المصدر تساهم في نشر المعرفة وتسهيل تعلم اللغة الإنجليزية للناطقين بالعربية، مع التركيز على تصميم عصري وتجربة مستخدم سلسة وخالية من الإعلانات.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-1">المطور</h4>
              <p>تم تطوير هذه اللعبة بالكامل بواسطة: <span className="font-bold text-green-500">هشام محسن</span>.</p>
               <p className="mt-4 bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                  <span className="font-bold">للمشاركة بالتطوير والأفكار</span><br/>
                  يمكنك التواصل معنا عبر تليجرام لمشاركة أفكارك أو المساهمة في تطوير اللعبة: <a href="https://t.me/C3hem" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">@C3hem</a>
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 pt-4 text-center border-t border-slate-200 dark:border-slate-700 shrink-0">
          <button onClick={onClose} className="w-full bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 font-semibold py-2 px-6 rounded-lg transition-all">فهمت، لنبدأ!</button>
        </div>
      </div>
    </div>
);

const MainMenuScreen: React.FC<{ onStartGame: (options: GameOptions) => void; onShowCategoryPicker: () => void; onShowGrammarOptions: () => void; }> = ({ onStartGame, onShowCategoryPicker, onShowGrammarOptions }) => (
    <div className="flex flex-col items-center justify-center text-center w-full animate-fade-in-up">
        <div className="mb-10 pt-16">
            <h1 className="text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-violet-500 dark:from-sky-300 dark:to-violet-400 py-2">WordUp</h1>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">أتقن الإنجليزية كلمة بكلمة</p>
        </div>
        <div className="w-full max-w-lg space-y-4">
             <button onClick={() => onStartGame({ mode: 'cefr-test'})} className="w-full text-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white font-bold py-6 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 active:scale-[0.98] flex flex-col items-center justify-center gap-2">
                <BeakerIcon className="w-10 h-10"/>
                <span>اختبار تحديد المستوى (CEFR)</span>
             </button>
            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => onStartGame({ mode: 'listening'})} className="w-full text-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-6 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-[0.98] flex flex-col items-center justify-center gap-2"><SpeakerWaveIcon className="w-8 h-8"/><span>اختبار الاستماع</span></button>
                <button onClick={onShowGrammarOptions} className="w-full text-lg bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold py-6 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-[0.98] flex flex-col items-center justify-center gap-2"><PuzzlePieceIcon className="w-8 h-8"/><span>اختبار القواعد</span></button>
                <button onClick={() => onStartGame({ mode: 'time', difficulty: 'easy' })} className="w-full text-lg bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-6 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-[0.98] flex flex-col items-center justify-center gap-2"><ClockIcon className="w-8 h-8"/><span>تحدي المطابقة</span></button>
                <button onClick={() => onStartGame({ mode: 'training' })} className="w-full text-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-6 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-[0.98] flex flex-col items-center justify-center gap-2"><AcademicCapIcon className="w-8 h-8"/><span>تدريب المطابقة</span></button>
            </div>
            <button onClick={onShowCategoryPicker} className="w-full text-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-4 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-[0.98] flex items-center justify-center gap-3"><QueueListIcon className="w-7 h-7"/><span>اللعب حسب الفئة</span></button>
        </div>
    </div>
);

// --- New Stats Screen & Components ---

const QUESTION_TYPE_NAMES: Record<QuestionType, string> = {
    meaning: "فهم معاني الكلمات",
    usage: "استخدام الكلمات في جمل",
    synonym: "المرادفات",
    antonym: "الأضداد",
    sentence_formation: "تكوين الجمل",
    reading_comprehension: "فهم المقروء",
    matching: "مطابقة الكلمات",
};

const AdviceModal: React.FC<{ cefrResult: CefrResult | null, onClose: () => void; }> = ({ cefrResult, onClose }) => {
    const { weaknesses, advice } = useMemo(() => {
        if (!cefrResult?.levelPerformance) return { weaknesses: [], advice: ["لم يتم إجراء اختبار تحديد المستوى بعد."] };

        const allTypeStats: Record<string, { correct: number, total: number }> = {};
        Object.values(cefrResult.levelPerformance).forEach(level => {
            Object.entries(level.typePerformance).forEach(([type, stats]) => {
                if (!allTypeStats[type]) allTypeStats[type] = { correct: 0, total: 0 };
                allTypeStats[type].correct += stats.correct;
                allTypeStats[type].total += stats.total;
            });
        });

        const performanceBreakdown = Object.entries(allTypeStats).map(([type, stats]) => ({
            type: type as QuestionType,
            successRate: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
        })).sort((a, b) => a.successRate - b.successRate);

        const weakPoints = performanceBreakdown.filter(p => p.successRate < 70);
        const generatedAdvice: string[] = [];

        if (weakPoints.some(w => ['meaning', 'synonym', 'antonym', 'matching'].includes(w.type))) {
            generatedAdvice.push("لتقوية مفرداتك، نوصي بلعب وضع 'تحدي المطابقة' و 'تدريب المطابقة'.");
        }
        if (weakPoints.some(w => ['usage', 'sentence_formation'].includes(w.type))) {
            generatedAdvice.push("لتحسين بناء الجمل، نوصيك بلعب 'اختبار القواعد' بانتظام.");
        }
        if (weakPoints.some(w => w.type === 'reading_comprehension')) {
            generatedAdvice.push("لتطوير فهم المقروء، حاول إعادة اختبار تحديد المستوى والتركيز على نصوص القراءة.");
        }
        if (generatedAdvice.length === 0) {
            generatedAdvice.push("أداؤك ممتاز ومتوازن! استمر في الممارسة عبر جميع أوضاع اللعب.");
        }

        return { weaknesses: weakPoints, advice: generatedAdvice };
    }, [cefrResult]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-lg shadow-2xl">
                <h3 className="text-2xl font-bold mb-4 text-center">تحليل الأداء والنصائح</h3>
                {weaknesses.length > 0 && (
                    <div className="mb-6 text-right">
                        <h4 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">نقاط تحتاج للتركيز عليها:</h4>
                        <ul className="space-y-2">
                            {weaknesses.map(({ type, successRate }) => (
                                <li key={type} className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg flex justify-between items-center">
                                    <span>{QUESTION_TYPE_NAMES[type]}</span>
                                    <span className={`font-bold ${successRate < 50 ? 'text-red-500' : 'text-yellow-500'}`}>{successRate.toFixed(0)}% نجاح</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="text-right">
                    <h4 className="font-bold text-lg mb-2 text-sky-600 dark:text-sky-400">توصياتنا لك:</h4>
                    <ul className="space-y-2 list-disc list-inside">
                        {advice.map((text, i) => (
                            <li key={i} className="p-3 bg-sky-50 dark:bg-sky-900/40 rounded-lg">{text}</li>
                        ))}
                    </ul>
                </div>
                <button onClick={onClose} className="mt-6 w-full bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 font-semibold py-2 px-6 rounded-lg transition-all">إغلاق</button>
            </div>
        </div>
    );
};


const StatsScreen: React.FC<{ onStartGame: (options: GameOptions) => void; }> = ({ onStartGame }) => {
    const { name, cefrResult } = useUser();
    const { totalPoints, totalMatches, totalIncorrectAttempts, grammarStats, listeningStats } = useStats();
    const [showAdviceModal, setShowAdviceModal] = useState(false);
    const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');

    const wordMatchSuccessRate = totalMatches > 0 || totalIncorrectAttempts > 0 ? ((totalMatches / (totalMatches + totalIncorrectAttempts)) * 100).toFixed(0) : 0;
    const grammarSuccessRate = (grammarStats.totalCorrect + grammarStats.totalIncorrect > 0) ? ((grammarStats.totalCorrect / (grammarStats.totalCorrect + grammarStats.totalIncorrect)) * 100).toFixed(0) : 0;
    const listeningSuccessRate = (listeningStats.totalCorrect + listeningStats.totalIncorrect > 0) ? ((listeningStats.totalCorrect / (listeningStats.totalCorrect + listeningStats.totalIncorrect)) * 100).toFixed(0) : 0;
    
    const handleShare = async () => {
        const summary = `📊 إحصائياتي في WordUp - ${name || 'لاعب'} 🚀

🇬🇧 مستواي: ${cefrResult?.finalLevel || 'لم يحدد بعد'}
🧠 المفردات المقدرة: ${cefrResult?.estimatedVocab || 'N/A'}

🏆 مطابقة الكلمات:
- النقاط: ${totalPoints}
- نسبة النجاح: ${wordMatchSuccessRate}%

🧠 اختبار القواعد:
- النقاط: ${grammarStats.totalPoints}
- نسبة النجاح: ${grammarSuccessRate}%

🎧 اختبار الاستماع:
- النقاط: ${listeningStats.totalPoints}
- نسبة النجاح: ${listeningSuccessRate}%

انضم إلي في WordUp واختبر مستواك في الإنجليزية!
https://englishgame1.vercel.app/`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `إحصائيات ${name} في WordUp`,
                    text: summary,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(summary).then(() => {
                setShareStatus('copied');
                setTimeout(() => setShareStatus('idle'), 2000);
            });
        }
    };
    
    return (
        <div className="w-full max-w-4xl animate-fade-in-up pb-16">
            {showAdviceModal && <AdviceModal cefrResult={cefrResult} onClose={() => setShowAdviceModal(false)} />}
            
            <header className="flex justify-between items-center mb-6 pt-16">
                <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-violet-500">
                    إحصائيات {name || ''}
                </h2>
                <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 py-2 px-4 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition active:scale-95 text-sm font-semibold"
                >
                    {shareStatus === 'copied' ? <CheckCircleIcon className="w-6 h-6 text-green-500" /> : <ArrowUpOnSquareIcon className="w-6 h-6" />}
                    <span>{shareStatus === 'copied' ? 'تم النسخ!' : 'مشاركة'}</span>
                </button>
            </header>

            <div className="space-y-6">
                {cefrResult ? (
                     <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg w-full text-center">
                        <h3 className="text-xl font-bold mb-2">مستواك اللغوي (CEFR)</h3>
                        <p className="text-6xl font-bold my-3 text-green-500">{cefrResult.finalLevel}</p>
                        <p className="text-lg text-slate-600 dark:text-slate-300">مفرداتك تقدر بـ <span className="font-bold">{cefrResult.estimatedVocab}</span></p>
                        <button 
                            onClick={() => setShowAdviceModal(true)}
                            className="mt-4 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                        >
                            عرض التفاصيل والنصائح
                        </button>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg w-full text-center">
                        <h3 className="text-xl font-bold mb-2">لم تحدد مستواك بعد</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-4">قم بإجراء اختبار تحديد المستوى لمعرفة مستواك الحالي والحصول على نصائح مخصصة.</p>
                        <button 
                            onClick={() => onStartGame({ mode: 'cefr-test' })}
                            className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-6 rounded-lg"
                        >
                            ابدأ الاختبار الآن
                        </button>
                    </div>
                )}
                
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-center">مطابقة الكلمات</h3>
                        <div className="space-y-3">
                           <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg text-center"><p className="text-sm text-slate-500 dark:text-slate-400">النقاط</p><p className="text-2xl font-bold text-green-500">{totalPoints}</p></div>
                           <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg text-center"><p className="text-sm text-slate-500 dark:text-slate-400">نسبة النجاح</p><p className="text-2xl font-bold text-sky-500">{wordMatchSuccessRate}%</p></div>
                        </div>
                    </div>
                     <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-center">اختبار القواعد</h3>
                        <div className="space-y-3">
                           <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg text-center"><p className="text-sm text-slate-500 dark:text-slate-400">النقاط</p><p className="text-2xl font-bold text-green-500">{grammarStats.totalPoints}</p></div>
                           <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg text-center"><p className="text-sm text-slate-500 dark:text-slate-400">نسبة النجاح</p><p className="text-2xl font-bold text-sky-500">{grammarSuccessRate}%</p></div>
                        </div>
                    </div>
                     <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-center">اختبار الاستماع</h3>
                        <div className="space-y-3">
                           <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg text-center"><p className="text-sm text-slate-500 dark:text-slate-400">النقاط</p><p className="text-2xl font-bold text-green-500">{listeningStats.totalPoints}</p></div>
                           <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg text-center"><p className="text-sm text-slate-500 dark:text-slate-400">نسبة النجاح</p><p className="text-2xl font-bold text-sky-500">{listeningSuccessRate}%</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BottomNavBar: React.FC<{ activeTab: 'home' | 'stats'; onTabChange: (tab: 'home' | 'stats') => void; }> = ({ activeTab, onTabChange }) => {
    const navButtonClasses = "flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 focus:outline-none";
    const activeClasses = "text-sky-500 dark:text-sky-400";
    const inactiveClasses = "text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400";

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-around items-center z-40">
            <button onClick={() => onTabChange('home')} className={`${navButtonClasses} ${activeTab === 'home' ? activeClasses : inactiveClasses}`}>
                {activeTab === 'home' ? <HomeIconSolid className="w-7 h-7" /> : <HomeIconOutline className="w-7 h-7" />}
                <span className="text-xs font-semibold">الرئيسية</span>
            </button>
            <button onClick={() => onTabChange('stats')} className={`${navButtonClasses} ${activeTab === 'stats' ? activeClasses : inactiveClasses}`}>
                {activeTab === 'stats' ? <ChartBarIconSolid className="w-7 h-7" /> : <ChartBarIconOutline className="w-7 h-7" />}
                <span className="text-xs font-semibold">الإحصائيات</span>
            </button>
        </nav>
    );
}

// --- Main Component ---

interface HomeScreenProps {
    onStartGame: (options: GameOptions) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartGame }) => {
    const { theme, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState<'home' | 'stats'>('home');
    const [showCategoryPicker, setShowCategoryPicker] = useState(false);
    const [showGrammarOptions, setShowGrammarOptions] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [aboutButtonText, setAboutButtonText] = useState('من نحن');
    const aboutTexts = useMemo(() => ['من نحن', 'عن التطبيق', 'شاركنا رأيك!'], []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setAboutButtonText(prevText => {
                const currentIndex = aboutTexts.indexOf(prevText);
                const nextIndex = (currentIndex + 1) % aboutTexts.length;
                return aboutTexts[nextIndex];
            });
        }, 5000);
        return () => clearInterval(intervalId);
    }, [aboutTexts]);

    const handleCategoryChoice = (category: Category) => {
        onStartGame({ mode: 'category', category });
        setShowCategoryPicker(false);
    };

    return (
        <div className="flex flex-col items-center h-full pb-20">
            {showCategoryPicker && <CategoryPicker onChoice={handleCategoryChoice} onClose={() => setShowCategoryPicker(false)} />}
            {showGrammarOptions && <GrammarOptionsModal onStartGame={onStartGame} onClose={() => setShowGrammarOptions(false)} />}
            {showAboutModal && <AboutModal onClose={() => setShowAboutModal(false)} />}

            <header className="absolute top-4 w-full px-4 flex justify-between items-center z-10">
                <button onClick={() => setShowAboutModal(true)} className="flex items-center gap-2 p-2 px-3 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition active:scale-95 text-sm font-semibold">
                    <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-slate-800 dark:text-slate-200" />
                    <span className="hidden sm:inline">{aboutButtonText}</span>
                    <span className="sm:hidden">{aboutButtonText}</span>
                </button>
                <button onClick={toggleTheme} className="flex items-center gap-2 py-2 px-3 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition active:scale-95 text-sm font-semibold">
                    {theme === 'light' ? <MoonIcon className="w-6 h-6 text-slate-800" /> : <SunIcon className="w-6 h-6 text-yellow-400" />}
                    <span className="hidden sm:inline">{theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري'}</span>
                </button>
            </header>

            {activeTab === 'home'
                ? <MainMenuScreen onStartGame={onStartGame} onShowCategoryPicker={() => setShowCategoryPicker(true)} onShowGrammarOptions={() => setShowGrammarOptions(true)} />
                : <StatsScreen onStartGame={onStartGame} />
            }

            <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
};

export default HomeScreen;