import React, { useEffect, useRef } from "react";
import { Viewer } from "photo-sphere-viewer";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";
import photo from "../../assets/images/AdobeStock_233536756_Preview.jpeg";
import { motion } from "framer-motion";

const VirtualTour = () => {
    const viewerRef = useRef(null);
    const viewerInstance = useRef(null);

    useEffect(() => {
        if (!viewerRef.current) return;

        // Initialize the 360° viewer
        viewerInstance.current = new Viewer({
            container: viewerRef.current,
            panorama: `${photo}`,
            navbar: ["zoom", "move", "fullscreen"],
            loadingTxt: "Loading your virtual adventure... 🌍",
            size: { width: "100%", height: "450px" },
        });

        console.log("Viewer initialized:", viewerInstance.current);

        // Cleanup on unmount
        return () => {
            if (viewerInstance.current) {
                viewerInstance.current.destroy();
            }
        };
    }, []);

    return (
        <motion.section
            className="lg:mt-40 py-12 bg-gradient-to-r from-teal-50 to-sky-50"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            <div className="lg:max-w-[1415px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Animated Heading */}
                <motion.h2
                    className="text-4xl font-bold text-teal-700 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Explore Our Virtual Property Tour 🏡
                </motion.h2>
                {/* Playful Subtitle */}
                <motion.p
                    className="text-lg text-gray-600 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    Step inside your dream home without leaving your couch! 🛋️✨
                </motion.p>
                {/* 360° Viewer with Hover Effect */}
                <motion.div
                    className="rounded-lg shadow-2xl overflow-hidden hover:shadow-teal-500/50 transition-shadow duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div
                        ref={viewerRef}
                        className="h-[400px] w-full bg-gray-300"
                    ></div>
                </motion.div>
                {/* Fun Call-to-Action */}
                <motion.p
                    className="mt-8 text-lg text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    Ready to move in? Let's make it happen! 🎉
                </motion.p>
            </div>
        </motion.section>
    );
};

export default VirtualTour;