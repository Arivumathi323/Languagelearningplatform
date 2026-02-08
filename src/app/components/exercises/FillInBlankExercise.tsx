import { useState } from 'react';
import { Exercise } from '../../types';

interface FillInBlankExerciseProps {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
}

export function FillInBlankExercise({ exercise, onAnswer }: FillInBlankExerciseProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onAnswer(answer);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && answer.trim()) {
      handleSubmit();
    }
  };

  // Split question by underscore to show the blank
  const parts = exercise.question.split('___');

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Fill in the blank:</h2>
        
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 rounded-xl p-8 inline-block">
          <div className="flex items-center gap-3 text-2xl font-medium text-gray-800">
            {parts.map((part, index) => (
              <span key={index}>
                {part}
                {index < parts.length - 1 && (
                  <span className="inline-block mx-2 border-b-4 border-blue-500 min-w-[120px] text-center">
                    {answer && (
                      <span className="text-blue-600 font-bold">{answer}</span>
                    )}
                    {!answer && <span className="text-transparent">blank</span>}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <label className="block text-center text-gray-700 font-medium">
          Type the missing word:
        </label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type here..."
          className="w-full p-6 text-xl border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-center"
          autoFocus
        />
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          className={`px-12 py-4 rounded-xl font-bold text-lg transition-all ${
            answer.trim()
              ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Check Answer
        </button>
      </div>
    </div>
  );
}
