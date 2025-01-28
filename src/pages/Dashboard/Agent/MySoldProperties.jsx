import React from 'react';
import Container from '../../../components/Shared/Container';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const MySoldProperties = () => {
    const axiosSecure = useAxiosSecure();

    const { data: soldProperties = [], isLoading, refetch } = useQuery({
        queryKey: ['soldProperty'],
        queryFn: async () => {
            const { data } = await axiosSecure('/properties/sold');
            console.log(data);
            return data;
        }
    });

    console.log(soldProperties);
    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="my-12">
            <Helmet>
                <title>Sold Properties</title>
            </Helmet>
            <Container>
                <h2 className="text-4xl font-bold text-center mt-10 text-black">My Sold Properties</h2>

                {/* Table */}
                <div className="overflow-x-auto mt-8">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-3 px-4 border">Property image</th>
                                <th className="py-3 px-4 border">Location</th>
                                <th className="py-3 px-4 border">Buyer Name</th>
                                <th className="py-3 px-4 border">Buyer Email</th>
                                <th className="py-3 px-4 border">Sold Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {soldProperties.length > 0 ? (
                                soldProperties.map((property) => (
                                    <tr key={property._id} className="text-center">
                                        <td className="py-3 px-4 border"> <img className='w-12 h-12 rounded-full object-cover' src={property.
                                            propertyImage} alt="" /> </td>
                                        <td className="py-3 px-4 border">{property.location}</td>
                                        <td className="py-3 px-4 border">{property.buyerName}</td>
                                        <td className="py-3 px-4 border">{property.buyerEmail}</td>
                                        <td className="py-3 px-4 border font-semibold text-green-600">${property.
                                            offerAmount}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-4 text-center text-xl font-bold">No Sold Properties Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    );
};

export default MySoldProperties;