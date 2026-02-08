import { useState } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import { Lesson, Exercise } from '../types';
import { MultipleChoiceExercise } from './exercises/MultipleChoiceExercise';
import { TranslationExercise } from './exercises/TranslationExercise';
import { FillInBlankExercise } from './exercises/FillInBlankExercise';

interface LessonViewProps {
  lesson: Lesson;
  onComplete: (xpEarned: number) => void;
  onExit: () => void;
}

export function LessonView({ lesson, onComplete, onExit }: LessonViewProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / lesson.exercises.length) * 100;
  const isLastExercise = currentExerciseIndex === lesson.exercises.length - 1;

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase().trim();
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setTotalXP(prev => prev + currentExercise.points);
    }
  };

  const handleContinue = () => {
    if (isLastExercise) {
      onComplete(totalXP);
    } else {
      setCurrentExerciseIndex(prev => prev + 1);
      setShowResult(false);
      setSelectedAnswer('');
    }
  };

  return (
    <div className="size-full flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button
            onClick={onExit}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="size-6 text-gray-600" />
          </button>
          
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="text-sm font-medium text-gray-600">
            {currentExerciseIndex + 1} / {lesson.exercises.length}
          </div>
        </div>
      </header>

      {/* Exercise Content */}
      <main className="flex-1 overflow-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {!showResult ? (
            <>
              {currentExercise.type === 'multiple-choice' && (
                <MultipleChoiceExercise
                  exercise={currentExercise}
                  onAnswer={handleAnswer}
                />
              )}
              {currentExercise.type === 'translation' && (
                <TranslationExercise
                  exercise={currentExercise}
                  onAnswer={handleAnswer}
                />
              )}
              {currentExercise.type === 'fill-in-blank' && (
                <FillInBlankExercise
                  exercise={currentExercise}
                  onAnswer={handleAnswer}
                />
              )}
            </>
          ) : (
            <div className="text-center space-y-6">
              <div
                className={`size-24 rounded-full mx-auto flex items-center justify-center ${
                  isCorrect ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                {isCorrect ? (
                  <Check className="size-12 text-green-600" />
                ) : (
                  <X className="size-12 text-red-600" />
                )}
              </div>

              <div>
                <h2
                  className={`text-3xl font-bold mb-2 ${
                    isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isCorrect ? 'Excellent!' : 'Not quite right'}
                </h2>
                {isCorrect ? (
                  <p className="text-gray-600">You earned {currentExercise.points} XP!</p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-gray-600">The correct answer is:</p>
                    <p className="text-xl font-bold text-gray-800">{currentExercise.correctAnswer}</p>
                  </div>
                )}
              </div>

              <button
                onClick={handleContinue}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
              >
                {isLastExercise ? 'Complete Lesson' : 'Continue'}
                <ArrowRight className="size-5" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* XP Counter */}
      <div className="px-4 py-3 bg-yellow-50 border-t border-yellow-200">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-2">
          <span className="text-yellow-600 text-xl">⭐</span>
          <span className="font-bold text-yellow-600">Total XP: {totalXP}</span>
        </div>
      </div>
    </div>
  );
}
