import { useState } from 'react';
import { Settings, Bell, Volume2, Moon, Globe, Target, Save, User, Mail, Lock } from 'lucide-react';
import { UserSettings } from '../types';

interface SettingsViewProps {
  userSettings: UserSettings;
  setUserSettings: (settings: UserSettings) => void;
}

export function SettingsView({ userSettings, setUserSettings }: SettingsViewProps) {
  const [tempSettings, setTempSettings] = useState(userSettings);
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setUserSettings(tempSettings);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const handleToggle = (key: keyof UserSettings) => {
    setTempSettings({
      ...tempSettings,
      [key]: !tempSettings[key],
    });
  };

  const handleDailyGoalChange = (value: number) => {
    setTempSettings({
      ...tempSettings,
      dailyGoal: value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Settings</h2>
        <p className="text-gray-600">Customize your learning experience</p>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <User className="size-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">Account Settings</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <User className="size-4" />
                <span>Display Name</span>
              </div>
            </label>
            <input
              type="text"
              defaultValue="Alex Johnson"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Mail className="size-4" />
                <span>Email Address</span>
              </div>
            </label>
            <input
              type="email"
              defaultValue="alex.johnson@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Lock className="size-4" />
                <span>Change Password</span>
              </div>
            </label>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Update Password
            </button>
          </div>
        </div>
      </div>

      {/* Learning Preferences */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Target className="size-6 text-green-600" />
          <h3 className="text-xl font-bold text-gray-800">Learning Preferences</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Daily XP Goal: {tempSettings.dailyGoal} XP
            </label>
            <input
              type="range"
              min="10"
              max="200"
              step="10"
              value={tempSettings.dailyGoal}
              onChange={(e) => handleDailyGoalChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(tempSettings.dailyGoal / 200) * 100}%, #e5e7eb ${(tempSettings.dailyGoal / 200) * 100}%, #e5e7eb 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>10 XP</span>
              <span>Casual</span>
              <span>Regular</span>
              <span>Intense</span>
              <span>200 XP</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Globe className="size-4" />
                <span>Learning Language</span>
              </div>
            </label>
            <select
              value={tempSettings.language}
              onChange={(e) => setTempSettings({ ...tempSettings, language: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Italian">Italian</option>
              <option value="Portuguese">Portuguese</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications & Sounds */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="size-6 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-800">Notifications & Sounds</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Bell className="size-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Push Notifications</h4>
                <p className="text-sm text-gray-600">Receive daily reminders to practice</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('notifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                tempSettings.notifications ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  tempSettings.notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Volume2 className="size-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Sound Effects</h4>
                <p className="text-sm text-gray-600">Play sounds for correct/incorrect answers</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('soundEffects')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                tempSettings.soundEffects ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  tempSettings.soundEffects ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Moon className="size-6 text-indigo-600" />
          <h3 className="text-xl font-bold text-gray-800">Appearance</h3>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Moon className="size-5 text-indigo-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Dark Mode</h4>
              <p className="text-sm text-gray-600">Use dark theme for the app</p>
            </div>
          </div>
          <button
            onClick={() => handleToggle('darkMode')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              tempSettings.darkMode ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                tempSettings.darkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="sticky bottom-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Save className="size-5" />
          Save Changes
        </button>
        {showSaved && (
          <p className="text-center text-green-600 text-sm mt-2 font-medium">
            ✓ Settings saved successfully!
          </p>
        )}
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-red-800 mb-4">Danger Zone</h3>
        <div className="space-y-3">
          <button className="w-full px-4 py-3 bg-white border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium">
            Reset All Progress
          </button>
          <button className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
