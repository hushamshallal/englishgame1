
import React, { useState, useMemo, useEffect } from 'react';
import { useStats } from '../context/StatsContext';
import { useTheme } from '../context/ThemeContext';
import { GameOptions, Category, CATEGORIES } from '../types';
import { SunIcon, MoonIcon, PuzzlePieceIcon, ClockIcon, HeartIcon, ChartBarIcon, LightBulbIcon, SpeakerWaveIcon, QuestionMarkCircleIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';

interface HomeScreenProps {
  onStartGame: (options: GameOptions) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartGame }) => {
  const { totalPoints, totalMatches, totalIncorrectAttempts, totalSessionsPlayed, grammarStats, listeningStats } = useStats();
  const { theme, toggleTheme } = useTheme();
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showGrammarOptions, setShowGrammarOptions] = useState(false);
  const [showGrammarDetails, setShowGrammarDetails] = useState(false);
  const [showListeningDetails, setShowListeningDetails] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  
  const [aboutButtonText, setAboutButtonText] = useState('من نحن');
  const aboutTexts = useMemo(() => ['من نحن', 'عن التطبيق', 'ادعمنا!'], []);

  useEffect(() => {
      const intervalId = setInterval(() => {
          setAboutButtonText(prevText => {
              const currentIndex = aboutTexts.indexOf(prevText);
              const nextIndex = (currentIndex + 1) % aboutTexts.length;
              return aboutTexts[nextIndex];
          });
      }, 5000); // Change every 5 seconds

      return () => clearInterval(intervalId);
  }, [aboutTexts]);


  const handleCategoryChoice = (category: Category) => {
    onStartGame({ mode: 'category', category });
    setShowCategoryPicker(false);
  };
  
  const CategoryPicker = () => (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md text-center">
        <h3 className="text-2xl font-bold mb-6">اختر فئة</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
          {CATEGORIES.map(cat => (
             <button key={cat} onClick={() => handleCategoryChoice(cat)} className="bg-slate-200 dark:bg-slate-700 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-600 font-semibold py-3 px-2 rounded-lg transition-all duration-200 text-sm active:scale-[0.97] active:bg-sky-600">
               {cat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
             </button>
          ))}
        </div>
         <button onClick={() => setShowCategoryPicker(false)} className="mt-6 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">إلغاء</button>
      </div>
    </div>
  );
  
  const GrammarOptionsModal = () => (
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
                onClick={() => setShowGrammarOptions(false)} 
                className="mt-6 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
                إلغاء
            </button>
        </div>
    </div>
  );
  
  const GrammarStatsDetailsModal = () => {
    const { totalCorrect, totalIncorrect, topicStats } = grammarStats;
    const totalAnswered = totalCorrect + totalIncorrect;
    const successRate = totalAnswered > 0 ? ((totalCorrect / totalAnswered) * 100).toFixed(0) : 0;
  
    const weakestTopics = useMemo(() => {
      return Object.entries(topicStats)
        .map(([topic, stats]) => {
          const total = stats.correct + stats.incorrect;
          const incorrectRate = total > 0 ? (stats.incorrect / total) * 100 : 0;
          return { topic, incorrectRate, total, ...stats };
        })
        .filter(t => t.incorrect > 0)
        .sort((a, b) => b.incorrectRate - a.incorrectRate || b.incorrect - a.incorrect)
        .slice(0, 5);
    }, [topicStats]);
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl">
          <h3 className="text-2xl font-bold mb-2 text-center flex items-center justify-center">
            <ChartBarIcon className="w-7 h-7 ml-2 text-sky-500" />
            إحصائيات القواعد
          </h3>
          <div className="grid grid-cols-3 gap-3 text-center my-6">
            <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
              <p className="text-sm text-slate-500 dark:text-slate-400">نسبة النجاح</p>
              <p className="text-2xl font-bold text-green-500">{successRate}%</p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
              <p className="text-sm text-slate-500 dark:text-slate-400">إجابات صحيحة</p>
              <p className="text-2xl font-bold text-blue-500">{totalCorrect}</p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
              <p className="text-sm text-slate-500 dark:text-slate-400">إجابات خاطئة</p>
              <p className="text-2xl font-bold text-red-500">{totalIncorrect}</p>
            </div>
          </div>
  
          {weakestTopics.length > 0 && (
            <div>
              <h4 className="font-bold text-lg mb-3 text-center flex items-center justify-center">
                <LightBulbIcon className="w-6 h-6 ml-2 text-yellow-400" />
                مجالات للتحسين
              </h4>
              <ul className="space-y-2 text-right">
                {weakestTopics.map(({ topic, incorrect, total }) => (
                  <li key={topic} className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg flex justify-between items-center">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{topic}</span>
                    <span className="text-sm text-red-500 font-mono bg-red-100 dark:bg-red-900 px-2 py-1 rounded">
                      {incorrect} / {total} خطأ
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <button 
            onClick={() => setShowGrammarDetails(false)} 
            className="mt-6 w-full bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 font-semibold py-2 px-6 rounded-lg transition-all"
          >
            إغلاق
          </button>
        </div>
      </div>
    );
  };
  
  const ListeningStatsDetailsModal = () => {
    const { totalCorrect, totalIncorrect } = listeningStats;
    const totalAnswered = totalCorrect + totalIncorrect;
    const successRate = totalAnswered > 0 ? ((totalCorrect / totalAnswered) * 100).toFixed(0) : 0;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl">
          <h3 className="text-2xl font-bold mb-2 text-center flex items-center justify-center">
            <ChartBarIcon className="w-7 h-7 ml-2 text-teal-500" />
            إحصائيات الاستماع
          </h3>
          <div className="grid grid-cols-3 gap-3 text-center my-6">
            <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
              <p className="text-sm text-slate-500 dark:text-slate-400">نسبة النجاح</p>
              <p className="text-2xl font-bold text-green-500">{successRate}%</p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
              <p className="text-sm text-slate-500 dark:text-slate-400">إجابات صحيحة</p>
              <p className="text-2xl font-bold text-blue-500">{totalCorrect}</p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
              <p className="text-sm text-slate-500 dark:text-slate-400">إجابات خاطئة</p>
              <p className="text-2xl font-bold text-red-500">{totalIncorrect}</p>
            </div>
          </div>
          
          <button 
            onClick={() => setShowListeningDetails(false)} 
            className="mt-6 w-full bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 font-semibold py-2 px-6 rounded-lg transition-all"
          >
            إغلاق
          </button>
        </div>
      </div>
    );
  };

  const wordMatchSuccessRate = totalMatches > 0 || totalIncorrectAttempts > 0
    ? ((totalMatches / (totalMatches + totalIncorrectAttempts)) * 100).toFixed(0)
    : 100;
  
  const avgPoints = totalSessionsPlayed > 0 
    ? (totalPoints / totalSessionsPlayed).toFixed(0) 
    : 0;

  const DetailsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md text-center shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">إحصائيات مطابقة الكلمات</h3>
            <div className="grid grid-cols-2 gap-4 text-right">
                <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                    <p className="text-sm text-slate-500 dark:text-slate-400">إجمالي الجلسات</p>
                    <p className="text-2xl font-bold text-sky-500">{totalSessionsPlayed}</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                    <p className="text-sm text-slate-500 dark:text-slate-400">إجمالي الأخطاء</p>
                    <p className="text-2xl font-bold text-red-500">{totalIncorrectAttempts}</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                    <p className="text-sm text-slate-500 dark:text-slate-400">نسبة النجاح</p>
                    <p className="text-2xl font-bold text-green-500">{wordMatchSuccessRate}%</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                    <p className="text-sm text-slate-500 dark:text-slate-400">متوسط النقاط</p>
                    <p className="text-2xl font-bold text-yellow-500">{avgPoints}</p>
                </div>
            </div>
            <button 
                onClick={() => setShowDetailsModal(false)} 
                className="mt-6 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 font-semibold py-2 px-6 rounded-lg transition-all"
            >
                إغلاق
            </button>
        </div>
    </div>
  );
  
  const AboutModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-lg shadow-2xl text-center">
        <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-violet-500">
          عن WordUp
        </h3>
        
        <div className="text-right space-y-4 text-slate-600 dark:text-slate-300 my-6">
          <div>
            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-1">لماذا WordUp؟</h4>
            <p>
              WordUp هو مدربك الشخصي لإتقان مفردات وقواعد اللغة الإنجليزية بطريقة تفاعلية وممتعة. عبر أوضاع لعب متنوعة، ستبني مهاراتك من الصفر في بيئة محفزة وجذابة.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-1">رسالتنا</h4>
            <p>
              نهدف لتوفير أداة تعليمية مجانية ومفتوحة المصدر تساهم في نشر المعرفة وتسهيل تعلم اللغة الإنجليزية للناطقين بالعربية، مع التركيز على تصميم عصري وتجربة مستخدم سلسة وخالية من الإعلانات.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-1">المطور</h4>
            <p>
              تم تطوير هذه اللعبة بالكامل بواسطة: <span className="font-bold text-green-500">هشام محسن</span>.
            </p>
             <p className="mt-4 bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                <span className="font-bold">ادعمنا لنستمر!</span><br/>
                لم نضع إعلانات لتقديم تجربة تعليمية صافية. لدعم استمرارية وتطوير WordUp، يمكنكم المساهمة عبر:<br/>
                - <span className="font-semibold text-sky-500">زين كاش:</span> <code className="font-mono">07714811082</code><br/>
                - <span className="font-semibold text-sky-500">حساب ماستر كارد:</span> <code className="font-mono">7115028610</code><br/>
                - <span className="font-semibold text-sky-500">للمشاركة بالتطوير والأفكار، تواصل معنا عبر تليجرام:</span> <a href="https://t.me/C3hem" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">@C3hem</a>
            </p>
            <p className="mt-4 text-center text-sm text-slate-500">ربي يحفظكم ويوفقكم</p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowAboutModal(false)} 
          className="mt-2 w-full bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 font-semibold py-2 px-6 rounded-lg transition-all"
        >
          فهمت، لنبدأ!
        </button>
      </div>
    </div>
  );

  const { totalCorrect: grammarTotalCorrect, totalIncorrect: grammarTotalIncorrect, totalPoints: grammarTotalPoints } = grammarStats;
  const grammarSuccessRate = (grammarTotalCorrect + grammarTotalIncorrect > 0)
    ? ((grammarTotalCorrect / (grammarTotalCorrect + grammarTotalIncorrect)) * 100).toFixed(0)
    : 0;
    
  const { totalCorrect: listeningTotalCorrect, totalIncorrect: listeningTotalIncorrect, totalPoints: listeningTotalPoints } = listeningStats;
  const listeningSuccessRate = (listeningTotalCorrect + listeningTotalIncorrect > 0)
    ? ((listeningTotalCorrect / (listeningTotalCorrect + listeningTotalIncorrect)) * 100).toFixed(0)
    : 0;

  return (
    <div className="flex flex-col items-center justify-center h-full py-8">
      {showCategoryPicker && <CategoryPicker />}
      {showDetailsModal && <DetailsModal />}
      {showGrammarOptions && <GrammarOptionsModal />}
      {showGrammarDetails && <GrammarStatsDetailsModal />}
      {showListeningDetails && <ListeningStatsDetailsModal />}
      {showAboutModal && <AboutModal />}

      <header className="absolute top-4 w-full px-4 flex justify-between items-center">
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

      <div className="text-center mb-10 pt-16">
        <h1 className="text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-violet-500 dark:from-sky-300 dark:to-violet-400 py-2">
            WordUp
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">أتقن الإنجليزية كلمة بكلمة</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-10">
        {/* Listening Stats */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg w-full">
          <h2 className="text-xl font-bold text-center mb-4">اختبار الاستماع</h2>
          <div className="flex justify-around text-center">
              <div>
                  <span className="text-3xl font-bold text-green-500">{listeningTotalPoints}</span>
                  <p className="text-sm text-slate-500 dark:text-slate-400">نقطة</p>
              </div>
              <div>
                  <span className="text-3xl font-bold text-blue-500">{listeningSuccessRate}%</span>
                  <p className="text-sm text-slate-500 dark:text-slate-400">نسبة النجاح</p>
              </div>
          </div>
          <div className="mt-4 text-center">
            <button onClick={() => setShowListeningDetails(true)} className="text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline" disabled={listeningTotalCorrect + listeningTotalIncorrect === 0}>
                عرض التفاصيل
            </button>
          </div>
        </div>

        {/* Word Matching Stats */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg w-full">
          <h2 className="text-xl font-bold text-center mb-4">مطابقة الكلمات</h2>
          <div className="flex justify-around text-center">
              <div>
                  <span className="text-3xl font-bold text-green-500">{totalPoints}</span>
                  <p className="text-sm text-slate-500 dark:text-slate-400">نقطة</p>
              </div>
              <div>
                  <span className="text-3xl font-bold text-blue-500">{totalMatches}</span>
                  <p className="text-sm text-slate-500 dark:text-slate-400">مطابقة صحيحة</p>
              </div>
          </div>
          <div className="mt-4 text-center">
            <button onClick={() => setShowDetailsModal(true)} className="text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline">
                عرض التفاصيل
            </button>
          </div>
        </div>

        {/* Grammar Stats */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg w-full">
          <h2 className="text-xl font-bold text-center mb-4">اختبار القواعد</h2>
          <div className="flex justify-around text-center">
              <div>
                  <span className="text-3xl font-bold text-green-500">{grammarTotalPoints}</span>
                  <p className="text-sm text-slate-500 dark:text-slate-400">نقطة</p>
              </div>
              <div>
                  <span className="text-3xl font-bold text-blue-500">{grammarSuccessRate}%</span>
                  <p className="text-sm text-slate-500 dark:text-slate-400">نسبة النجاح</p>
              </div>
          </div>
          <div className="mt-4 text-center">
            <button onClick={() => setShowGrammarDetails(true)} className="text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline" disabled={grammarStats.totalCorrect + grammarStats.totalIncorrect === 0}>
                عرض التفاصيل
            </button>
          </div>
        </div>
      </div>


      <div className="w-full max-w-md space-y-4">
        <button onClick={() => onStartGame({ mode: 'listening'})} className="w-full text-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-[0.98]">
            <span className="flex items-center justify-center"><SpeakerWaveIcon className="w-6 h-6 ml-2"/> اختبار الاستماع</span>
        </button>
        <button onClick={() => setShowGrammarOptions(true)} className="w-full text-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold py-4 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-[0.98]">
            <span className="flex items-center justify-center"><PuzzlePieceIcon className="w-6 h-6 ml-2"/> اختبار القواعد</span>
        </button>
        <button onClick={() => onStartGame({ mode: 'time', difficulty: 'easy' })} className="w-full text-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-[0.98]">
          تحدّي الوقت
        </button>
        <button onClick={() => onStartGame({ mode: 'training' })} className="w-full text-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-4 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-[0.98]">
          وضع التدريب
        </button>
        <button onClick={() => setShowCategoryPicker(true)} className="w-full text-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-4 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-[0.98]">
          اللعب حسب الفئة
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;