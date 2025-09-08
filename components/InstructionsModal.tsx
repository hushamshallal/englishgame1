
import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

interface InstructionsModalProps {
  title: string;
  instructions: string[];
  onStart: () => void;
  gameIcon: React.ReactNode;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ title, instructions, onStart, gameIcon }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-lg text-center shadow-2xl animate-scale-in-bounce">
        <div className="mx-auto w-16 h-16 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center mb-4">
          {gameIcon}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="text-right space-y-3 text-slate-600 dark:text-slate-300 mb-6">
          {instructions.map((inst, index) => (
            <p key={index} className="flex items-start">
              <InformationCircleIcon className="w-5 h-5 text-sky-500 ml-2 mt-1 shrink-0" />
              <span>{inst}</span>
            </p>
          ))}
        </div>
        <button
          onClick={onStart}
          className="w-full text-lg bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg transition-all active:scale-[0.98]"
        >
          فهمت، لنبدأ!
        </button>
      </div>
    </div>
  );
};

export default InstructionsModal;
