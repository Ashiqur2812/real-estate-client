import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import { motion } from "framer-motion";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const MyAddedProperties = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: properties = [], isLoading, refetch } = useQuery({
        queryKey: ['properties', user?.email],
        enabled: !loading || !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/my-properties/${user?.email}`);
            // console.log(data);
            return data;
        }
    });
    // console.log(properties);

    if (isLoading) return <LoadingSpinner />;

    const deleteProperty = async (id) => {
        try {
            const { data } = await axiosSecure.delete(`/my-properties/${id}`);
            Swal.fire({
                title: "Property deleted successfully!!!",
                icon: "success",
                draggable: true
            });
            // console.log(data);
            refetch();
        } catch (error) {
            // console.log(error.message);
            Swal.fire({
                icon: "error",
                title: `${error.message}`,
                draggable: true
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
            <Helmet>
                <title>🏡 My Property Portfolio | DreamWell</title>
            </Helmet>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="container mx-auto"
            >
                {/* Animated Header */}
                <div className="text-center mb-16 relative">
                    <motion.h1
                        initial={{ scale: 0.5, rotate: -5 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                        className="text-5xl md:text-6xl font-bold  inline-block"
                    >
                        🏰 My Property Kingdom
                    </motion.h1>
                    <p className="text-xl text-gray-600 mt-4">Your Real Estate Masterpieces 🌟</p>

                    {/* Floating Decorative Elements */}
                    <div className="absolute -top-8 left-1/4 w-24 h-24 bg-purple-200 rounded-full blur-xl opacity-30 animate-float"></div>
                    <div className="absolute top-12 right-1/4 w-32 h-32 bg-blue-200 rounded-full blur-xl opacity-30 animate-float-delayed"></div>
                </div>

                {/* Property Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties?.map((property, index) => (
                        <motion.div
                            key={property._id}
                            initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ delay: index * 0.1, type: 'spring' }}
                            className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
                        >
                            {/* Property Image */}
                            <motion.div
                                className="relative h-64 transition-all duration-300 ease-in-out overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                            >
                                <img
                                    src={property?.image}
                                    alt={property.title}
                                    className="w-full h-full  object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                <span className="absolute top-4 right-4 px-4 py-2 bg-white/90 rounded-full font-bold text-pink-500">
                                    {property.status === 'verified' ? '✅ Verified' :
                                        property.status === 'rejected' ? '❌ Rejected' : '⏳ Pending'}
                                </span>
                            </motion.div>

                            {/* Property Content */}
                            <div className="p-6 space-y-4">
                                {/* Title & Price */}
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 truncate">
                                        {property?.title}
                                    </h2>
                                    <p className="text-xl font-semibold text-purple-600">
                                        💰 ${property?.minPrice} - ${property?.maxPrice}
                                    </p>
                                </div>

                                {/* Location & Agent */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">📍</span>
                                        <p className="text-gray-600">{property?.location}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={property.agent?.image}
                                            alt={property.agent?.name}
                                            className="w-12 h-12 rounded-full border-2 border-purple-200 hover:border-purple-500 transition-colors"
                                        />
                                        <div>
                                            <p className="font-medium">{property.agent?.name}</p>
                                            <p className="text-sm text-gray-500">Your Trusted Agent</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 mt-6">
                                    {property?.status !== 'rejected' && (
                                        <motion.button
                                            onClick={() => navigate(`/dashboard/update-property/${property._id}`)}
                                            className="flex-1 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                                            whileHover={{ rotate: 3 }}
                                        >
                                            ✏️ Update
                                        </motion.button>
                                    )}
                                    <motion.button
                                        onClick={() => deleteProperty(property._id)}
                                        className="flex-1 px-4 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                                        whileHover={{ rotate: -3 }}
                                    >
                                        🗑️ Delete
                                    </motion.button>
                                </div>
                            </div>

                            {/* Hover Effect Border */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-300 transition-all duration-300 pointer-events-none rounded-2xl" />
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {properties?.length === 0 && (
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="text-center py-20"
                    >
                        <div className="text-8xl mb-4">🏜️</div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">
                            No Properties Found!
                        </h3>
                        <p className="text-gray-600">Your real estate empire starts here 🌟</p>
                    </motion.div>
                )}
            </motion.div>

            {/* <style jsx global>{`
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
    @keyframes float-delayed {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-float-delayed {
      animation: float-delayed 6s ease-in-out 2s infinite;
    }
  `}</style> */}
        </div>
    );
};

export default MyAddedProperties;
