import { Quote } from 'lucide-react';

export default function QuoteOfTheDay() {
  const quote = {
    text: "The greatest revolution of our generation is the discovery that human beings, by changing the inner attitudes of their minds, can change the outer aspects of their lives.",
    author: "William James"
  };

  return (
    <div className="bg-light-200-blue-to-r from-blue-100 via-indigo-100 to-sky-100 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="max-w-4xl mx-auto text-center">
        <Quote className="h-8 w-8 text-blue-500 mx-auto mb-4" />
        
        <blockquote className="text-xl sm:text-2xl font-medium text-gray-800 mb-4 leading-relaxed">
          "{quote.text}"
        </blockquote>
        
        <cite className="text-lg text-blue-600 font-semibold">
          — {quote.author}
        </cite>
      </div>
    </div>
  );
}
