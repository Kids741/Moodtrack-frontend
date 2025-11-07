import React from "react";

export default function ContactPage() {
  React.useEffect(() => {
    document.title = "Contact | MoodTrack";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">
          Contact Us
        </h2>

        <div className="space-y-4 text-gray-700">
          <p className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-medium w-24">Email:</span>
            <a
              href="mailto:denniskidake76@gmail.com"
              className="text-indigo-600 hover:text-indigo-800 break-words"
            >
              denniskidake76@gmail.com
            </a>
          </p>

          <p className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-medium w-24">Phone:</span>
            <a
              href="tel:+254112101677"
              className="text-indigo-600 hover:text-indigo-800"
            >
              +254 112 101 677
            </a>
          </p>

          <p className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-medium w-24">Address:</span>
            <span className="text-gray-800">20723-00202 KNH, Nairobi, Kenya</span>
          </p>
        </div>

        <div className="mt-8 text-center">
          <a
            href="mailto:denniskidake76@gmail.com"
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Send an Email
          </a>
        </div>
      </div>
    </div>
  );
}
