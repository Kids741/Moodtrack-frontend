import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="pt-24 p-8">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        {user ? `Welcome back, ${user.name}!` : "Welcome to MoodTrack! 🌼"}
      </h2>

      <p className="text-gray-600 mb-6">
        Track your mood, reflect on your thoughts, and find peace every day.
      </p>

      <div className="space-y-2">
        <Link
          to="/journal"
          className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Go to Mood Journal
        </Link>
        <Link
          to="/chatbot"
          className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Chat with Buddy 
        </Link>
        <Link
          to="/therapists"
          className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          connect with a therapist
        </Link>
        <Link
          to="/Flower"
          className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          send a flower to a friend
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
