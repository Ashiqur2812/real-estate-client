import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";

const ManageProperties = () => {
    const axiosSecure = useAxiosSecure();

    const { data: properties = [], isLoading, refetch } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const { data } = await axiosSecure('/properties/pending');
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    const verifyProperty = async (id) => {
        try {
            await axiosSecure.patch(`/verify-property/${id}`);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Property Has Been Verified Successfully!",
                showConfirmButton: false,
                timer: 3000
            });
            refetch();
        } catch (error) {
            Swal.fire({
                title: `Error: ${error?.message}`,
                icon: "error",
                draggable: true
            });
        }
    };

    const rejectProperty = async (id) => {
        try {
            await axiosSecure.patch(`/reject-property/${id}`);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Property Has Been Rejected Successfully!",
                showConfirmButton: false,
                timer: 3000
            });
            refetch();
        } catch (error) {
            Swal.fire({
                title: `Error: ${error?.message}`,
                icon: "error",
                draggable: true
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8"
        >
            <Helmet>
                <title>🏘️ Property Kingdom</title>
            </Helmet>

            <div className="max-w-7xl mx-auto">
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="text-4xl sm:text-6xl font-bold text-center mb-12 bg-clip-text"
                >
                    🏡 Property Palace Management
                </motion.h1>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                >
                    {properties.map((property) => (
                        <motion.div
                            key={property._id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="relative bg-white rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 border-4 border-teal-100"
                        >
                            {/* Status Ribbon */}
                            {property.status !== "pending" && (
                                <div className={`absolute -top-4 -right-4 px-6 py-2 rotate-45 shadow-lg 
                                    ${property.status === "verified" ? "bg-emerald-500 text-white" : "bg-pink-500 text-white"}`}
                                >
                                    {property.status === "verified" ? "✅ Verified" : "❌ Rejected"}
                                </div>
                            )}

                            {/* Property Card Content */}
                            <div className="space-y-4">
                                {/* Property Image */}
                                <div className="h-48 bg-teal-100 rounded-xl flex items-center justify-center text-6xl overflow-hidden">
                                    {property?.image ? (
                                        <img
                                            className='w-full h-full object-cover rounded-xl transition-all duration-300 ease-in-out hover:scale-110'
                                            src={property.image}
                                            alt="Property"
                                        />
                                    ) : (
                                        <span>🏡</span>
                                    )}
                                </div>

                                <h2 className="text-2xl font-bold text-gray-800 mt-4">
                                    {property.title}
                                </h2>

                                <div className="space-y-2 text-gray-600">
                                    <p className="flex items-center gap-2">
                                        📍 {property.location}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        👤 {property.agent?.name || "No Agent"}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        ✉️ {property.agent?.email || "-"}
                                    </p>
                                    <p className="text-xl font-bold text-teal-600">
                                        💰 ${property.minPrice} - ${property.maxPrice}
                                    </p>
                                </div>

                                {/* Action Area */}
                                <div className="mt-6 space-y-3">
                                    {property.status === "pending" ? (
                                        <div className="flex flex-col gap-3">
                                            <motion.button
                                                onClick={() => verifyProperty(property._id)}
                                                className="w-full py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all duration-300 ease-in-out"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                🎉 Approve Property
                                            </motion.button>
                                            <motion.button
                                                onClick={() => rejectProperty(property._id)}
                                                className="w-full py-3 bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all duration-300 ease-in-out"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                🚫 Reject Listing
                                            </motion.button>
                                        </div>
                                    ) : (
                                        <div className={`text-center py-3 rounded-xl 
                                            ${property.status === "verified" ? "bg-emerald-100 text-emerald-700" : "bg-pink-100 text-pink-700"}`}
                                        >
                                            <p className="font-bold text-lg">
                                                {property.status === "verified"
                                                    ? "✨ Approved & Verified"
                                                    : "⛔ Listing Rejected"}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {properties.length === 0 && (
                    <motion.div
                        className="text-center py-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="text-8xl mb-4">🏚️</div>
                        <h2 className="text-2xl font-bold text-gray-700">
                            No properties in the kingdom yet!
                        </h2>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default ManageProperties;
