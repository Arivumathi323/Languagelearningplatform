import { useState } from 'react';
import { Volume2 } from 'lucide-react';

export interface FillInBlankQuestion {
  type: 'fill-in-blank';
  sentence: string;
  blankPosition: number;
  options: string[];
  correctAnswer: number;
  audio?: string;
}

interface FillInBlankProps {
  question: FillInBlankQuestion;
  onAnswer: (correct: boolean) => void;
}

export function FillInBlank({ question, onAnswer }: FillInBlankProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const words = question.sentence.split(' ');
  
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
        <h3 className="text-sm font-bold text-gray-600 uppercase mb-4">Fill in the blank</h3>
        
        {question.audio && (
          <button className="mb-4 w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors">
            <Volume2 className="w-6 h-6 text-white" />
          </button>
        )}

        <div className="p-6 bg-gray-100 rounded-xl">
          <p className="text-xl text-gray-900 leading-relaxed">
            {words.map((word, index) => (
              <span key={index}>
                {index === question.blankPosition ? (
                  <span className="inline-block min-w-32 px-4 py-1 mx-1 border-b-4 border-blue-500 bg-white rounded text-center">
                    {selectedOption !== null ? question.options[selectedOption] : '____'}
                  </span>
                ) : (
                  <span>{word}</span>
                )}
                {index < words.length - 1 && ' '}
              </span>
            ))}
          </p>
        </div>
      </div>

      <h4 className="text-sm font-bold text-gray-600 uppercase mb-3">Choose the correct word</h4>
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
