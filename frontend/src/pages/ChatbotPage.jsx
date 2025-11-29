import React, { useState, useEffect, useRef } from "react";
import api from "@/utils/axios";

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
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
	<div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
	  <div className="text-xl font-semi-bold-circular mb-2">Buddy AI</div>

	  <div className="h-64 overflow-y-auto p-2 border rounded-lg mb-3 bg-gray-50 dark:bg-gray-900">
		{messages.map((m, i) => (
		  <div key={i} className={`mb-2 flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
			<div
			  className={`max-w-[80%] p-2 rounded-xl ${
				m.from === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
			  }`}
			>
			  {m.text}
			</div>
		  </div>
		))}
		{loading && <div className="text-sm text-gray-500">Buddy is typing...</div>}
		<div ref={bottomRef} />
	  </div>

	  <div className="flex items-center gap-2">
		<textarea
		  value={input}
		  onChange={(e) => setInput(e.target.value)}
		  onKeyDown={handleKey}
		  placeholder="Type a message..."
		  className="flex-1 p-2 border rounded-lg resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
		  rows={2}
		/>
		<button
		  onClick={send}
		  disabled={loading || !input.trim()}
		  className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
		>
		  {loading ? "Sending..." : "Send"}
		</button>
	  </div>
	</div>
  );
}