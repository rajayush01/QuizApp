import React, { useState, useEffect } from 'react';
import { GameComplete } from './components/GameComplete';
import { ScoreAnimation } from './components/ScoreAnimation';
import { motion } from "framer-motion"; // For smooth animations
import { TimerComponent } from './components/TimerComponent';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { Modal } from './components/Modal';

const QuizApp = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [showReading, setShowReading] = useState(false);
  const [showPractice, setShowPractice] = useState(false);
  const [answeredQuestion, setAnsweredQuestion] = useState(false);
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTimeUp = () => {
    if (!showFeedback) {
      setTimeUp(true);
      handleAnswerClick(false);
    }
  };

  const handleAnswerClick = (isCorrect) => {
    setIsCorrect(isCorrect);
    setShowFeedback(true);
    setAnsweredQuestion(true);

    if (isCorrect) {
      setShowScoreAnimation(true);
      setScore(prev => prev + parseInt(data.correct_answer_marks));
      setTimeout(() => setShowScoreAnimation(false), 1000);
    } else {
      setScore(prev => Math.max(0, prev - parseInt(data.negative_marks)));
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setTimeUp(false);
    setAnsweredQuestion(false);

    if (currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameComplete(false);
    setShowFeedback(false);
    setAnsweredQuestion(false);
    setTimeUp(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen quiz-gradient-bg">
        <div className="text-xl font-semibold animate-pulse quiz-text-gradient">
          Loading Quiz...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4 m-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) return null;

  if (gameComplete) {
    return (
      <GameComplete
        score={score}
        totalQuestions={data.questions.length}
        correctAnswerMarks={data.correct_answer_marks}
        onRestartClick={restartQuiz}
      />
    );
  }

  const currentQuestion = data.questions[currentQuestionIndex];

  return (
<motion.div 
  className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-10 text-white overflow-hidden"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  {/* Animated Glow Effect */}
  <motion.div
    className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-700/20 via-transparent to-blue-700/20 blur-3xl"
    animate={{ opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-3xl mx-auto p-8 bg-black shadow-gray-500 shadow-xl rounded-2xl border border-gray-700 relative ">
        {/* Header */}
        <h1 className="text-3xl font-bold text-white text-center">⚡ Gamified Quiz</h1>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-300 mt-5">
              Question {currentQuestionIndex + 1} of {data.questions.length}
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <motion.div
              className="text-center relative"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <p className="text-sm text-gray-400">Score</p>
              <p className="text-3xl font-bold text-yellow-400">{score}</p>
              {showScoreAnimation && <ScoreAnimation score={data.correct_answer_marks} />}
            </motion.div>
            {!answeredQuestion && (
              <TimerComponent onTimeUp={handleTimeUp} initialTime={30} />
            )}
          </div>
        </div>

        <div className='flex flex-col gap-5'>
          <ProgressBar
            progress={(currentQuestionIndex / data.questions.length) * 100}
          />

          {/* Question */}
          <QuestionCard
            question={currentQuestion}
            showFeedback={showFeedback}
            onAnswerClick={handleAnswerClick}
            disabled={answeredQuestion}
          />
        </div>

        {/* Feedback and Post-Answer Options */}
        {showFeedback && (
          <div className="space-y-6 mt-5">
            <div className={`p-4 rounded-xl ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              } animate-fadeIn`}>
              <div className="font-bold text-lg">
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </div>
              <div>
                {isCorrect
                  ? `+${data.correct_answer_marks} points`
                  : `-${data.negative_marks} points`}
              </div>
            </div>
            {currentQuestion.detailed_solution && (
              <div className="relative bg-gradient-to-br from-white/90 to-gray-100/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200 animate-fadeIn transform transition-all duration-300 hover:scale-[1.02]">
  
              {/* Floating Glow Bar */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
            
              {/* Heading */}
              <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text tracking-wide drop-shadow-md text-center">
                Detailed Solution
              </h3>
            
              {/* Solution Content */}
              <div
                className="prose max-w-none text-gray-900 leading-relaxed mt-4 text-lg tracking-wide"
                dangerouslySetInnerHTML={{
                  __html: currentQuestion.detailed_solution
                }}
              />
            </div>
            
            )}
            {/* Study Materials (shown after answering) */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowReading(true)}
                className="p-4 rounded-xl text-white font-semibold text-center transition-all duration-300 quiz-button-gradient hover:shadow-lg"
              >
                Review Study Material
              </button>
              <button
                onClick={() => setShowPractice(true)}
                className="p-4 rounded-xl text-white font-semibold text-center transition-all duration-300 quiz-button-gradient hover:shadow-lg"
              >
                Try Practice Material
              </button>
            </div>

            <button
              onClick={handleNextQuestion}
              className="w-full p-4 rounded-xl text-white font-semibold text-center transition-all duration-300 bg-indigo-600 hover:bg-indigo-700"
            >
              Next Question
            </button>
          </div>
        )}

        {/* Modals */}
        <Modal
          isOpen={showReading}
          onClose={() => setShowReading(false)}
          title="Study Material"
        >
          <div className="space-y-4">
            {currentQuestion.reading_material?.content_sections.map((section, index) => (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: section }}
                className="prose max-w-none"
              />
            ))}
          </div>
        </Modal>

        <Modal
          isOpen={showPractice}
          onClose={() => setShowPractice(false)}
          title="Practice Material"
        >
          <div className="space-y-4">
            {currentQuestion.reading_material?.practice_material.content.map((content, index) => (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: content }}
                className="prose max-w-none"
              />
            ))}
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold mb-2">Keywords to Fill:</h3>
              <div className="flex flex-wrap gap-2">
                {currentQuestion.reading_material?.practice_material.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      </motion.div>
    </motion.div>
  );
};

export default QuizApp;