import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Twitter, Instagram } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto w-full">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
        
        {/* Left side */}
        <div>
          <p className="text-sm md:text-base">
            &copy; {new Date().getFullYear()} MoodTrack. All rights reserved.
          </p>
          <p className="text-sm md:text-base">
            Made with ❤️ to support your wellbeing.
          </p>
        </div>

        {/* Right side (contacts + socials) */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Contact */}
          <div className="flex items-center gap-2">
            <Mail size={18} />
            <a href="mailto:denniskidake76@gmail.com" className="hover:underline">
              denniskidake76@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={18} />
            <a href="tel:+254112101677" className="hover:underline">
              +254112101677
            </a>
          </div>

          {/* Contact Page Link */}
          <div className="flex items-center gap-2">
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a href="https://x.com/d_kidake?t=jehIDGJjhDZIXhtHoARSow&s=09" target="_blank" rel="noopener noreferrer">
              <Twitter size={20} className="hover:text-blue-400" />
            </a>
            <a href="https://www.instagram.com/kids1oo?igsh=MTNiNHFpb2ZrYmFxdw==" target="_blank" rel="noopener noreferrer">
              <Instagram size={20} className="hover:text-pink-500" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
