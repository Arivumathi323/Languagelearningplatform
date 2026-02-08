import { useState } from 'react';
import { Exercise } from '../../types';

interface MultipleChoiceExerciseProps {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
}

export function MultipleChoiceExercise({ exercise, onAnswer }: MultipleChoiceExerciseProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      onAnswer(selectedOption);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{exercise.question}</h2>
      </div>

      <div className="space-y-3">
        {exercise.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
              selectedOption === option
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-300 bg-white hover:border-gray-400 hover:shadow-sm'
            }`}
          >
            <span className="text-lg font-medium text-gray-800">{option}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className={`px-12 py-4 rounded-xl font-bold text-lg transition-all ${
            selectedOption
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
