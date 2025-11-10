import { useState } from "react";

function ChatbotPage() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi, I’m your wellbeing buddy! How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState({ mood: null });

  // Rule-based chatbot with context
  const getBotResponse = (message) => {
    let lowerMsg = message.toLowerCase();

    if (!context.mood) {
      if (lowerMsg.includes("sad") || lowerMsg.includes("down")) {
        setContext({ ...context, mood: "sad" });
        return "I’m sorry you’re feeling sad 💙. Would you like me to share some uplifting tips or connect you with a therapist?";
      }
      if (lowerMsg.includes("happy") || lowerMsg.includes("good")) {
        setContext({ ...context, mood: "happy" });
        return "That’s wonderful to hear! 🌟 Keep up the positive vibes. Would you like a motivational quote?";
      }
      return "Thanks for sharing. Could you tell me a bit more about how you’re feeling?";
    }

    // Contextual responses
    if (context.mood === "sad") {
      if (lowerMsg.includes("therapist")) {
        return "You can connect with a therapist from the therapists page in the menu.";
      }
      return "It’s okay to feel low sometimes. Remember, small steps matter 💪. Want me to suggest some quick self-care ideas?";
    }

    if (context.mood === "happy") {
      if (lowerMsg.includes("yes")) {
        return "✨ 'Happiness is not something ready-made. It comes from your own actions.' - Dalai Lama";
      }
      return "Keep enjoying your day! 😊";
    }

    return "I’m here for you, always. 💙";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Bot typing effect
    setIsTyping(true);
    setTimeout(() => {
      const botMessage = { sender: "bot", text: getBotResponse(input) };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Wellbeing Buddy</h1>

      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="italic text-gray-500">Buddy is typing...</div>}
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow border rounded-l-lg p-2 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatbotPage;
