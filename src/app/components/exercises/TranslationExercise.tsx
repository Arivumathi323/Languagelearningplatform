import { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { Exercise } from '../../types';

interface TranslationExerciseProps {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
}

export function TranslationExercise({ exercise, onAnswer }: TranslationExerciseProps) {
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

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{exercise.question}</h2>
        
        {exercise.translation && (
          <div className="inline-flex items-center gap-3 bg-blue-50 border-2 border-blue-300 rounded-xl px-8 py-6">
            <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
              <Volume2 className="size-6 text-blue-600" />
            </button>
            <span className="text-2xl font-bold text-blue-800">{exercise.translation}</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-center text-gray-700 font-medium">
          Type the English translation:
        </label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your answer..."
          className="w-full p-6 text-xl border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
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
