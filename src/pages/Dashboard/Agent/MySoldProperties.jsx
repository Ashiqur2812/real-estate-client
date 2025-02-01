import React from 'react';
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';

const MySoldProperties = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: soldProperties = [], isLoading, refetch } = useQuery({
        queryKey: ['soldProperty'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/properties/sold/${user?.email}`);
            // console.log(data);
            return data;
        }
    });

    // console.log(soldProperties);
    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="my-12 px-4">
            <Helmet>
                <title>💰 Sold Properties </title>
            </Helmet>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto"
            >
                {/* Header Section */}
                <motion.div
                    initial={{ y: -50, scale: 0.9 }}
                    animate={{ y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-bold">
                        🏆 Sold Properties
                    </h1>
                    <p className="text-xl text-gray-600 mt-4 animate-bounce">
                        Your Real Estate Success Stories! 🌟
                    </p>
                </motion.div>

                {/* Table Section */}
                <div className="overflow-x-auto mt-8">
                    <motion.table
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        className="min-w-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-gray-200 shadow-2xl rounded-lg overflow-hidden"
                    >
                        <thead>
                            <tr className="bg-cyan-100 text-[#313131]">
                                <th className="py-4 px-6 text-left text-sm font-bold uppercase">
                                    📍 Location
                                </th>
                                <th className="py-4 px-6 text-left text-sm font-bold uppercase">
                                    👤 Buyer Name
                                </th>
                                <th className="py-4 px-6 text-left text-sm font-bold uppercase">
                                    📧 Buyer Email
                                </th>
                                <th className="py-4 px-6 text-left text-sm font-bold uppercase">
                                    💸 Sold Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {soldProperties.length > 0 ? (
                                soldProperties.map((property) => (
                                    <motion.tr
                                        key={property._id}
                                        className="text-left bg-white hover:bg-indigo-50 transition-colors duration-200"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <td className="py-4 px-6 border text-gray-800 font-semibold">{property.location}</td>
                                        <td className="py-4 px-6 border text-gray-900 font-semibold">{property.buyerName}</td>
                                        <td className="py-4 px-6 border text-gray-900 font-semibold">{property.buyerEmail}</td>
                                        <td className="py-4 px-6 border text-gray-900 font-bold ">${property.soldPrice}</td>
                                    </motion.tr>
                                ))
                            ) : (
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <td colSpan="4" className="py-6 text-center text-xl font-bold text-gray-600">
                                        No Sold Properties Found
                                    </td>
                                </motion.tr>
                            )}
                        </tbody>
                    </motion.table>
                </div>
            </motion.div>
        </div>
    );
};

export default MySoldProperties;