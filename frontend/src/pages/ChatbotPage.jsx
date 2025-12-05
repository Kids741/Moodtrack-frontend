import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Mic, Menu, X, Heart } from "lucide-react";
import api from "@/utils/axios";

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const bottomRef = useRef(null);

  const send = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((m) => [...m, { from: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/chat", {
        text: userText,
        conversationId
      });

      const data = res.data;
      setConversationId(data.conversationId);
      setMessages((m) => [...m, { from: "bot", text: data.reply }]);
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.error || err.message || "Network error";
      setMessages((m) => [...m, { from: "bot", text: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-xl sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">Buddy AI</h1>
                <p className="text-indigo-100 text-xs sm:text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <a
              href="/dashboard"
              className="px-4 py-2 sm:px-6 sm:py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white text-sm font-semibold transition-all hover:scale-105"
            >
              Back
            </a>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
                <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-pulse" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                How are you feeling today?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-md">
                Start a conversation with Buddy AI. Share your thoughts, feelings, or anything on your mind.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
                <button
                  onClick={() => setInput("I'm feeling stressed today")}
                  className="p-3 sm:p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all text-left text-sm"
                >
                  <span className="text-gray-700 dark:text-gray-300">I'm feeling stressed</span>
                </button>
                <button
                  onClick={() => setInput("I had a great day!")}
                  className="p-3 sm:p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all text-left text-sm"
                >
                  <span className="text-gray-700 dark:text-gray-300"> I had a great day</span>
                </button>
                <button
                  onClick={() => setInput("I need some motivation")}
                  className="p-3 sm:p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all text-left text-sm"
                >
                  <span className="text-gray-700 dark:text-gray-300"> Need motivation</span>
                </button>
                <button
                  onClick={() => setInput("Can we talk about anxiety?")}
                  className="p-3 sm:p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all text-left text-sm"
                >
                  <span className="text-gray-700 dark:text-gray-300">Talk about anxiety</span>
                </button>
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${
                    m.from === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      m.from === "user"
                        ? "bg-gradient-to-br from-blue-400 to-indigo-300 shadow-lg"
                        : "bg-white dark:bg-gray-700 shadow-lg"
                    }`}
                  >
                    {m.from === "user" ? (
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
                    )}
                  </div>
                  
                  {/* Message Bubble */}
                  <div
                    className={`p-4 sm:p-5 rounded-3xl shadow-lg ${
                      m.from === "user"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/30 rounded-tr-sm"
                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-tl-sm"
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">{m.text}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start animate-in slide-in-from-bottom-2">
              <div className="flex gap-3 max-w-[85%] sm:max-w-[75%]">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-3xl rounded-tl-sm border border-gray-200 dark:border-gray-700 shadow-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    </div>
                    <span>Buddy is typing...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="sticky bottom-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700 shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-end gap-2 sm:gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Share how you're feeling..."
                className="w-full p-3 sm:p-4 pr-12 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base leading-relaxed placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 max-h-32 shadow-sm"
                rows={1}
                style={{ minHeight: '48px' }}
              />
            </div>
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-800 hover:to-indigo-800 text-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex-shrink-0"
            >
              <Send className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
