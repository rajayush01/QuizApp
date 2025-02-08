import React, { useState, useEffect } from 'react';

export const TimerComponent = ({ onTimeUp, initialTime = 30 }) => {
  const [time, setTime] = useState(initialTime);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  const percentage = (time / initialTime) * 100;
  const color = percentage > 50 ? 'text-green-500' : percentage > 20 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="relative w-20 h-20">
      <svg className="transform -rotate-90 w-20 h-20">
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="#e6e6e6"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className={`${color} transition-all duration-1000`}
          strokeDasharray={`${2 * Math.PI * 36}`}
          strokeDashoffset={`${2 * Math.PI * 36 * (1 - percentage / 100)}`}
        />
      </svg>
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold ${color}`}>
        {time}
      </div>
    </div>
  );
};