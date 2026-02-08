import { useState } from 'react';
import { Volume2 } from 'lucide-react';

export interface MultipleChoiceQuestion {
  type: 'multiple-choice';
  question: string;
  audio?: string;
  options: string[];
  correctAnswer: number;
}

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion;
  onAnswer: (correct: boolean) => void;
}

export function MultipleChoice({ question, onAnswer }: MultipleChoiceProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (hasAnswered) return;
    setSelectedOption(index);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setHasAnswered(true);
    const isCorrect = selectedOption === question.correctAnswer;
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1500);
  };

  const getOptionColor = (index: number) => {
    if (!hasAnswered) {
      return selectedOption === index
        ? 'border-blue-500 bg-blue-50'
        : 'border-gray-300 hover:bg-gray-50';
    }
    
    if (index === question.correctAnswer) {
      return 'border-green-500 bg-green-50';
    }
    
    if (index === selectedOption && selectedOption !== question.correctAnswer) {
      return 'border-red-500 bg-red-50';
    }
    
    return 'border-gray-300';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          {question.audio && (
            <button className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors">
              <Volume2 className="w-6 h-6 text-white" />
            </button>
          )}
          <h2 className="text-2xl font-bold text-gray-900">{question.question}</h2>
        </div>
      </div>

      <div className="grid gap-3 mb-8">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={hasAnswered}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${getOptionColor(index)} ${
              hasAnswered ? 'cursor-default' : 'cursor-pointer'
            }`}
          >
            <span className="text-lg">{option}</span>
          </button>
        ))}
      </div>

      <button
        onClick={handleCheck}
        disabled={selectedOption === null || hasAnswered}
        className="w-full py-4 px-6 rounded-xl font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-green-500 hover:bg-green-600"
      >
        CHECK
      </button>
    </div>
  );
}
