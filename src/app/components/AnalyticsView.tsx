import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, Target, Zap, Calendar } from 'lucide-react';
import { UserProgress } from '../types';

interface AnalyticsViewProps {
  userProgress: UserProgress;
}

export function AnalyticsView({ userProgress }: AnalyticsViewProps) {
  // Generate mock data for the last 7 days if no history exists
  const getLast7Days = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const existingSession = userProgress.learningHistory.find(s => s.date === dateStr);
      
      days.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        xp: existingSession?.xpEarned || 0,
        lessons: existingSession?.lessonsCompleted || 0,
        time: existingSession?.timeSpent || 0,
      });
    }
    
    return days;
  };

  const weekData = getLast7Days();
  const totalTimeSpent = userProgress.learningHistory.reduce((sum, s) => sum + s.timeSpent, 0);
  const averageXPPerDay = userProgress.learningHistory.length > 0
    ? Math.round(userProgress.totalXP / Math.max(userProgress.learningHistory.length, 1))
    : 0;

  // Performance by exercise type (mock data)
  const performanceData = [
    { name: 'Multiple Choice', value: 45, color: '#3b82f6' },
    { name: 'Translation', value: 30, color: '#10b981' },
    { name: 'Fill in Blank', value: 25, color: '#f59e0b' },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Learning Analytics</h2>
        <p className="text-gray-600">Track your learning progress and performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="size-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600 font-medium">Total Progress</span>
          </div>
          <div className="text-3xl font-bold text-gray-800">{userProgress.totalXP} XP</div>
          <p className="text-xs text-gray-500 mt-1">All time learning</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="size-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600 font-medium">Avg XP/Day</span>
          </div>
          <div className="text-3xl font-bold text-gray-800">{averageXPPerDay}</div>
          <p className="text-xs text-gray-500 mt-1">Daily average</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="size-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600 font-medium">Time Spent</span>
          </div>
          <div className="text-3xl font-bold text-gray-800">{totalTimeSpent}</div>
          <p className="text-xs text-gray-500 mt-1">Minutes learning</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Zap className="size-5 text-orange-600" />
            </div>
            <span className="text-sm text-gray-600 font-medium">Current Streak</span>
          </div>
          <div className="text-3xl font-bold text-gray-800">{userProgress.streak}</div>
          <p className="text-xs text-gray-500 mt-1">Days in a row</p>
        </div>
      </div>

      {/* XP Progress Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="size-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">XP Progress (Last 7 Days)</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weekData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px' 
              }} 
            />
            <Bar dataKey="xp" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lessons Completed Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="size-6 text-green-600" />
            <h3 className="text-xl font-bold text-gray-800">Lessons Completed</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px' 
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="lessons" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Exercise Type Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Target className="size-6 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-800">Exercise Types</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {performanceData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="size-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white shadow-lg">
        <h3 className="text-xl font-bold mb-4">Weekly Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-sm opacity-90 mb-1">Lessons This Week</div>
            <div className="text-3xl font-bold">
              {weekData.reduce((sum, day) => sum + day.lessons, 0)}
            </div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-sm opacity-90 mb-1">XP This Week</div>
            <div className="text-3xl font-bold">
              {weekData.reduce((sum, day) => sum + day.xp, 0)}
            </div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-sm opacity-90 mb-1">Time This Week</div>
            <div className="text-3xl font-bold">
              {weekData.reduce((sum, day) => sum + day.time, 0)} min
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Achievement Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">Achievements Unlocked</span>
              <span className="font-medium text-gray-800">
                {userProgress.achievements.filter(a => a.unlocked).length} / {userProgress.achievements.length}
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300"
                style={{ 
                  width: `${(userProgress.achievements.filter(a => a.unlocked).length / userProgress.achievements.length) * 100}%` 
                }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">Level Progress</span>
              <span className="font-medium text-gray-800">
                Level {userProgress.level} ({userProgress.totalXP % 100}/100 XP)
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300"
                style={{ width: `${userProgress.totalXP % 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
