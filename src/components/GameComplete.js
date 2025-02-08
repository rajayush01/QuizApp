import { Confetti } from "./Confetti";

export const GameComplete = ({ score, totalQuestions, correctAnswerMarks, onRestartClick }) => {
    const percentage = (score / (totalQuestions * parseInt(correctAnswerMarks))) * 100;
    
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <Confetti />
        <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl shadow-gray-500 shadow-lg p-12 text-center space-y-8 transform animate-fadeIn">
          <div className="relative">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Quiz Complete!
            </h2>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full animate-spin-slow opacity-50" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-400 rounded-full animate-bounce opacity-50" />
          </div>
          
          <div className="relative w-48 h-48 mx-auto">
            <svg className="transform -rotate-90 w-48 h-48">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#e6e6e6"
                strokeWidth="16"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="url(#gradient)"
                strokeWidth="16"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentage / 100)}`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {percentage.toFixed(1)}%
              </div>
            </div>
          </div>
  
          <div className="space-y-4">
            <p className="text-2xl font-semibold text-gray-700">Final Score: {score} points</p>
            <div className="flex gap-2 justify-center">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full ${
                    percentage > i * 20 ? 'bg-yellow-400' : 'bg-gray-200'
                  } transition-all duration-300 delay-${i * 100}`}
                />
              ))}
            </div>
          </div>
  
          <button 
            onClick={onRestartClick}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xl font-bold rounded-xl
              transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  };