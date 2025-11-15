import { useState, useEffect } from "react";
import api from "@/utils/axios";

export default function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Journal | MoodTrack";
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await api.get("/journal");
      setEntries(res.data || []);
    } catch (error) {
      console.error("Failed to fetch journal entries:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEntry.trim()) return;

    setLoading(true);
    try {
      await api.post("/journal", { content: newEntry });
      setNewEntry("");
      fetchEntries();
    } catch (error) {
      console.error("Failed to create entry:", error);
      alert("Failed to save journal entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Journal</h1>

        {/* New Entry Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">New Entry</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="Write your thoughts here..."
              className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Entry"}
            </button>
          </form>
        </div>

        {/* Journal Entries */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Past Entries</h2>
          {entries.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-500">
              No journal entries yet
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry._id || entry.id} className="bg-white rounded-2xl shadow-lg p-6">
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(entry.createdAt || entry.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
  
}
  
