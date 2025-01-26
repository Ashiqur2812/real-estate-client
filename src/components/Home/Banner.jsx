import React from "react";
import banner from '../../assets/images/1.webp'

const Banner = () => {
    return (
        <div
            className="relative bg-cover bg-fixed bg-center h-[500px] md:h-[600px] lg:h-[600px]"
            style={{ backgroundImage: `url(${banner})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-opacity-50"></div>
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    Find Your Dream Home
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 max-w-2xl font-semibold">
                    Search properties, explore neighborhoods, and make your dream a reality with DreamWell.
                </p>
            </div>
        </div>
    );
};

export default Banner;
