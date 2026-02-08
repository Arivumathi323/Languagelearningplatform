import { UserProgress } from '../App';
import { Award, BookOpen, Flame, Star } from 'lucide-react';

interface HomeProps {
  userProgress: UserProgress;
  onStartLesson: (lessonId: number) => void;
}

const lessons = [
  { id: 1, title: 'Basic Greetings', description: 'Learn hello, goodbye, and more', unlocked: true },
  { id: 2, title: 'Introductions', description: 'Introduce yourself in English', unlocked: true },
  { id: 3, title: 'Numbers & Counting', description: 'Count from 1 to 100', unlocked: true },
  { id: 4, title: 'Food & Drinks', description: 'Order at a restaurant', unlocked: false },
  { id: 5, title: 'Daily Routines', description: 'Talk about your day', unlocked: false },
];

export function Home({ userProgress, onStartLesson }: HomeProps) {
  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">EnglishLearn</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-orange-500">{userProgress.streak}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-gray-700">{userProgress.totalXP} XP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-600">Total XP</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{userProgress.totalXP}</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-gray-600">Day Streak</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{userProgress.streak}</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">Completed</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{userProgress.lessonsCompleted}</p>
          </div>
        </div>

        {/* Unit Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unit {userProgress.currentUnit}: Basics</h2>
          <p className="text-gray-600">Start your English journey with essential phrases</p>
        </div>

        {/* Lessons */}
        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <button
              key={lesson.id}
              onClick={() => lesson.unlocked && onStartLesson(lesson.id)}
              disabled={!lesson.unlocked}
              className={`w-full text-left bg-white rounded-2xl p-6 border-2 transition-all ${
                lesson.unlocked
                  ? 'border-green-500 hover:shadow-lg hover:scale-105 cursor-pointer'
                  : 'border-gray-200 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  lesson.unlocked ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  <span className="text-2xl font-bold text-white">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{lesson.title}</h3>
                  <p className="text-sm text-gray-600">{lesson.description}</p>
                </div>
                {lesson.unlocked ? (
                  <Star className="w-6 h-6 text-yellow-500" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">🔒</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
