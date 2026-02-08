import { Lock, Star, CheckCircle2 } from 'lucide-react';
import { Unit, Lesson, UserProgress } from '../types';

interface CourseViewProps {
  units: Unit[];
  onStartLesson: (lesson: Lesson) => void;
  userProgress: UserProgress;
}

export function CourseView({ units, onStartLesson, userProgress }: CourseViewProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Learning Path</h2>
        <p className="text-gray-600">Complete lessons to unlock new content and earn XP!</p>
      </div>

      <div className="space-y-8">
        {units.map((unit, unitIndex) => (
          <div key={unit.id} className="bg-white rounded-2xl shadow-lg p-6">
            {/* Unit Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="size-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center text-3xl">
                {unit.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{unit.title}</h3>
                <p className="text-gray-600">{unit.description}</p>
              </div>
            </div>

            {/* Lessons */}
            <div className="space-y-3">
              {unit.lessons.map((lesson, lessonIndex) => {
                const isLocked = lesson.locked;
                const isCompleted = lesson.completed;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => !isLocked && onStartLesson(lesson)}
                    disabled={isLocked}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                      isLocked
                        ? 'bg-gray-100 cursor-not-allowed opacity-60'
                        : isCompleted
                        ? 'bg-green-50 border-2 border-green-300 hover:bg-green-100'
                        : 'bg-blue-50 border-2 border-blue-300 hover:bg-blue-100 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`size-12 rounded-full flex items-center justify-center font-bold ${
                          isLocked
                            ? 'bg-gray-300 text-gray-600'
                            : isCompleted
                            ? 'bg-green-500 text-white'
                            : 'bg-blue-500 text-white'
                        }`}
                      >
                        {isLocked ? (
                          <Lock className="size-6" />
                        ) : isCompleted ? (
                          <CheckCircle2 className="size-6" />
                        ) : (
                          <Star className="size-6" />
                        )}
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-gray-800">{lesson.title}</h4>
                        <p className="text-sm text-gray-600">{lesson.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                        <span className="text-yellow-600">⭐</span>
                        <span className="font-bold text-yellow-600 text-sm">{lesson.xpReward} XP</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Your Progress</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl font-bold">{userProgress.lessonsCompleted}</div>
            <div className="text-sm opacity-90">Lessons Completed</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl font-bold">{userProgress.totalXP}</div>
            <div className="text-sm opacity-90">Total XP</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl font-bold">Level {userProgress.level}</div>
            <div className="text-sm opacity-90">Current Level</div>
          </div>
        </div>
      </div>
    </div>
  );
}
