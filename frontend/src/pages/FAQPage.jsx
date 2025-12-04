import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I log my mood?",
      answer: "Just pick how you’re feeling from the mood options, add any notes if you want, and save. It only takes a few seconds!",
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
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5em" }}>MoodTrack FAQ</h1>
      {faqs.map((faq, index) => (
        <div key={index} style={{ marginBottom: "1em" }}>
          <h3 style={{ marginBottom: "0.3em", color: "#2c3e50" }}>{faq.question}</h3>
          <p style={{ lineHeight: 1.5, color: "#34495e" }}>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
