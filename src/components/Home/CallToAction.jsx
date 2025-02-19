import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
    const navigate = useNavigate();

    const handleRender = () => {
        navigate('/all-property');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <section className="py-16 bg-gradient-to-br from-teal-50 to-sky-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                {/* Section Title */}
                <motion.h2
                    className="text-4xl font-extrabold [#313131] mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    Ready to Make Your Move? 🚀
                </motion.h2>
                <motion.p
                    className="text-lg text-[#313131] mb-8 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Whether you're buying, selling, or just exploring, we're here to help you every step of the way. Let's get started today!
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    {/* Sign Up Button */}
                    <motion.button
                        onClick={handleSignUp}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-transparent border-2 border-white text-teal-600 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
                    >
                        Sign Up Now ✨
                    </motion.button>

                    {/* List Property Button */}
                    <motion.button
                        onClick={handleRender}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-transparent border-2 border-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-white text-teal-600 transition-all duration-300"
                    >
                        List Your Property 🏠
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default CallToAction;