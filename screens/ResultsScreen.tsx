import React from 'react';
import { SessionStats } from '../types';

interface ResultsScreenProps {
  stats: SessionStats;
  onRestart: () => void;
  onHome: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ stats, onRestart, onHome }) => {
  const { mode, score, matches, incorrectAttempts, level, round, win } = stats;

  const getTitle = () => {
    if (mode === 'time') {
        return win ? "تهانينا، لقد فزت!" : "انتهى الوقت!";
    }
    return "نتائج الجلسة";
  }

  const getMessage = () => {
    if (mode === 'time' && win) {
        return "لقد أكملت تحدي الوقت بنجاح. عمل رائع!";
    }
    return "هذه هي نتائجك في هذه الجلسة.";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold mb-4 text-sky-600 dark:text-sky-400">{getTitle()}</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">{getMessage()}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-sm text-slate-500">النقاط</p>
                <p className="text-3xl font-bold text-green-500">{score}</p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-sm text-slate-500">المطابقات</p>
                <p className="text-3xl font-bold text-blue-500">{matches}</p>
            </div>
            {incorrectAttempts !== undefined && (
              <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                  <p className="text-sm text-slate-500">الأخطاء</p>
                  <p className="text-3xl font-bold text-red-500">{incorrectAttempts}</p>
              </div>
            )}
            {level && (
                 <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                    <p className="text-sm text-slate-500">المستوى</p>
                    <p className="text-3xl font-bold text-yellow-500">{level}</p>
                </div>
            )}
            {round && (
                 <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                    <p className="text-sm text-slate-500">الجولة</p>
                    <p className="text-3xl font-bold text-purple-500">{round}</p>
                </div>
            )}
        </div>
        
        <div className="flex flex-col space-y-4">
          <button 
            onClick={onRestart}
            className="w-full text-lg bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 active:scale-[0.98]"
          >
            إعادة اللعب
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

export default ResultsScreen;