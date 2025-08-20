// src/pages/LogMood.jsx
import { useState } from "react";

export default function LogMoodPage() {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood) {
      alert("Please select your mood.");
      return;
    }
    console.log({ mood, note }); // later save to backend/db
    alert("Mood logged successfully!");
    setMood("");
    setNote("");
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
              {["😊", "😐", "😢", "😡", "😴"].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className={`text-3xl transition transform hover:scale-125 ${
                    mood === emoji ? "ring-2 ring-blue-400 rounded-full" : ""
                  }`}
                  onClick={() => setMood(emoji)}
                >
                  {emoji}
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Save Mood
          </button>
        </form>
      </div>
    </div>
  );
}
