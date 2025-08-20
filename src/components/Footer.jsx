import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto w-full">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-2">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} MoodTrack. All rights reserved.
        </p>
        <p className="text-sm md:text-base">
          Made with ❤️ to support your wellbeing.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
