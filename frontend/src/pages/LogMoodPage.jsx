// src/pages/LogMood.jsx
import { useState } from "react";
import api from "@/utils/axios";

const MOOD_OPTIONS = [
  { emoji: "😊", value: "happy", label: "Happy" },
  { emoji: "😐", value: "neutral", label: "Neutral" },
  { emoji: "😢", value: "sad", label: "Sad" },
  { emoji: "😡", value: "angry", label: "Angry" },
  { emoji: "😴", value: "tired", label: "Tired" },
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

      setStatus({ type: "success", message: "Mood logged successfully!" });
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Log Your Mood
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mood Selection */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              How are you feeling?
            </label>
            <div className="flex justify-between">
              {MOOD_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`text-3xl transition transform hover:scale-125 ${
                    mood === option.value ? "ring-2 ring-blue-400 rounded-full" : ""
                  }`}
                  onClick={() => setMood(option.value)}
                  title={option.label}
                >
                  {option.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Note */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Add a note (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write about your day..."
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
            />
          </div>

          {status && (
            <p
              className={`text-sm text-center ${
                status.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Mood"}
          </button>
        </form>
      </div>
    </div>
  );
}
