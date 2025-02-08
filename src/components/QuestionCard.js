export const QuestionCard = ({ 
    question, 
    showFeedback, 
    onAnswerClick,
    disabled
  }) => (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl p-8 space-y-6 transform transition-all duration-300 hover:scale-105 border border-gray-700 relative">
      
      <h2 className="text-2xl font-extrabold  bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent text-center tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
  {question.description}
</h2>


      
      <div className="space-y-4">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswerClick(option.is_correct)}
            className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 font-semibold tracking-wide relative
              ${
                showFeedback 
                  ? option.is_correct 
                    ? 'bg-green-600/90 border-green-400 shadow-green-300 text-white'
                    : 'bg-red-600/90 border-red-400 shadow-red-300 text-white'
                  : 'hover:bg-purple-700/80 hover:border-purple-500 hover:shadow-purple-400 border-gray-600 text-gray-200'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
            `}
            disabled={showFeedback || disabled}
          >
            <div className="flex items-center space-x-6">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 text-lg font-bold
                ${
                  showFeedback 
                    ? option.is_correct 
                      ? 'border-green-400 bg-green-700 text-white'
                      : 'border-red-400 bg-red-700 text-white'
                    : 'border-gray-400 bg-gray-700'
                }
              `}>
                {String.fromCharCode(65 + option.id)}
              </div>
              <span className="flex-1">{option.description}</span>
            </div>
  
            {showFeedback && (
              <div className={`absolute inset-0 rounded-2xl blur-lg opacity-30 transition-all duration-300
                ${option.is_correct ? 'bg-green-400' : 'bg-red-400'}
              `}></div>
            )}
          </button>
        ))}
      </div>
      
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full"></div>
    </div>
  );
  
