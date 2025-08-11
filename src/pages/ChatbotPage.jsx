import React, { useState, useEffect } from "react";

export default function ChatbotPage() {
  const [messages, setMessages] = useState(() => {
    // Load chat history from localStorage
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [{ sender: "bot", text: "Hey there 👋 How’s your day going so far?" }];
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Save chat history on every message
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setIsTyping(true);

    // Fake bot response delay
    setTimeout(() => {
      let reply = getBotReply(text);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotReply = (userText) => {
    const lower = userText.toLowerCase();

    if (lower.includes("mood")) {
      return "Got it! 🌈 You can log your mood on the Mood Tracker page.";
    }
    if (lower.includes("journal")) {
      return "Of course! 📓 Your journal is ready to accept your thoughts.";
    }
    if (lower.includes("breathing")) {
      return "🫁 Try this: Inhale deeply for 4 seconds, hold for 7, and exhale for 8 seconds.";
    }

    // Random small talk
    const replies = [
      "I hear you ❤️. Tell me more.",
      "Hmm 🤔 that’s interesting…",
      "Thanks for sharing 💬",
      "You’re doing great, keep going! 💪",
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const quickReplies = [
    "Track my mood 🌈",
    "Write in journal 📓",
    "Breathing exercise 🫁",
    "Tell me something positive 🌞",
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Wellbeing Companion 🤖</h2>

      <div className="bg-white rounded-lg shadow p-4 h-96 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="text-gray-500 italic">Bot is typing...</div>
        )}
      </div>

      {/* Quick reply buttons */}
      <div className="flex flex-wrap gap-2 mt-4">
        {quickReplies.map((qr, i) => (
          <button
            key={i}
            onClick={() => sendMessage(qr)}
            className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
          >
            {qr}
          </button>
        ))}
      </div>

      {/* Input field */}
      <div className="mt-4 flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Type your message..."
          className="flex-1 border rounded-l px-3 py-2"
        />
        <button
          onClick={() => sendMessage(input)}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
