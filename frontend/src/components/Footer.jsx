import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Twitter, Instagram, MessageCircle } from "lucide-react";

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
            Made to support your wellbeing.
          </p>
        </div>

        {/* Right side (contacts + socials) */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Contact Icons */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:kidsdev001@gmail.com"
              className="p-2 rounded-full hover:bg-white/10 transition"
              aria-label="Email us"
              title="Email us"
            >
              <Mail size={20} />
              <span className="sr-only">Email us</span>
            </a>
            <a
              href="tel:+254112101677"
              className="p-2 rounded-full hover:bg-white/10 transition"
              aria-label="Call us"
              title="Call us"
            >
              <Phone size={20} />
              <span className="sr-only">Call us</span>
            </a>
            <Link
              to="/contact"
              className="p-2 rounded-full hover:bg-white/10 transition"
              aria-label="Go to contact page"
              title="Go to contact page"
            >
              <MessageCircle size={20} />
              <span className="sr-only">Go to contact page</span>
            </Link>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/d_kidake?t=jehIDGJjhDZIXhtHoARSow&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 transition"
              aria-label="Visit our Twitter"
              title="Visit our Twitter"
            >
              <Twitter size={20} className="hover:text-blue-400" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://www.instagram.com/kids1oo?igsh=MTNiNHFpb2ZrYmFxdw=="
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 transition"
              aria-label="Visit our Instagram"
              title="Visit our Instagram"
            >
              <Instagram size={20} className="hover:text-pink-500" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
