import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  ShieldCheck,
  LogOut,
  Sun,
  Moon,
  Flower,
  Zap,
  Activity,
  MessageCircle,
  Calendar,
  CheckCircle
} from "lucide-react";

const SettingsPage = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    weeklyReports: false,
    newMessages: true,
    friendFlowers: true
  });
  const [theme, setTheme] = useState("light");
  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    moodHistory: "private",
    profileVisibility: "friends"
  });
  const [preferences, setPreferences] = useState({
    moodScale: "1-5",
    language: "English",
    notificationsSound: true
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-blue-500 hover:text-indigo-700 dark:text-indigo-400 mb-6 p-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl hover:shadow-lg transition-all">
            <Settings className="w-6 h-6" />
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-200 mb-4">
            Settings
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto leading-relaxed">
            {user ? `Customize your ${user.name}'s MoodTrack experience` : "Personalize your mental wellness journey"}
          </p>
        </div>

        {/* Profile Section */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
            <User className="w-8 h-8 text-blue-600" />
            Profile
          </h2>
          <div className="flex items-center gap-6 mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800/50 dark:to-indigo-900/50 rounded-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center text-3xl font-bold shadow-2xl">
              {user?.name?.[0]?.toUpperCase() || "M"}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{user?.name || "User"}</p>
              <p className="text-indigo-600 dark:text-blue-400">{user?.email || "email@example.com"}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Link to="#" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
              Edit Profile
            </Link>
            <button className="border-2 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 py-3 px-6 rounded-2xl font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-all">
              Account Security
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Notifications */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
              <Bell className="w-8 h-8 text-orange-500" />
              Notifications
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-800/30 transition-all cursor-pointer group">
                <input
                  type="checkbox"
                  checked={notifications.dailyReminders}
                  onChange={() => toggleNotification("dailyReminders")}
                  className="w-6 h-6 rounded-xl bg-white shadow-lg border-4 border-gray-200 dark:border-slate-600 focus:border-orange-400 transition-all group-hover:scale-105"
                />
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">Daily Mood Reminders</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Get gentle reminders to check in daily</div>
                </div>
              </label>
              <label className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-all cursor-pointer group">
                <input
                  type="checkbox"
                  checked={notifications.newMessages}
                  onChange={() => toggleNotification("newMessages")}
                  className="w-6 h-6 rounded-xl bg-white shadow-lg border-4 border-gray-200 dark:border-slate-600 focus:border-blue-400 transition-all group-hover:scale-105"
                />
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">New Messages</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Buddy chats & therapist replies</div>
                </div>
              </label>
              <label className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-800/30 transition-all cursor-pointer group">
                <input
                  type="checkbox"
                  checked={notifications.friendFlowers}
                  onChange={() => toggleNotification("friendFlowers")}
                  className="w-6 h-6 rounded-xl bg-white shadow-lg border-4 border-gray-200 dark:border-slate-600 focus:border-pink-400 transition-all group-hover:scale-105"
                />
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">Friend Flowers</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">When friends send you flowers</div>
                </div>
              </label>
            </div>
          </div>

          {/* Appearance & Theme */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
              <Palette className="w-8 h-8 text-blue-400" />
              Appearance
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-30 to-indigo-40 dark:from-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-800/30 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl p-3 shadow-lg transition-all ${theme === 'dark' ? 'bg-slate-800 ring-2 ring-blue-300' : 'bg-white ring-2 ring-purple-200'}`}>
                    {theme === 'dark' ? <Moon className="w-6 h-6 text-indigo-300" /> : <Sun className="w-6 h-6 text-yellow-500" />}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">Dark Mode</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{theme === 'dark' ? 'Night owl mode' : 'Light & bright'}</div>
                  </div>
                </div>
                <button
                  onClick={handleThemeToggle}
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl font-bold hover:shadow-lg hover:scale-105 transition-all shadow-md"
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
              </label>
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-emerald-500" />
                  <span className="font-semibold text-gray-800 dark:text-white text-sm">MoodTrack Premium</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Unlock advanced insights & customization</p>
                <button className="w-full bg-gradient-to-r from-emerald-400 to-green-500 text-white py-2 px-4 rounded-xl text-sm font-semibold hover:shadow-xl hover:scale-[1.02] transition-all">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Preferences */}
        <div className="space-y-8 py-4">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-500" />
              Privacy
            </h2>
            <div className="space-y-4 text-sm">
              <label className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-all cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacy.dataSharing}
                  onChange={(e) => setPrivacy(prev => ({...prev, dataSharing: e.target.checked}))}
                  className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="font-medium text-gray-800 dark:text-white">Share anonymized data for research</span>
              </label>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mood History Visibility</label>
                <select
                  value={privacy.moodHistory}
                  onChange={(e) => setPrivacy(prev => ({...prev, moodHistory: e.target.value}))}
                  className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all"
                >
                  <option value="private">Only me</option>
                  <option value="friends">Friends only</option>
                  <option value="therapist">Me + Therapist</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-rose-200/50 dark:border-rose-800/50">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
              <LogOut className="w-8 h-8 text-slate-500" />
              Account
            </h2>
            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <Link to="/flower" className="group bg-gradient-to-r from-pink-200 to-rose-300 text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                <Flower className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Flower Garden
              </Link>
              <button
                onClick={handleLogout}
                className="group bg-gradient-to-r from-slate-400 to-slate-500 text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                <LogOut className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
