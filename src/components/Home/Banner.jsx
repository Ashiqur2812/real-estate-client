import React from "react";
import banner from '../../assets/images/1.webp';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div
            className="relative bg-cover bg-fixed bg-center h-[500px] md:h-[600px] lg:h-[700px]"
            style={{ backgroundImage: `url(${banner})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
                >
                    🏡 Find Your Dream Home
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 max-w-2xl font-semibold"
                >
                    Search properties, explore neighborhoods, and make your dream a reality with{" "}
                    <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-bold">
                        DreamWell
                    </span>
                    .
                </motion.p>

                {/* Call-to-Action Button */}
                <Link to='/all-property'>
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
                    >
                        🚀 Explore Properties
                    </motion.button>
                    </Link>
            </div>

            {/* Floating Decorations */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-pink-200 rounded-full blur-xl opacity-30 animate-[float_6s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-200 rounded-full blur-xl opacity-30 animate-[float_6s_ease-in-out_2s_infinite]"></div>
        </div>
    );
};

export default Banner;
