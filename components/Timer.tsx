
import React, { useState, useEffect, useMemo } from 'react';

interface TimerProps {
  timeLeft: number;
  initialTime: number;
  timeAdjustment: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, initialTime, timeAdjustment }) => {
  const [flyText, setFlyText] = useState<{ text: string, id: number } | null>(null);
  const progressPercentage = useMemo(() => (timeLeft / initialTime) * 100, [timeLeft, initialTime]);
  
  useEffect(() => {
    if (timeAdjustment !== 0) {
      const text = timeAdjustment > 0 ? `+${timeAdjustment}s` : `${timeAdjustment}s`;
      setFlyText({ text, id: Date.now() });
    }
  }, [timeAdjustment]);
  
  const progressBarColor = progressPercentage > 50 ? 'bg-green-500' : progressPercentage > 20 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="w-full my-4">
      <div className="relative h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`absolute top-0 right-0 h-full ${progressBarColor} transition-all duration-500 ease-linear`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="relative text-center mt-2">
        <span className="text-2xl font-bold font-mono text-slate-700 dark:text-slate-300">
          {timeLeft}s
        </span>
        {flyText && (
          <div 
            key={flyText.id} 
            className={`absolute inset-x-0 -top-4 mx-auto w-fit text-lg font-bold animate-fly ${timeAdjustment > 0 ? 'text-green-500' : 'text-red-500'}`}
            onAnimationEnd={() => setFlyText(null)}
          >
            {flyText.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;
