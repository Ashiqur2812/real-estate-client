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
                <title>Payment Page</title>
            </Helmet>
            <div className="container mx-auto my-12 px-4">
                <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Payment for the Property</h1>
                <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                        src={offer?.propertyImage}
                        alt={offer?.title}
                        className="w-full md:w-1/3 h-80 object-cover"
                    />
                    <div className="p-6 md:w-2/3">
                        {/* <h2 className="text-2xl font-bold text-gray-800 mb-2">{offer?.title}</h2> */}
                        <p className="text-gray-600 mb-4">Location: {offer?.location}</p>
                        <p className="text-gray-600 mb-4">Agent: {offer?.agent}</p>
                        <p className="text-gray-600 mb-4">Offered Amount: ${offer?.offerAmount}</p>
                        <p className="text-gray-600 mb-4">Status: {offer?.status}</p>
                    </div>
                </div>
                <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Details</h3>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm offer={offer} />
                    </Elements>
                </div>
            </div>
        </>
    );
};

export default Payment;