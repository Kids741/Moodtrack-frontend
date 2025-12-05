import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WelcomeSection() {
  return (
    <section className="text-center py-2">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
            Welcome back, <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Buddy</span>
          </h1>
        </div>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Track your moods. Reflect. Grow.
        </p>
        
        <div className="relative mb-8">
          <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-lg">
            <div className="text-6xl">🌸</div>
          </div>
        </div>

        {/* Start Logging button navigates to login/signup */}
        <Link to="/login">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-400 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            Start Logging
          </button>
        </Link>
      </div>
    </section>
  );
}
