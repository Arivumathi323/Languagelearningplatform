import { useState } from 'react';
import { Home, BookOpen, Trophy, User, BarChart3, Settings } from 'lucide-react';
import { CourseView } from './components/CourseView';
import { LessonView } from './components/LessonView';
import { DashboardView } from './components/DashboardView';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';
import { UserProgress, Lesson, UserProfile, UserSettings } from './types';
import { courseUnits, initialAchievements } from './data/courseData';

type View = 'course' | 'lesson' | 'dashboard' | 'analytics' | 'settings';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('course');
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    profilePicture: '',
    joinedDate: new Date('2024-01-15'),
  });
  const [userSettings, setUserSettings] = useState<UserSettings>({
    dailyGoal: 50,
    notifications: true,
    soundEffects: true,
    darkMode: false,
    language: 'English',
  });
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalXP: 0,
    streak: 1,
    level: 1,
    lessonsCompleted: 0,
    achievements: initialAchievements,
    learningHistory: [],
  });
  const [units, setUnits] = useState(courseUnits);

  const handleStartLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setCurrentView('lesson');
  };

  const handleCompleteLesson = (xpEarned: number) => {
    if (!currentLesson) return;

    const newTotalXP = userProgress.totalXP + xpEarned;
    const newLessonsCompleted = userProgress.lessonsCompleted + 1;
    const newLevel = Math.floor(newTotalXP / 100) + 1;

    // Update lesson completion
    const updatedUnits = units.map(unit => ({
      ...unit,
      lessons: unit.lessons.map(lesson => {
        if (lesson.id === currentLesson.id) {
          return { ...lesson, completed: true };
        }
        return lesson;
      }),
    }));

    // Unlock next lesson
    const currentUnitIndex = updatedUnits.findIndex(u => 
      u.lessons.some(l => l.id === currentLesson.id)
    );
    
    if (currentUnitIndex !== -1) {
      const currentUnit = updatedUnits[currentUnitIndex];
      const currentLessonIndex = currentUnit.lessons.findIndex(l => l.id === currentLesson.id);
      
      // Unlock next lesson in same unit
      if (currentLessonIndex < currentUnit.lessons.length - 1) {
        currentUnit.lessons[currentLessonIndex + 1].locked = false;
      } 
      // Unlock first lesson in next unit
      else if (currentUnitIndex < updatedUnits.length - 1) {
        updatedUnits[currentUnitIndex + 1].lessons[0].locked = false;
      }
    }

    // Check and unlock achievements
    const updatedAchievements = userProgress.achievements.map(achievement => {
      if (achievement.unlocked) return achievement;

      if (achievement.id === 'ach-1' && newLessonsCompleted >= 1) {
        return { ...achievement, unlocked: true, unlockedAt: new Date() };
      }
      if (achievement.id === 'ach-2' && newLessonsCompleted >= 5) {
        return { ...achievement, unlocked: true, unlockedAt: new Date() };
      }
      if (achievement.id === 'ach-4' && newTotalXP >= 100) {
        return { ...achievement, unlocked: true, unlockedAt: new Date() };
      }
      if (achievement.id === 'ach-5' && newLessonsCompleted >= 10) {
        return { ...achievement, unlocked: true, unlockedAt: new Date() };
      }
      if (achievement.id === 'ach-3' && userProgress.streak >= 7) {
        return { ...achievement, unlocked: true, unlockedAt: new Date() };
      }

      return achievement;
    });

    // Add to learning history
    const today = new Date().toISOString().split('T')[0];
    const existingSession = userProgress.learningHistory.find(s => s.date === today);
    
    const updatedHistory = existingSession
      ? userProgress.learningHistory.map(session => 
          session.date === today
            ? {
                ...session,
                xpEarned: session.xpEarned + xpEarned,
                lessonsCompleted: session.lessonsCompleted + 1,
                timeSpent: session.timeSpent + 5,
              }
            : session
        )
      : [
          ...userProgress.learningHistory,
          {
            date: today,
            xpEarned,
            lessonsCompleted: 1,
            timeSpent: 5,
          },
        ];

    setUnits(updatedUnits);
    setUserProgress({
      totalXP: newTotalXP,
      streak: userProgress.streak,
      level: newLevel,
      lessonsCompleted: newLessonsCompleted,
      achievements: updatedAchievements,
      learningHistory: updatedHistory,
    });

    setCurrentView('course');
    setCurrentLesson(null);
  };

  return (
    <div className="size-full flex flex-col bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">EnglishMaster</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-orange-100 px-3 py-1.5 rounded-full">
              <span className="text-orange-600 font-bold">🔥</span>
              <span className="font-bold text-orange-600">{userProgress.streak}</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1.5 rounded-full">
              <span className="text-yellow-600 font-bold">⭐</span>
              <span className="font-bold text-yellow-600">{userProgress.totalXP} XP</span>
            </div>
            <div className="size-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              {userProgress.level}
            </div>
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="size-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold hover:shadow-md transition-shadow"
            >
              {userProfile.profilePicture ? (
                <img src={userProfile.profilePicture} alt="Profile" className="size-full rounded-full object-cover" />
              ) : (
                <span>{userProfile.name.charAt(0)}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {currentView === 'course' && (
          <CourseView 
            units={units} 
            onStartLesson={handleStartLesson}
            userProgress={userProgress}
          />
        )}
        {currentView === 'lesson' && currentLesson && (
          <LessonView 
            lesson={currentLesson} 
            onComplete={handleCompleteLesson}
            onExit={() => setCurrentView('course')}
          />
        )}
        {currentView === 'dashboard' && (
          <DashboardView userProgress={userProgress} userProfile={userProfile} setUserProfile={setUserProfile} />
        )}
        {currentView === 'analytics' && (
          <AnalyticsView userProgress={userProgress} />
        )}
        {currentView === 'settings' && (
          <SettingsView userSettings={userSettings} setUserSettings={setUserSettings} />
        )}
      </main>

      {/* Bottom Navigation */}
      {currentView !== 'lesson' && (
        <nav className="bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-around">
            <button
              onClick={() => setCurrentView('course')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
                currentView === 'course' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Home className="size-6" />
              <span className="text-sm font-medium">Learn</span>
            </button>
            
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
                currentView === 'dashboard' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Trophy className="size-6" />
              <span className="text-sm font-medium">Profile</span>
            </button>
            
            <button
              onClick={() => setCurrentView('analytics')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
                currentView === 'analytics' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="size-6" />
              <span className="text-sm font-medium">Analytics</span>
            </button>
            
            <button
              onClick={() => setCurrentView('settings')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
                currentView === 'settings' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="size-6" />
              <span className="text-sm font-medium">Settings</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}