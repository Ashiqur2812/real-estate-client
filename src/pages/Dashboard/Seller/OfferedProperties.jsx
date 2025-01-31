import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import Swal from 'sweetalert2';

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
        <>
            <Helmet>
                <title>Offered Properties</title>
            </Helmet>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Offered Properties
                    </h1>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden bg-white">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-5 py-3 border-b border-gray-300 text-gray-700  text-sm uppercase text-center font-semibold">
                                            Property Image
                                        </th>
                                        <th className="px-5 py-3 border-b border-gray-300 text-gray-700 text-center text-sm uppercase font-semibold">
                                            Location
                                        </th>
                                        <th className="px-5 py-3 border-b border-gray-300 text-gray-700 text-center text-sm uppercase font-semibold">
                                            Buyer Name
                                        </th>
                                        <th className="px-5 py-3 border-b border-gray-300 text-gray-700 text-center text-sm uppercase font-semibold">
                                            Buyer Email
                                        </th>
                                        <th className="px-5 py-3 border-b border-gray-300 text-gray-700 text-center text-sm uppercase font-semibold">
                                            Offered Price
                                        </th>
                                        <th className="px-5 py-3 border-b border-gray-300 text-gray-700 text-center text-sm uppercase font-semibold">
                                            Status
                                        </th>
                                        <th className="px-5 py-3 border-b border-gray-300 text-gray-700 text-center text-sm uppercase font-semibold">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {offers.map((offer) => (
                                        <tr key={offer._id} className="hover:bg-gray-100 transition duration-200">
                                            <td className="px-5 py-5 border-b border-gray-300 text-sm">
                                                <div className="flex justify-center">
                                                    <img
                                                        className="w-12 h-12 rounded-full object-cover border border-gray-300"
                                                        src={offer.propertyImage}
                                                        alt="Property"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-300 text-sm font-semibold text-gray-700 text-center">
                                                {offer.location}
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-300 text-sm font-semibold text-gray-700 text-center">
                                                {offer.buyerName}
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-300 text-sm font-semibold text-gray-700 text-center">
                                                {offer.buyerEmail}
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-300 text-sm font-semibold text-gray-700 text-center">
                                                ${offer.offerAmount}
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-300 text-sm font-semibold text-gray-700 text-center">
                                                {offer.status}
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-300 text-sm font-semibold text-center">
                                                {offer.status === 'pending' && (
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() => acceptOffer(offer._id, offer.propertyId)}
                                                            className="bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-emerald-600 hover:shadow-lg transition duration-300 ease-in-out"
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={() => rejectOffer(offer._id)}
                                                            className="bg-rose-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-rose-600 hover:shadow-lg transition duration-300 ease-in-out"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OfferedProperties;