import { Link } from "react-router-dom";
import { Plus, BookOpen, MessageCircle, Settings } from "lucide-react";

export default function ShortcutCards() {
  const shortcuts = [
    {
      title: "Log Mood",
      description: "Track how you're feeling",
      icon: Plus,
      color: "from-indigo-400 to-purple-400",
      bgColor: "from-indigo-50 to-purple-50",
      path: "/mood-tracker"
    },
    {
      title: "Open Journal",
      description: "Write your thoughts",
      icon: BookOpen,
      color: "from-sky-400 to-indigo-400",
      bgColor: "from-sky-50 to-indigo-50",
      path: "/journal"
    },
    {
      title: "Talk to Chatbot",
      description: "Get support anytime",
      icon: MessageCircle,
      color: "from-purple-400 to-pink-400",
      bgColor: "from-purple-50 to-pink-50",
      path: "/chatbot"
    },
    {
      title: "Settings",
      description: "Customize your experience",
      icon: Settings,
      color: "from-emerald-400 to-teal-400",
      bgColor: "from-emerald-50 to-teal-50",
      path: "/settings"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {shortcuts.map((shortcut, index) => {
        const Icon = shortcut.icon;
        return (
          <Link
            key={index}
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
