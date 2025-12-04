import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle, ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
      answer: "Try refreshing your browser or logging out and back in. If that doesn’t help, contact us at support@moodtrack.app.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 p-3 bg-white/50 backdrop-blur-sm rounded-2xl hover:shadow-lg transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-12 h-12 text-indigo-600" />
            <h1 className="text-4xl lg:text-5xl font-bold text-indigo-600">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about MoodTrack
          </p>
        </div>

        {/* FAQ Items - Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-indigo-50/50 transition-all duration-200"
              >
                <h3 className="text-xl font-bold text-gray-800 flex items-start gap-2 flex-1">
                  <span className="text-indigo-600 flex-shrink-0">Q{index + 1}.</span>
                  <span>{faq.question}</span>
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-indigo-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
                style={{ overflow: "hidden" }}
              >
                <p className="text-gray-700 leading-relaxed px-6 pb-6 pl-14">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-center text-white shadow-2xl">
          <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
          <p className="mb-6">We're here to help! Reach out to our support team.</p>
          <Link
            to="/contact"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
