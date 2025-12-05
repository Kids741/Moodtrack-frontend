import { useState, useEffect, useRef } from "react";
import { 
  BookOpen, 
  PenTool, 
  Calendar, 
  Clock, 
  Edit3, 
  Trash2, 
  Heart, 
  MessageCircle,
  Send,
  Sparkles 
} from "lucide-react";
import api from "@/utils/axios";

export default function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    document.title = "Journal | MoodTrack";
    fetchEntries();
  }, []);

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [newEntry, editContent]);

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

  const handleEdit = (entry) => {
    setEditingId(entry._id);
    setEditContent(entry.content);
    textareaRef.current?.focus();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editContent.trim()) return;

    setLoading(true);
    try {
      await api.put(`/journal/${editingId}`, { content: editContent });
      setEditingId(null);
      setEditContent("");
      fetchEntries();
    } catch (error) {
      console.error("Failed to update entry:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    
    try {
      await api.delete(`/journal/${id}`);
      fetchEntries();
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-2">
            My Journal
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
            Capture your thoughts, reflect, and grow
          </p>
        </div>

        {/* New Entry Form */}
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 mb-10 border border-white/50">
          <div className="flex items-center gap-3 mb-6">
            <PenTool className="w-7 h-7 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">New Entry</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              ref={textareaRef}
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="What's on your mind today? Let your thoughts flow freely..."
              className="w-full p-6 bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-transparent transition-all resize-none min-h-[140px] text-lg leading-relaxed placeholder:italic placeholder:text-gray-400"
              rows={4}
            />
            <button
              type="submit"
              disabled={loading || !newEntry.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-xl hover:from-blue-500 hover:to-indigo-600 hover:shadow-2xl hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  Save Entry
                </>
              )}
            </button>
          </form>
        </div>

        {/* Journal Entries */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              Past Entries ({entries.length})
            </h2>
          </div>

          {entries.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-16 text-center border border-white/50">
              <BookOpen className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No entries yet</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Your journal is waiting for your first thoughts. Start writing above!
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {entries.map((entry) => (
                <div 
                  key={entry._id} 
                  className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Entry Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-indigo-500" />
                      <span className="text-sm font-semibold text-gray-600">
                        {formatDate(entry.createdAt || entry.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <button
                        onClick={() => handleEdit(entry)}
                        className="p-2 hover:bg-indigo-100 rounded-xl transition-colors"
                        aria-label="Edit entry"
                      >
                        <Edit3 className="w-4 h-4 text-indigo-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(entry._id)}
                        className="p-2 hover:bg-red-100 rounded-xl transition-colors"
                        aria-label="Delete entry"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  {editingId === entry._id ? (
                    <form onSubmit={handleUpdate} className="space-y-3">
                      <textarea
                        ref={textareaRef}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all resize-none min-h-[100px]"
                        rows={4}
                      />
                      <div className="flex gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-60"
                        >
                          {loading ? "Updating..." : "Update"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setEditContent("");
                          }}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">{entry.content}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
