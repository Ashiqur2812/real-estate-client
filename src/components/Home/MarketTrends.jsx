import React from "react";
import { motion } from "framer-motion";
import { Line, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const marketData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
        {
            label: "Average Home Price ($)",
            data: [300000, 310000, 320000, 315000, 330000, 340000, 350000],
            borderColor: "#0ea5e9",
            backgroundColor: "rgba(14, 165, 233, 0.2)",
            tension: 0.4,
        },
    ],
};

const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
        {
            label: "Properties Sold",
            data: [120, 150, 180, 200, 220, 250, 300],
            backgroundColor: "#10b981",
            borderColor: "#10b981",
            borderWidth: 1,
        },
    ],
};

const MarketTrends = () => {
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
                    Latest Market Trends & Insights 📈
                </motion.h2>
                <motion.p
                    className="text-lg text-gray-600 text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Stay ahead with real-time data and insights on the real estate market. 🏡
                </motion.p>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Line Chart - Average Home Prices */}
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                            Average Home Prices 🏠
                        </h3>
                        <Line
                            data={marketData}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: "top" },
                                    title: { display: false },
                                },
                            }}
                        />
                    </motion.div>

                    {/* Bar Chart - Properties Sold */}
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                            Properties Sold 🏘️
                        </h3>
                        <Bar
                            data={salesData}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: "top" },
                                    title: { display: false },
                                },
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MarketTrends;