import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#ecebeb] text-[#313131] py-10 pl-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-[#313131] text-xl font-semibold mb-4">About DreamWell</h3>
          <p className="text-[#313131]">
            DreamDwell is your trusted partner in finding the perfect home.
            We connect buyers, sellers, and renters with exceptional real estate opportunities.
          </p>
        </div>
        <div>
          <h3 className="text-[#313131] text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-red-500">Home</Link></li>
            {/* <li><Link to="/all-foods" className="hover:text-red-500">All Properties</Link></li> */}
            <li><Link to="/contact" className="hover:text-red-500">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-[#313131] text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">123 Culinary Street, New York City</p>
          <p className="text-sm">Phone: +123 456 7890</p>
          <p className="text-sm">Email: info@realEstate.com</p>
        </div>
        <div>
          <h3 className="text-[#313131] text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link to="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-red-500">
              <FaFacebook />
            </Link>
            <Link to="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-red-500">
              <FaInstagram />
            </Link>
            <Link to="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-red-500">
              <FaTwitter />
            </Link>
            <Link to="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-red-500">
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm">&copy; 2025 DreamWell. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;