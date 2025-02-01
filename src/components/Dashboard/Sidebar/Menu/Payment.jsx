import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../Shared/LoadingSpinner';
import useAuth from '../../../../hooks/useAuth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);

const Payment = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: offer = [], isLoading, refetch } = useQuery({
        queryKey: ['offer'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/offer/${user?.email}`);
            console.log(data);
            return data;
        }
    });
    console.log(offer);
    if (isLoading) return <LoadingSpinner />;

    return (
        <>
            <Helmet>
                <title>💳 Payment Page</title>
            </Helmet>
            <div className="container mx-auto my-12 px-4">
                {/* Header Section */}
                <h1 className="text-5xl font-extrabold text-center mb-10  bg-clip-text  animate-pulse">
                    Payment for the Property 🏡
                </h1>

                {/* Property Details Section */}
                <div className="flex flex-col md:flex-row items-center bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-102">
                    <img
                        src={offer?.propertyImage}
                        alt={offer?.title}
                        className="w-full md:w-1/3 h-80 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                    />
                    <div className="p-8 md:w-2/3">
                        <p className="text-gray-700 mb-4 text-lg">
                            <span className="font-semibold">📍Location : </span> {offer?.location}
                        </p>
                        <p className="text-gray-700 mb-4 text-lg">
                            <span className="font-semibold">👤 Agent Name : </span> {offer?.agent}
                        </p>
                        <p className="text-gray-700 mb-4 text-lg">
                            <span className="font-semibold">💰 Offered Amount : </span> ${offer?.offerAmount}
                        </p>
                        <p className="text-gray-700 mb-4 text-lg">
                            <span className="font-semibold">📝</span> {offer?.status}
                        </p>
                    </div>
                </div>

                {/* Payment Details Section */}
                <div className="mt-8 p-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-101">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        Payment Details <span>💳</span>
                    </h3>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm offer={offer} />
                    </Elements>
                </div>
            </div>
        </>
    );
};

export default Payment;