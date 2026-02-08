import { Trophy, Flame, Star, TrendingUp, Award, Target, Camera, Mail, Calendar } from 'lucide-react';
import { UserProgress, UserProfile } from '../types';

interface DashboardViewProps {
  userProgress: UserProgress;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
}

export function DashboardView({ userProgress, userProfile, setUserProfile }: DashboardViewProps) {
  const xpToNextLevel = (userProgress.level * 100) - userProgress.totalXP;
  const levelProgress = (userProgress.totalXP % 100);

  const handleProfilePictureUpload = () => {
    // Simulate profile picture upload - in real app would use file input
    const pictureUrl = prompt('Enter profile picture URL (or leave empty for initials):');
    if (pictureUrl !== null) {
      setUserProfile({ ...userProfile, profilePicture: pictureUrl });
    }
  };

  const memberSince = userProfile.joinedDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="size-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white/50">
              {userProfile.profilePicture ? (
                <img 
                  src={userProfile.profilePicture} 
                  alt="Profile" 
                  className="size-full rounded-full object-cover" 
                />
              ) : (
                <span>{userProfile.name.charAt(0)}</span>
              )}
            </div>
            <button
              onClick={handleProfilePictureUpload}
              className="absolute bottom-0 right-0 size-8 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-50 transition-colors"
            >
              <Camera className="size-4" />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">{userProfile.name}</h2>
            <div className="flex flex-col md:flex-row gap-3 text-sm opacity-90">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="size-4" />
                <span>{userProfile.email}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Calendar className="size-4" />
                <span>Member since {memberSince}</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="size-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/50 mb-2">
              <span className="text-3xl font-bold">{userProgress.level}</span>
            </div>
            <div className="text-sm font-medium">Level {userProgress.level}</div>
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Level Card */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="size-6" />
            </div>
            <h3 className="text-xl font-bold">Level</h3>
          </div>
          <div className="text-5xl font-bold mb-2">{userProgress.level}</div>
          <div className="text-sm opacity-90">
            {xpToNextLevel} XP to Level {userProgress.level + 1}
          </div>
          <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
        </div>

        {/* Streak Card */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Flame className="size-6" />
            </div>
            <h3 className="text-xl font-bold">Streak</h3>
          </div>
          <div className="text-5xl font-bold mb-2">{userProgress.streak}</div>
          <div className="text-sm opacity-90">days in a row</div>
          <div className="mt-4 flex gap-1">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-8 rounded ${
                  i < userProgress.streak ? 'bg-white' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Total XP Card */}
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Star className="size-6" />
            </div>
            <h3 className="text-xl font-bold">Total XP</h3>
          </div>
          <div className="text-5xl font-bold mb-2">{userProgress.totalXP}</div>
          <div className="text-sm opacity-90">experience points</div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Target className="size-5 text-blue-600" />
            <span className="text-sm text-gray-600">Lessons</span>
          </div>
          <div className="text-3xl font-bold text-gray-800">{userProgress.lessonsCompleted}</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="size-5 text-yellow-600" />
            <span className="text-sm text-gray-600">Achievements</span>
          </div>
          <div className="text-3xl font-bold text-gray-800">
            {userProgress.achievements.filter(a => a.unlocked).length}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Star className="size-5 text-purple-600" />
            <span className="text-sm text-gray-600">Avg. XP/Lesson</span>
          </div>
          <div className="text-3xl font-bold text-gray-800">
            {userProgress.lessonsCompleted > 0 
              ? Math.round(userProgress.totalXP / userProgress.lessonsCompleted)
              : 0}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="size-5 text-orange-600" />
            <span className="text-sm text-gray-600">Best Streak</span>
          </div>
          <div className="text-3xl font-bold text-gray-800">{userProgress.streak}</div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Award className="size-8 text-yellow-600" />
          <h3 className="text-2xl font-bold text-gray-800">Achievements</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userProgress.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                achievement.unlocked
                  ? 'bg-yellow-50 border-yellow-300 shadow-sm'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`size-16 rounded-full flex items-center justify-center text-3xl ${
                    achievement.unlocked ? 'bg-yellow-100' : 'bg-gray-200'
                  }`}
                >
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-1">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  {achievement.unlocked && achievement.unlockedAt && (
                    <p className="text-xs text-green-600 mt-1 font-medium">
                      ✓ Unlocked!
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white shadow-lg">
        <h3 className="text-xl font-bold mb-4">Keep Going!</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Daily Goal Progress</span>
              <span>{userProgress.lessonsCompleted > 0 ? '100%' : '0%'}</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: userProgress.lessonsCompleted > 0 ? '100%' : '0%' }}
              />
            </div>
          </div>
          <p className="text-sm opacity-90">
            You're doing great! Keep practicing every day to maintain your streak.
          </p>
        </div>
      </div>
    </div>
  );
}