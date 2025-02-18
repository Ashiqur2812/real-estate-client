import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaUsers, FaBuilding, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const WhyChooseUs = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/signup');
    };

    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-teal-50 via-white to-teal-50">
            <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Heading */}
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Why Choose <span className="text-teal-600">DreamWell?</span> 🏡
                </motion.h2>
                <motion.p
                    className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    We provide a seamless, secure, and professional real estate experience like no other! 🚀
                </motion.p>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Stat 1 */}
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-teal-400/50 transition duration-300"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <FaUsers className="text-teal-600 text-5xl mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-800">10K+</h3>
                        <p className="text-gray-600">Happy Clients</p>
                    </motion.div>

                    {/* Stat 2 */}
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-teal-400/50 transition duration-300"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <FaBuilding className="text-teal-600 text-5xl mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-800">5K+</h3>
                        <p className="text-gray-600">Properties Sold</p>
                    </motion.div>

                    {/* Stat 3 */}
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-teal-400/50 transition duration-300"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        viewport={{ once: true }}
                    >
                        <FaStar className="text-teal-600 text-5xl mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-800">4.9/5</h3>
                        <p className="text-gray-600">Average Rating</p>
                    </motion.div>

                    {/* Stat 4 */}
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-teal-400/50 transition duration-300"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        viewport={{ once: true }}
                    >
                        <FaCheckCircle className="text-teal-600 text-5xl mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-800">100%</h3>
                        <p className="text-gray-600">Satisfaction Guarantee</p>
                    </motion.div>
                </div>

                {/* Comparison Table */}
                <motion.div
                    className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto mb-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                        How We Compare 🏆
                    </h3>
                    <table className="w-full border-collapse border border-gray-300 text-gray-700">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-4">Feature</th>
                                <th className="border border-gray-300 p-4">DreamWell</th>
                                <th className="border border-gray-300 p-4">Others</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-4">Verified Properties</td>
                                <td className="border border-gray-300 p-4 text-teal-600 font-semibold">✅</td>
                                <td className="border border-gray-300 p-4 text-red-600">❌</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border border-gray-300 p-4">24/7 Support</td>
                                <td className="border border-gray-300 p-4 text-teal-600 font-semibold">✅</td>
                                <td className="border border-gray-300 p-4 text-red-600">❌</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-4">Virtual Tours</td>
                                <td className="border border-gray-300 p-4 text-teal-600 font-semibold">✅</td>
                                <td className="border border-gray-300 p-4 text-red-600">❌</td>
                            </tr>
                        </tbody>
                    </table>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    onClick={handleRedirect}
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                    viewport={{ once: true }}
                >
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-teal-600 text-white px-6 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300"
                    >
                           Get Started Today! 🚀 🏠✨
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;