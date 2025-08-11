import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Your Dashboard</h2>
      <ul className="space-y-2">
        <li><Link to="/journal" className="text-blue-600 underline">Mood Journal</Link></li>
        <li><Link to="/chatbot" className="text-blue-600 underline">Chatbot</Link></li>
      </ul>
    </div>
  );
}

export default Dashboard;