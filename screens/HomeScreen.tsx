import React, { useState } from 'react';
import { useStats } from '../context/StatsContext';
import { useTheme } from '../context/ThemeContext';
import { GameOptions, Difficulty, Category, CATEGORIES } from '../types';
import { SunIcon, MoonIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

interface HomeScreenProps {
  onStartGame: (options: GameOptions) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartGame }) => {
  const { totalPoints, totalMatches, resetStats, totalIncorrectAttempts, totalSessionsPlayed } = useStats();
  const { theme, toggleTheme } = useTheme();
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

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

  const successRate = totalMatches > 0 || totalIncorrectAttempts > 0
    ? ((totalMatches / (totalMatches + totalIncorrectAttempts)) * 100).toFixed(0)
    : 100;
  
  const avgPoints = totalSessionsPlayed > 0 
    ? (totalPoints / totalSessionsPlayed).toFixed(0) 
    : 0;

  const DetailsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md text-center shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">إحصائيات مفصلة</h3>
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
                    <p className="text-2xl font-bold text-green-500">{successRate}%</p>
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      {showCategoryPicker && <CategoryPicker />}
      {showDetailsModal && <DetailsModal />}
      <header className="absolute top-4 right-4 flex items-center space-i-4">
        <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition active:scale-95">
          {theme === 'light' ? <MoonIcon className="w-6 h-6 text-slate-800" /> : <SunIcon className="w-6 h-6 text-yellow-400" />}
        </button>
         <button onClick={() => window.confirm('هل أنت متأكد من إعادة تعيين الإحصائيات؟') && resetStats()} className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition active:scale-95">
          <ArrowPathIcon className="w-6 h-6 text-slate-800 dark:text-slate-200" />
        </button>
      </header>

      <div className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-sky-600 dark:text-sky-400">English Match Pro</h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">لعبة مطابقة الكلمات لتعلم الإنجليزية</p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg w-full max-w-md mb-10">
        <h2 className="text-xl font-bold text-center mb-4">إحصائياتك الإجمالية</h2>
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
          <button 
              onClick={() => setShowDetailsModal(true)}
              className="text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline"
          >
              عرض التفاصيل
          </button>
        </div>
      </div>

      <div className="w-full max-w-md space-y-4">
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