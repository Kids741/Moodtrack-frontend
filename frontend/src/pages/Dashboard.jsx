import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/utils/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { 
  Activity, 
  Headphones, 
  Settings, 
  Flower, 
  MessageCircle,
  BookOpen,
  Shield,
  User,
  Zap,
  Heart
} from "lucide-react";

const MOOD_COLOR_MAP = {
  happy: "#10b981",
  calm: "#3b82f6",
  neutral: "#6366f1",
  sad: "#3b82f6",
  angry: "#ef4444",
  tired: "#8b5cf6",
  anxious: "#f59e0b",
};

const FALLBACK_COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6"];

const formatMoodLabel = (mood) => {
  if (!mood) return "Unknown";
  return mood.charAt(0).toUpperCase() + mood.slice(1);
};

const aggregateWeeklyTrend = (entries) => {
  if (!Array.isArray(entries) || entries.length === 0) {
    return { chartData: [], moodKeys: [] };
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const dayBuckets = [];
  const dayMap = {};

  for (let offset = 6; offset >= 0; offset -= 1) {
    const day = new Date(now);
    day.setDate(now.getDate() - offset);
    const key = day.toISOString().split("T")[0];
    const label = day.toLocaleDateString(undefined, { weekday: "short" });
    const bucket = { key, label, counts: {} };
    dayBuckets.push(bucket);
    dayMap[key] = bucket;
  }

  const totals = {};

  entries.forEach((entry) => {
    if (!entry?.mood) return;
    const rawDate = entry.createdAt || entry.date;
    if (!rawDate) return;
    const entryDate = new Date(rawDate);
    if (Number.isNaN(entryDate.getTime())) return;
    entryDate.setHours(0, 0, 0, 0);
    const key = entryDate.toISOString().split("T")[0];
    const bucket = dayMap[key];
    if (!bucket) return;
    bucket.counts[entry.mood] = (bucket.counts[entry.mood] || 0) + 1;
    totals[entry.mood] = (totals[entry.mood] || 0) + 1;
  });

  const moodKeys = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([mood]) => mood);

  const chartData = dayBuckets.map(({ label, counts }) => {
    const row = { day: label };
    moodKeys.forEach((mood) => {
      row[mood] = counts[mood] || 0;
    });
    return row;
  });

  return { chartData, moodKeys };
};

