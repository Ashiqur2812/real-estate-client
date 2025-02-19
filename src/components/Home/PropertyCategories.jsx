import React from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaHome, FaCity, FaWarehouse } from "react-icons/fa";

const categories = [
    {
        id: 1,
        title: "Luxury Villas",
        icon: <FaHome />,
        description: "Exclusive and spacious villas with stunning views. 🌅",
        baseColor: "bg-white",
        hoverColor: "bg-gradient-to-r from-teal-300 to-green-300",
        textBaseColor: "text-gray-800",
        textHoverColor: "text-teal-100",
    },
    {
        id: 2,
        title: "Modern Apartments",
        icon: <FaBuilding />,
        description: "Stylish apartments in prime city locations. 🏙️",
        baseColor: "bg-white",
        hoverColor: "bg-gradient-to-r from-teal-300 to-green-300",
        textBaseColor: "text-gray-800",
        textHoverColor: "text-blue-100",
    },
    {
        id: 3,
        title: "Commercial Spaces",
        icon: <FaCity />,
        description: "High-end office spaces in business districts. 💼",
        baseColor: "bg-white",
        hoverColor: "bg-gradient-to-r from-teal-300 to-green-300",
        textBaseColor: "text-gray-800",
        textHoverColor: "text-purple-100",
    },
    {
        id: 4,
        title: "Warehouse & Storage",
        icon: <FaWarehouse />,
        description: "Spacious warehouses for industrial needs. 🏭",
        baseColor: "bg-white",
        hoverColor: "bg-gradient-to-r from-teal-300 to-green-300",
        textBaseColor: "text-gray-800",
        textHoverColor: "text-amber-100",
    },
];

const PropertyCategories = () => {
    return (
        <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Title */}
                <motion.h2
                    className="text-4xl font-extrabold text-gray-800 text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    Explore Property Categories 🏡
                </motion.h2>
                <motion.p
                    className="text-lg text-gray-600 text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Choose from a variety of exclusive properties tailored to your needs. 🏘️
                </motion.p>

                {/* Property Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            className={`p-6 rounded-lg shadow-lg transition-all duration-300 flex flex-col items-center text-center border-2 border-gray-200 
                            ${category.baseColor} group`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            {/* Animated Background Change on Hover */}
                            <div
                                className={`absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                                ${category.hoverColor} rounded-lg`}
                            ></div>

                            {/* Animated Icon */}
                            <motion.div
                                className={`text-5xl relative z-10 ${category.textBaseColor} 
                                group-hover:${category.textHoverColor} transition-colors duration-300`}
                                whileHover={{ rotate: 360, transition: { duration: 1 } }}
                            >
                                {category.icon}
                            </motion.div>

                            {/* Title */}
                            <h3
                                className={`text-2xl font-semibold mt-4 relative z-10 
                                ${category.textBaseColor} group-hover:${category.textHoverColor} transition-colors duration-300`}
                            >
                                {category.title}
                            </h3>

                            {/* Description */}
                            <p
                                className={`text-gray-600 relative z-10 
                                group-hover:${category.textHoverColor} transition-colors duration-300`}
                            >
                                {category.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PropertyCategories;
