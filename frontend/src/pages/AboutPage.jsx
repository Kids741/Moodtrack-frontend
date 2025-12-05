import React from "react";
import { Heart, Users, Shield, BarChart3 } from "lucide-react";

const About = () => {
  React.useEffect(() => {
    document.title = "About Moodtrack";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 text-gray-800 px-6 py-10">
      {/* Header Section */}
      <header className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-3">
          About Moodtrack
        </h1>
        <p className="text-gray-600 text-lg">
          Moodtrack is a modern mental health web app that helps you understand and manage your emotional well-being through insightful tracking and reflection.
        </p>
      </header>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 sm:p-10 mb-8">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-700 leading-relaxed">
          At Moodtrack, our mission is to empower individuals to take charge of their emotional and mental health. 
          We believe that awareness is the first step toward healing; our tools make it simple and intuitive 
          to monitor your emotions and identify patterns that influence your daily life.
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto mb-10">
        <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-8">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <Heart className="mx-auto text-pink-500 mb-3" size={36} />
            <h3 className="font-semibold text-lg mb-2">Personalized Tracking</h3>
            <p className="text-gray-600 text-sm">
              Track your emotions and daily moods effortlessly with visual insights.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <BarChart3 className="mx-auto text-indigo-500 mb-3" size={36} />
            <h3 className="font-semibold text-lg mb-2">Analytics & Reports</h3>
            <p className="text-gray-600 text-sm">
              Understand your mood trends and get detailed mental wellness insights.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <Shield className="mx-auto text-green-500 mb-3" size={36} />
            <h3 className="font-semibold text-lg mb-2">Privacy & Security</h3>
            <p className="text-gray-600 text-sm">
              Your data is encrypted and stored securely only you have access.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <Users className="mx-auto text-blue-500 mb-3" size={36} />
            <h3 className="font-semibold text-lg mb-2">Therapist Support</h3>
            <p className="text-gray-600 text-sm">
              Built to support users and mental health professionals seamlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 sm:p-10 mb-8">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          Meet the Team
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Moodtrack was built by a passionate team of developers and healthcare professionals who believe in 
          using technology to foster better mental wellness. We combine empathy, science, and design to make 
          emotional health care accessible to everyone.
        </p>
      </section>
    </div>
  );
};

export default About;
