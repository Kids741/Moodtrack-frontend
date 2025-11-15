import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  Info,
  Contact,
  LayoutDashboard,
  Users,
  Smile,
  UserCog,
  MessageCircle,
  LogOut,
  LogIn,
  Menu,
  X,
  BookOpen
} from "lucide-react";
import { useState } from "react";

export default function NavigationBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Navigation items based on auth status
  const guestNav = [
    { name: "Home", icon: Home, href: "/" },
    { name: "About", icon: Info, href: "/about" },
    { name: "Contact", icon: Contact, href: "/contact" },
  ];

  const userNav = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Therapists", icon: Users, href: "/therapists" },
    { name: "Log Mood", icon: Smile, href: "/logmood" },
    { name: "Chatbot", icon: MessageCircle, href: "/chatbot" },
    { name: "Journal", icon: BookOpen, href: "/journal" },
  ];

  const navItems = user ? userNav : guestNav;

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              MoodTrack
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {!user ? (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 flex items-center"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Login / Sign Up
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 pb-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {!user ? (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300"
                >
                  Login / Sign Up
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-center px-4 py-2 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-all duration-300"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Sticky Spacing Fix */}
      <div className="h-16"></div>
    </>
  );
}
