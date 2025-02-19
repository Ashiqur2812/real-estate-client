import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const testimonials = [
    {
        id: 1,
        name: "John Doe",
        role: "Home Buyer",
        quote: "DreamWell helped me find my dream home in just a few weeks! The process was seamless and stress-free. Highly recommend!",
        image: "https://randomuser.me/api/portraits/women/45.jpg", // Replace with actual image URL
    },
    {
        id: 2,
        name: "Jane Smith",
        role: "Property Seller",
        quote: "Selling my property with DreamWell was a breeze. Their team is professional, responsive, and truly cares about their clients.",
        image: "https://randomuser.me/api/portraits/men/46.jpg", // Replace with actual image URL
    },
    {
        id: 3,
        name: "Michael Johnson",
        role: "Real Estate Agent",
        quote: "Partnering with DreamWell has been a game-changer for my business. Their tools and support are top-notch!",
        image: "https://randomuser.me/api/portraits/women/47.jpg", // Replace with actual image URL
    },
];

const ClientSuccessStories = () => {
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
                    Client Success Stories 🌟
                </motion.h2>
                <motion.p
                    className="text-lg text-gray-600 text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Hear from our happy clients and see how we’ve made their dreams come true! 🏡
                </motion.p>
                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            className="bg-white p-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden group"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.1, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.10, color: "#000000" }}
                        >
                            {/* Gradient Overlay on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-300 to-rose-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {/* Testimonial Content */}
                            <div className="relative z-10">
                                {/* Image */}
                                <motion.img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white group-hover:border-teal-500 transition-all duration-300"
                                    whileHover={{ scale: 1.1 }}
                                />
                                {/* Quote */}
                                <FaQuoteLeft className="text-2xl text-gray-400 mb-4 mx-auto group-hover:text-[#313131] transition-all duration-300" />
                                <p className="text-gray-600 mb-4 group-hover:text-[#313131] transition-all duration-300">
                                    {testimonial.quote}
                                </p>
                                <FaQuoteRight className="text-2xl text-gray-400 mb-4 mx-auto group-hover:text-[#313131] transition-all duration-300" />
                                {/* Name and Role */}
                                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#313131] transition-all duration-300">
                                    {testimonial.name}
                                </h3>
                                <p className="text-gray-500 group-hover:text-[#000000] transition-all duration-300">
                                    {testimonial.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientSuccessStories;