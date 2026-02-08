import { useState } from 'react';
import { Volume2 } from 'lucide-react';

export interface TranslationQuestion {
  type: 'translation';
  prompt: string;
  audio?: string;
  wordBank: string[];
  correctAnswer: string[];
}

interface TranslationProps {
  question: TranslationQuestion;
  onAnswer: (correct: boolean) => void;
}

export function Translation({ question, onAnswer }: TranslationProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(
    [...question.wordBank].sort(() => Math.random() - 0.5)
  );
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const addWord = (word: string, index: number) => {
    if (hasAnswered) return;
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter((_, i) => i !== index));
  };

  const removeWord = (index: number) => {
    if (hasAnswered) return;
    const word = selectedWords[index];
    setAvailableWords([...availableWords, word]);
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
  };

  const handleCheck = () => {
    if (selectedWords.length === 0) return;
    setHasAnswered(true);
    const answer = selectedWords.join(' ').toLowerCase();
    const correct = question.correctAnswer.join(' ').toLowerCase();
    const result = answer === correct;
    setIsCorrect(result);
    
    setTimeout(() => {
      onAnswer(result);
    }, 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-600 uppercase mb-3">Write this in English</h3>
        <div className="flex items-center gap-3">
          {question.audio && (
            <button className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors">
              <Volume2 className="w-6 h-6 text-white" />
            </button>
          )}
          <h2 className="text-2xl font-bold text-gray-900">{question.prompt}</h2>
        </div>
      </div>

      {/* Answer Area */}
      <div
        className={`min-h-20 p-4 mb-6 rounded-xl border-2 transition-all ${
          hasAnswered
            ? isCorrect
              ? 'border-green-500 bg-green-50'
              : 'border-red-500 bg-red-50'
            : selectedWords.length > 0
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-white'
        }`}
      >
        <div className="flex flex-wrap gap-2">
          {selectedWords.length === 0 ? (
            <span className="text-gray-400">Tap the words below</span>
          ) : (
            selectedWords.map((word, index) => (
              <button
                key={index}
                onClick={() => removeWord(index)}
                disabled={hasAnswered}
                className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 transition-colors disabled:cursor-default disabled:hover:border-gray-300"
              >
                {word}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Word Bank */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {availableWords.map((word, index) => (
            <button
              key={index}
              onClick={() => addWord(word, index)}
              disabled={hasAnswered}
              className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-default disabled:hover:bg-white disabled:hover:border-gray-300"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleCheck}
        disabled={selectedWords.length === 0 || hasAnswered}
        className="w-full py-4 px-6 rounded-xl font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-green-500 hover:bg-green-600"
      >
        CHECK
      </button>
    </div>
  );
}
