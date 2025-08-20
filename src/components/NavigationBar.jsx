import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-50 text-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / App Name */}
          <div className="flex-shrink-0 text-xl font-bold">
            Moodtrack
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/logmood" className="hover:text-gray-200">Log Mood</Link>
            <Link to="/journal" className="hover:text-gray-200">Open Journal</Link>
            <Link to="/chatbot" className="hover:text-gray-200">Talk to Chatbot</Link>
            <Link to="/therapists" className="hover:text-blue-500">Find a Therapist</Link>
            <Link to="/settings" className="hover:text-gray-200">Settings</Link>
            <Link to="/login" className="hover:text-gray-200">Login</Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-indigo-700 px-4 py-3 space-y-2">
          <Link to="/logmood" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>Log Mood</Link>
          <Link to="/journal" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>Open Journal</Link>
          <Link to="/chatbot" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>Talk to Chatbot</Link>
          <Link to="/therapists" className="block hover:text-blue-300" onClick={() => setIsOpen(false)}>Find a Therapist</Link>
          <Link to="/settings" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>Settings</Link>
          <Link to="/login" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>Login</Link>
        </div>
      )}
    </nav>
  );
}
