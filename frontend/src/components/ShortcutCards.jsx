import { Link } from "react-router-dom";
import { Plus, BookOpen, MessageCircle, Settings, User, AlertTriangle, Flower } from "lucide-react";

export default function ShortcutCards() {
  const shortcuts = [
    {
      title: "Log Mood",
      description: "Track how you're feeling",
      icon: Plus,
      color: "from-blue-400 to-indigo-400",
      bgColor: "from-blue-50 to-light-blue-50",
      path: "#"
    },
    {
      title: "Open Journal",
      description: "Write your thoughts",
      icon: BookOpen,
      color: "from-sky-300 to-indigo-300",
      bgColor: "from-sky-30 to-indigo-20",
      path: "#"
    },
    {
      title: "Chat with Buddy AI",
      description: "Get support anytime",
      icon: MessageCircle,
      color: "from-blue-300 to-indigo-400",
      bgColor: "from-purple-30 to-pink-20",
      path: "#"
    },
    {
      title: "Connect with a Therapist",
      description: "Schedule or chat with a professional",
      icon: User,
      color: "from-rose-400 to-red-400",
      bgColor: "from-rose-20 to-red-15",
      path: "#"
    },
    {
      title: "Crisis Support",
      description: "Get urgent help right now",
      icon: AlertTriangle,
      color: "from-red-500 to-orange-500",
      bgColor: "from-red-30 to-orange-25",
      path: "#"
    },
    ,{
  title: "Flower Therapy",
  description: "Discover how different flowers promote calmness, joy, and emotional balance.",
  icon: Flower, 
  color: "from-pink-400 to-rose-400",
  bgColor: "from-pink-30 to-rose-25",
  path: "#" 
}

  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {shortcuts.map((shortcut) => {
        const Icon = shortcut.icon;
        return (
          <Link
            key={shortcut.title}
            to={shortcut.path}
            className={`bg-gradient-to-br ${shortcut.bgColor} rounded-2xl p-6 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group block`}
          >
            <div
              className={`w-12 h-12 bg-gradient-to-r ${shortcut.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {shortcut.title}
            </h3>

            <p className="text-sm text-gray-600">{shortcut.description}</p>
          </Link>
        );
      })}
    </div>
  );
}
