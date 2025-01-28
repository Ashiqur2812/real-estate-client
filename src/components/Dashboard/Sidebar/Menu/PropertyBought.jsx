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
            console.log(data);
            return data;
        }
    });
    console.log(properties);
    if (isLoading) return <LoadingSpinner />;


    const handlePay = () => {
        // Navigate to the payment page with propertyId and amount as query params
        // navigate(`/payment?propertyId=${propertyId}&amount=${amount}`);
        navigate('/dashboard/payment-section')
    };


    return (
        <div className="container  mx-auto p-4">
            <h1 className="text-3xl text-[#313131] font-bold mb-4">Properties You've Offered For</h1>
            {properties.length === 0 ? (
                <p>No properties found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 h-96">
                    {properties.map((property) => (
                        <div
                            key={property._id}
                            className="border rounded-lg shadow p-4 bg-white"
                        >
                            <img
                                src={property?.propertyImage}
                                alt={property.title}
                                className="w-full h-52 object-cover rounded-lg"
                            />
                            <h2 className="text-xl font-semibold mt-2">
                                {property.title}
                            </h2>
                            <p className="text-gray-600">Location: {property.location}</p>
                            <p className="text-gray-600">Agent Name: {property.agent}</p>
                            <p className="text-gray-600">Offered Amount: ${property.offerAmount}</p>
                            <p className="text-gray-600">Status: {property.status}</p>
                            {property.status === 'accepted' && (
                                <button disabled={role === 'admin' || role === 'agent'}
                                    className="mt-2 w-full p-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                                    onClick={() => handlePay()}
                                >
                                    Pay
                                </button>
                            )}
                            {property.status === 'bought' && (
                                <p className="text-green-600 mt-2">
                                    Transaction ID: {property.transactionId}
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
