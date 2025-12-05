import { useState } from "react";
import { Heart, MessageCircle, Send, Smile, Frown, Meh, AlertTriangle, Zap } from "lucide-react";
import api from "@/utils/axios";

const MOOD_OPTIONS = [
  { emoji: "😊", value: "happy", label: "Happy", color: "from-orange-400 to-pink-400", icon: Smile },
  { emoji: "😐", value: "neutral", label: "Neutral", color: "from-blue-400 to-indigo-400", icon: Meh },
  { emoji: "😢", value: "sad", label: "Sad", color: "from-blue-500 to-blue-700", icon: Frown },
  { emoji: "😡", value: "angry", label: "Angry", color: "from-red-400 to-orange-500", icon: AlertTriangle },
  { emoji: "😴", value: "tired", label: "Tired", color: "from-purple-400 to-violet-500", icon: Zap },
];

export default function LogMoodPage() {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!mood) {
      setStatus({ type: "error", message: "Please select your mood." });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setStatus({ type: "error", message: "Please log in to save your mood." });
      return;
    }

    setLoading(true);
    try {
      await api.post("/moods", {
        mood,
        note: note.trim() || undefined,
      });

      setStatus({ type: "success", message: "Mood logged successfully! ❤️" });
      setMood("");
      setNote("");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        (err.response?.status === 401
          ? "Your session expired. Please log in again."
          : "We couldn't save your mood. Please try again.");
      setStatus({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  const MoodIcon = ({ option }) => {
    const IconComponent = option.icon;
    return (
      <div className="p-3 bg-gradient-to-br rounded-2xl shadow-lg backdrop-blur-sm border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center shadow-xl mb-2 group-hover:scale-110 transition-transform`}>
          <IconComponent className="w-8 h-8 text-white drop-shadow-md" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-800 mb-1">{option.emoji}</p>
          <p className="text-xs text-gray-600">{option.label}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-300/30 to-indigo-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-sm relative z-10 border border-white/50">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Log Your Mood
          </h1>
          <p className="text-gray-600 text-sm">How are you feeling today?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mood Selection - Glassmorphism Cards */}
          <div>
            <label className="block text-gray-700 font-semibold mb-4 text-center">
              Choose your emotion
            </label>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {MOOD_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`${
                    mood === option.value 
                      ? "ring-4 ring-indigo-400/50 shadow-2xl scale-105" 
                      : "hover:scale-[1.02]"
                  } transition-all duration-300`}
                  onClick={() => setMood(option.value)}
                  aria-label={`Select ${option.label}`}
                >
                  <MoodIcon option={option} />
                </button>
              ))}
            </div>
          </div>

          {/* Optional Note - Modern textarea */}
          <div>
            <label className="block text-gray-700 font-semibold mb-3 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-indigo-500" />
              Add a note (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What made you feel this way today?..."
              className="w-full bg-gradient-to-r from-slate-50 to-gray-50 border border-gray-200 rounded-2xl p-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-transparent transition-all resize-vertical min-h-[100px] placeholder:italic"
              rows={4}
            />
          </div>

          {/* Status Message */}
          {status && (
            <div
              className={`p-4 rounded-2xl text-center text-sm font-medium shadow-lg transition-all ${
                status.type === "success" 
                  ? "bg-green-100 border-2 border-green-200 text-green-800" 
                  : "bg-red-100 border-2 border-red-200 text-red-800"
              }`}
              role="alert"
            >
              {status.message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:from-blue-500 hover:to-indigo-600 hover:shadow-2xl hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 flex items-center justify-center gap-2"
            disabled={loading || !mood}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Save Mood
              </>
            )}
          </button>
        </form>

        {/* Quick stats preview */}
        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            Mood history available in your dashboard ✨
          </p>
        </div>
      </div>
    </div>
  );
}
