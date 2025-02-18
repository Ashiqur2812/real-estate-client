import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import Swal from 'sweetalert2';
import {motion} from 'framer-motion';

const OfferedProperties = () => {
    const axiosSecure = useAxiosSecure();

    const { data: offers = [], isLoading, refetch } = useQuery({
        queryKey: ['offers'],
        queryFn: async () => {
            const { data } = await axiosSecure('/offers');
            // console.log(data);
            return data;
        }
    });
    // console.log(offers);
    if (isLoading) return <LoadingSpinner />;

    const acceptOffer = async (offerId, propertyId) => {
        try {
            const res = await axiosSecure.patch(`/accept-offer/${offerId}`, { propertyId });
            // console.log(res.data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Offer Accepted Successfully!!!",
                showConfirmButton: false,
                timer: 3000
            });
            refetch();
        } catch (error) {
            // console.log(error);
            Swal.fire({
                title: `${error?.message}`,
                icon: "error",
                draggable: true
            });
        }
    };

    const rejectOffer = async (id) => {
        try {
            const response = await axiosSecure.patch(`/reject-offer/${id}`);
            // console.log(response.data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Offer Rejected Successfully!!!",
                showConfirmButton: false,
                timer: 3000
            });
            refetch();
        } catch (error) {
            // console.log(error);
            Swal.fire({
                title: `${error?.message}`,
                icon: "error",
                draggable: true
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 md:px-8">
            <Helmet>
                <title>💰 Offered Properties </title>
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
                        🏆 Offered Properties
                    </h1>
                    <p className="text-xl text-gray-600 mt-4 animate-bounce">
                        Your Real Estate Opportunities Await! 🌟
                    </p>
                </motion.div>

                {/* Table Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="overflow-x-auto"
                >
                    <div className="inline-block min-w-full shadow-2xl rounded-lg overflow-hidden bg-white/90  transform transition-transform duration-300 hover:scale-[99%]">
                        <table className="min-w-full leading-normal">
                            {/* Table Header */}
                            <thead>
                                <tr className="bg-sky-100 text-[#313131]">
                                    <th className="px-5 py-4 text-center text-sm font-semibold uppercase">
                                        🖼️ Property Image
                                    </th>
                                    <th className="px-5 py-4 text-center text-sm font-semibold uppercase">
                                        📍 Location
                                    </th>
                                    <th className="px-5 py-4 text-center text-sm font-semibold uppercase">
                                        👤 Buyer Name
                                    </th>
                                    <th className="px-5 py-4 text-center text-sm font-semibold uppercase">
                                        📧 Buyer Email
                                    </th>
                                    <th className="px-5 py-4 text-center text-sm font-semibold uppercase">
                                        💸 Offered Price
                                    </th>
                                    <th className="px-5 py-4 text-center text-sm font-semibold uppercase">
                                        📊 Status
                                    </th>
                                    <th className="px-5 py-4 text-center text-sm font-semibold uppercase">
                                        🛠️ Action
                                    </th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {offers.length > 0 ? (
                                    offers.map((offer, index) => (
                                        <motion.tr
                                            key={offer._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1, duration: 0.5 }}
                                            className="hover:bg-purple-50 transition-colors duration-200"
                                        >
                                            <td className="px-5 py-4 border-b border-gray-200 text-sm">
                                                <div className="flex justify-center">
                                                    <img
                                                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-200 transform transition-transform duration-300 hover:scale-110"
                                                        src={offer.propertyImage}
                                                        alt="Property"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 border-b border-gray-200 text-sm font-semibold text-gray-800">
                                                {offer.location}
                                            </td>
                                            <td className="px-5 py-4 border-b border-gray-200 text-sm font-semibold text-gray-800">
                                                {offer.buyerName}
                                            </td>
                                            <td className="px-5 py-4 border-b border-gray-200 text-sm font-semibold text-gray-800">
                                                {offer.buyerEmail}
                                            </td>
                                            <td className="px-5 py-4 border-b border-gray-200 text-sm font-semibold text-gray-800">
                                                💵 ${offer.offerAmount}
                                            </td>
                                            <td className="px-5 py-4 border-b border-gray-200 text-sm font-semibold text-center">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${offer.status === "pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : offer.status === "accepted"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {offer.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 border-b border-gray-200 text-sm font-semibold text-center">
                                                {offer.status === "pending" && (
                                                    <div >
                                                        {/* Accept Button */}
                                                        <button
                                                            onClick={() => acceptOffer(offer._id, offer.propertyId)}
                                                            className="relative overflow-hidden px-6 py-2 text-white font-semibold rounded-lg shadow-lg bg-gradient-to-r from-emerald-400 to-green-500 hover:from-green-500 hover:to-emerald-400 transition-all duration-300 transform hover:scale-105 group"
                                                        >
                                                            <span className="relative z-10 flex items-center gap-2">
                                                                <svg
                                                                    className="w-5 h-5"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M5 13l4 4L19 7"
                                                                    ></path>
                                                                </svg>
                                                                Accept
                                                            </span>
                                                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                        </button>

                                                        {/* Reject Button */}
                                                        <button
                                                            onClick={() => rejectOffer(offer._id)}
                                                            className="relative overflow-hidden px-6 py-2 text-white font-semibold rounded-lg shadow-lg bg-gradient-to-r from-rose-400 to-red-500 hover:from-red-500 hover:to-rose-400 transition-all duration-300 transform hover:scale-105 group mt-5"
                                                        >
                                                            <span className="relative z-10 flex items-center gap-2">
                                                                <svg
                                                                    className="w-5 h-5"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M6 18L18 6M6 6l12 12"
                                                                    ></path>
                                                                </svg>
                                                                Reject
                                                            </span>
                                                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <td colSpan="7" className="py-8 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-4">
                                                <span className="text-6xl animate-bounce">🏜️</span>
                                                <p className="text-xl font-bold text-gray-600">
                                                    No Offers Yet!
                                                </p>
                                                <p className="text-gray-500">
                                                    Start listing properties to see offers here! 🚀
                                                </p>
                                            </div>
                                        </td>
                                    </motion.tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Floating Decorations */}
                {/* <div className="absolute top-0 left-0 w-24 h-24 bg-purple-200 rounded-full blur-xl opacity-30 animate-[float_6s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-200 rounded-full blur-xl opacity-30 animate-[float_6s_ease-in-out_2s_infinite]"></div> */}
            </motion.div>
        </div>
    );
};

export default OfferedProperties;