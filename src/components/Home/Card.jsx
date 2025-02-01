import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Card = ({ property }) => {
  const { title, location, image, minPrice, maxPrice, _id } = property || {};

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      className="max-w-xl mx-auto h-[34rem] bg-white bg-opacity-90 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500"
    >
      {/* Image Section */}
      <div className="relative group overflow-hidden">
        <img
          src={image}
          alt="Property"
          className="w-full h-72 aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-md text-gray-600 mb-2">
          📍 <span className="font-medium">{location}</span>
        </p>
        <p className="text-md text-gray-600 mb-1">
          💰 Min Price: <span className="font-semibold text-green-600">{minPrice}$</span>
        </p>
        <p className="text-md text-gray-600 mb-4">
          💰 Max Price: <span className="font-semibold text-red-600">{maxPrice}$</span>
        </p>

        {/* Details Button */}
        <div className="text-center mt-6">
          <Link to={`/property/${_id}`}>
            <button class="cursor-pointer font-semibold overflow-hidden relative z-100 border border-green-500 group px-8 py-2 rounded-sm ">
              <span class="relative z-10 text-green-500 group-hover:text-white text-xl duration-500">View Details</span>
              <span class="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
              <span class="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