const buildMoodDistribution = (entries) => {
  if (!Array.isArray(entries) || entries.length === 0) {
    return [];
  }

  const totals = entries.reduce((acc, entry) => {
    if (!entry?.mood) return acc;
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(totals).map(([mood, value], index) => ({
    key: mood,
    label: formatMoodLabel(mood),
    name: formatMoodLabel(mood),
    value,
    color: MOOD_COLOR_MAP[mood] || FALLBACK_COLORS[index % FALLBACK_COLORS.length],
  }));
};

function Dashboard() {
  const [user, setUser] = useState(null);
  const [moodEntries, setMoodEntries] = useState([]);
  const [moodLoading, setMoodLoading] = useState(false);
  const [moodError, setMoodError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    const fetchMoods = async () => {
      setMoodLoading(true);
      setMoodError(null);
      try {
        const response = await api.get("/moods");
        setMoodEntries(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Failed to load moods", err);
        const message =
          err.response?.data?.message ||
          (err.response?.status === 401
            ? "Please log in to see your mood history."
            : "Unable to load your mood history right now.");
        setMoodError(message);
        setMoodEntries([]);
      } finally {
        setMoodLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    if (!token) {
      setMoodEntries([]);
      setMoodError("Please log in to see your mood history.");
      return;
    }

    fetchMoods();
  }, []);

  const { chartData, moodKeys } = useMemo(
    () => aggregateWeeklyTrend(moodEntries),
    [moodEntries]
  );

  const moodStats = useMemo(
    () => buildMoodDistribution(moodEntries),
    [moodEntries]
  );

  const totalMoodsLogged = moodEntries.length;

  const weeklyMoodTotal = useMemo(() => {
    if (!chartData.length || !moodKeys.length) return 0;
    return chartData.reduce((sum, row) => {
      return (
        sum +
        moodKeys.reduce((inner, key) => inner + (row[key] || 0), 0)
      );
    }, 0);
  }, [chartData, moodKeys]);

  const favoriteMood = useMemo(() => {
    if (!moodStats.length) return null;
    return moodStats.reduce((prev, current) =>
      current.value > prev.value ? current : prev
    );
  }, [moodStats]);

  const favoriteMoodShare = favoriteMood && totalMoodsLogged
    ? Math.round((favoriteMood.value / totalMoodsLogged) * 100)
    : 0;

  const moodLines = moodKeys.map((moodKey, index) => ({
    key: moodKey,
    color: MOOD_COLOR_MAP[moodKey] || FALLBACK_COLORS[index % FALLBACK_COLORS.length],
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24 p-6 lg:p-8">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600  bg-clip-text text-transparent mb-4">
            {user ? `Welcome back, ${user.name}!` : "MoodTrack Dashboard"}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Track your mood patterns, get insights, and prioritize your mental wellness journey.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">This Week</p>
                <p className="text-3xl font-bold text-indigo-600">{weeklyMoodTotal}</p>
                <p className="text-sm text-green-600 font-medium">
                  Mood entries logged in the last 7 days
                </p>
              </div>
              <Heart className="w-12 h-12 text-indigo-500 opacity-75" />
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Top Mood</p>
                <p className="text-3xl font-bold text-green-600">
                  {favoriteMood ? favoriteMood.label : "—"}
                </p>
                <p className="text-sm text-gray-600">
                  {favoriteMood
                    ? `${favoriteMoodShare}% of all logged moods`
                    : "Log moods to see insights"}
                </p>
              </div>
              <Zap className="w-12 h-12 text-green-500 opacity-75" />
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">All-Time Logs</p>
                <p className="text-3xl font-bold text-purple-600">{totalMoodsLogged}</p>
                <p className="text-sm text-blue-600 font-medium">Total moods saved to date</p>
              </div>
              <Activity className="w-12 h-12 text-purple-500 opacity-75" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mood Overview Charts */}
          <div className="lg:col-span-3 space-y-8">
            {/* Weekly Mood Trends */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Activity className="w-8 h-8 text-indigo-500" />
                Weekly Mood Overview
              </h3>
              {moodError ? (
                <p className="text-sm text-red-500 text-center">{moodError}</p>
              ) : moodLoading ? (
                <p className="text-sm text-gray-500 text-center">Loading your recent moods...</p>
              ) : chartData.length && moodLines.length ? (
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={chartData}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f8fafc" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tickMargin={12} />
                    <YAxis tickCount={4} axisLine={false} tickLine={false} tickMargin={12} allowDecimals={false} />
                    <Tooltip />
                    {moodLines.map(({ key, color }) => (
                      <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        name={formatMoodLabel(key)}
                        stroke={color}
                        strokeWidth={4}
                        dot={{ fill: color, strokeWidth: 2 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-gray-500 text-center">
                  Log moods throughout the week to see your trends here.
                </p>
              )}
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/journal" className="group relative bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center hover:from-blue-600 hover:to-blue-700">
                <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-90 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-lg">Mood Journal</p>
              </Link>
              <Link to="/chatbot" className="group relative bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center hover:from-green-600 hover:to-green-700">
                <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-90 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-lg">Chat with Buddy</p>
              </Link>
              <Link to="/therapists" className="group relative bg-gradient-to-br from-blue-400 to-blue-500 text-white p-6 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center hover:from-purple-600 hover:to-purple-700">
                <Headphones className="w-10 h-10 mx-auto mb-3 opacity-90 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-lg">Therapist</p>
              </Link>
                <Link to="/flower" className="group relative bg-gradient-to-br from-pink-200 to-rose-300 text-white p-6 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center hover:orange-500">
                <Flower className="w-10 h-10 mx-auto mb-3 opacity-90 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-lg">Send Flower</p>
              </Link>
            </div>
          </div>

          {/* Right Sidebar - Help, Preferences */}
          <div className="space-y-6">
            {/* Mood Distribution Pie */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 sticky top-8">
              <h4 className="text-xl font-bold text-gray-800 mb-6">Mood Distribution</h4>
              {moodStats.length ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={moodStats}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      nameKey="label"
                      label={(entry) => entry.label}
                    >
                      {moodStats.map((entry) => (
                        <Cell key={entry.key} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-gray-500 text-center">
                  Start logging your moods to see the distribution.
                </p>
              )}
            </div>

            {/* Help & Support */}
            <div className="bg-gradient-to-b from-orange-50 to-amber-50 rounded-3xl p-6 shadow-xl border border-orange-100">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-orange-500" />
                Help & Support
              </h4>
              <div className="space-y-3 text-sm">
                <Link to="/support" className="block p-3 rounded-xl bg-white hover:bg-orange-50 transition-colors flex items-center gap-3">
                  <User className="w-5 h-5 text-orange-500" />
                  <span>Live Chat</span>
                </Link>
                <Link to="/faq" className="block p-3 rounded-xl bg-white hover:bg-orange-50 transition-colors flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                  <span>FAQ</span>
                </Link>
                <Link to="/contact" className="block p-3 rounded-xl bg-white hover:bg-orange-50 transition-colors flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-orange-500" />
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6 text-blue-500" />
                Preferences
              </h4>
              <div className="space-y-3 text-sm">
                <label className="flex items-center gap-3 p-3 bg-white rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                  <span>Daily Reminders</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-white rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                  <span>Weekly Reports</span>
                </label>
                <Link to="/settings" className="block w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-3 px-4 rounded-xl text-center font-semibold hover:shadow-lg transition-all duration-300">
                  Full Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
