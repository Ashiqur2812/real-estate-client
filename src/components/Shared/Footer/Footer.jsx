import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";
import {motion} from 'framer-motion'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-pink-50 to-purple-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About DreamWell */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            About DreamWell
          </h3>
          <p className="text-sm">
            DreamWell is your trusted partner in finding the perfect home. We connect users, agents, and admins with exceptional real estate opportunities.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-pink-600 transition-colors duration-300">
                🏠 Home
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-pink-600 transition-colors duration-300">
                📞 Contact Us
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Contact Us
          </h3>
          <p className="text-sm">📍 123 Culinary Street, New York City</p>
          <p className="text-sm">📞 Phone: +123 456 7890</p>
          <p className="text-sm">📧 Email: info@realEstate.com</p>
        </motion.div>

        {/* Follow Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <Link
              to="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-800 hover:text-pink-600 transition-colors duration-300"
            >
              <FaFacebook className="w-6 h-6" />
            </Link>
            <Link
              to="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-800 hover:text-pink-600 transition-colors duration-300"
            >
              <FaInstagram className="w-6 h-6" />
            </Link>
            <Link
              to="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-800 hover:text-pink-600 transition-colors duration-300"
            >
              <FaTwitter className="w-6 h-6" />
            </Link>
            <Link
              to="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-800 hover:text-pink-600 transition-colors duration-300"
            >
              <FaYoutube className="w-6 h-6" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Copyright Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="border-t border-pink-200 mt-8 pt-6 text-center"
      >
        <p className="text-sm">
          &copy; 2025 DreamWell. All rights reserved. 🚀
        </p>
      </motion.div>

      {/* Floating Decorations */}
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-200 rounded-full blur-xl opacity-30 animate-[float_6s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-200 rounded-full blur-xl opacity-30 animate-[float_6s_ease-in-out_2s_infinite]"></div>
    </footer>
  );
};

export default Footer;