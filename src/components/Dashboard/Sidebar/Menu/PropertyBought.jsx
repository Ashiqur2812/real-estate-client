import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../Shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import useRole from '../../../../hooks/useRole';

const PropertyBought = () => {
    const [role] = useRole();
    const { user } = useAuth();
    const navigate = useNavigate()
    // const { id } = useParams();
    // console.log(id);
    const axiosSecure = useAxiosSecure();

    const { data: properties = [], isLoading, refetch } = useQuery({
        queryKey: ['properties', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/property-order/${user?.email}`);
            // console.log(data);
            return data;
        }
    });
    // console.log(properties);
    if (isLoading) return <LoadingSpinner />;


    const handlePay = () => {
        navigate('/dashboard/payment-section')
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent animate-bounce">
                Properties You've Offered For
            </h1>
            {properties.length === 0 ? (
                <p className="text-center text-2xl text-gray-600">No properties found. 🏡</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property) => (
                        <div
                            key={property._id}
                            className="border-2 border-purple-200 rounded-2xl shadow-2xl p-6 bg-gradient-to-br from-purple-50 to-pink-50 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
                        >
                            {/* Property Image */}
                            <div className="relative overflow-hidden rounded-lg h-52">
                                <img
                                    src={property?.propertyImage}
                                    alt={property.title}
                                    className="w-full h-full object-cover rounded-lg hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                                    <h2 className="text-2xl font-bold text-white">{property.title}</h2>
                                </div>
                            </div>

                            {/* Property Details */}
                            <div className="mt-4 space-y-2">
                                <p className="text-gray-700">
                                    <span className="font-semibold">📍Location: </span> {property.location}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">👤 Agent Name :</span> {property.agent}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">💰 Offer Amount :</span> ${property.offerAmount}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">📝</span> {property.status}
                                </p>
                            </div>

                            {/* Buttons and Status */}
                            {property.status === 'accepted' && (
                                <button
                                    disabled={role === 'admin' || role === 'agent'}
                                    className="mt-4 w-full p-3 bg-gradient-to-r from-purple-500 to-rose-500 text-white rounded-lg font-bold hover:from-purple-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105"
                                    onClick={() => handlePay()}
                                >
                                    Pay Now 💸
                                </button>
                            )}
                            {property.status === 'bought' && (
                                <p className="mt-4 text-center text-green-600 font-bold">
                                    🎉 Transaction ID: {property.transactionId}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PropertyBought;
