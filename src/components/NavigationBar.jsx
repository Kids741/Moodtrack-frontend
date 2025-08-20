import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-indigo-600 hover:text-indigo-800"
          >
            MoodTrack
          </Link>

          {/* Menu Links */}
          <div className="flex space-x-6">
            <Link
              to="/mood-tracker"
              className="text-gray-700 hover:text-indigo-600"
            >
              Mood Tracker
            </Link>
            <Link
              to="/journal"
              className="text-gray-700 hover:text-indigo-600"
            >
              Journal
            </Link>
            <Link
              to="/chatbot"
              className="text-gray-700 hover:text-indigo-600"
            >
              Chatbot
            </Link>
            <Link
              to="/settings"
              className="text-gray-700 hover:text-indigo-600"
            >
              Settings
            </Link>
            <Link
              to="/login"
              className="text-gray-700 hover:text-indigo-600"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
