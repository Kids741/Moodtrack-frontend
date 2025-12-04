import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I log my mood?",
      answer: "Just pick how you're feeling from the mood options, add any notes if you want, and save. It only takes a few seconds!",
    },
    {
      question: "Can I track moods more than once a day?",
      answer: "Yes! You can add as many mood entries as you like throughout the day.",
    },
    {
      question: "What devices can I use MoodTrack on?",
      answer: "You can use MoodTrack on any computer, tablet, or smartphone through your web browser.",
    },
    {
      question: "What kind of insights will I get?",
      answer: "MoodTrack shows simple charts and summaries so you can see how your mood changes over time and what activities help you feel better.",
    },
    {
      question: "Is my information private and safe?",
      answer: "Absolutely. Your mood logs are kept secure and private. We never share your data without your permission.",
    },
    {
      question: "Can I reset my password if I forget it?",
      answer: "Yes! Just use the 'Forgot Password' link on the login page to reset it easily.",
    },
    {
      question: "Is MoodTrack free?",
      answer: "The basic mood tracking is free. We also offer extra features if you want, like detailed reports and customization.",
    },
    {
      question: "How do I delete my account if I want to?",
      answer: "You can delete your account any time from the settings. This will remove all your data permanently.",
    },
    {
      question: "What should I do if I have trouble using MoodTrack?",
      answer: "Try refreshing your browser or logging out and back in. If that doesn't help, contact us at support@moodtrack.app.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            MoodTrack FAQ
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Got questions? We've got answers!
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-8 text-left flex items-center justify-between rounded-2xl hover:bg-blue-50/50 transition-colors duration-200"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <svg
                  className={`w-8 h-8 text-blue-600 transform transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-20 text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-white/50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Still have questions?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We're here to help! Reach out anytime.
            </p>
            <a
              href="mailto:support@moodtrack.app"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Email Support
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
