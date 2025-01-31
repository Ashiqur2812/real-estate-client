import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const ManageProperties = () => {
    const axiosSecure = useAxiosSecure();

    const { data: properties = [], isLoading, refetch } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const { data } = await axiosSecure('/properties/pending');
            // console.log(data);
            return data;
        }
    });
    // console.log(properties);
    if (isLoading) return <LoadingSpinner />;

    const verifyProperty = async (id) => {
        try {
            const res = await axiosSecure.patch(`/verify-property/${id}`);
            // console.log(res.data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Property Has Been Verified Successfully!!!",
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

    const rejectProperty = async id => {
        try {
            const response = await axiosSecure.patch(`/reject-property/${id}`);
            // console.log(response.data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Property Has Been Rejected Successfully!!!",
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
        <div>
            <Helmet>
                <title>Manage Properties</title>
            </Helmet>
            <div className="container mx-auto my-12">
                <h1 className="text-3xl text-[#313131] font-bold mb-8">Manage Properties</h1>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border text-[#313131] border-gray-400 px-4 py-2">Title</th>
                                <th className="border text-[#313131] border-gray-400 px-4 py-2">Location</th>
                                <th className="border text-[#313131] border-gray-400 px-4 py-2">Agent Name</th>
                                <th className="border text-[#313131] border-gray-400 px-4 py-2">Agent Email</th>
                                <th className="border text-[#313131] border-gray-400 px-4 py-2">Price Range</th>
                                <th className="border text-[#313131] border-gray-400 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map((property) => (
                                <tr key={property._id} className="text-center">
                                    <td className="border text-[#313131] border-gray-400 px-4 py-2">{property.title}</td>
                                    <td className="border text-[#313131] border-gray-400 px-4 py-2">{property.location}</td>
                                    <td className="border text-[#313131] border-gray-400 px-4 py-2">{property.agent?.name}</td>
                                    <td className="border text-[#313131] border-gray-400 px-4 py-2">{property.agent?.email}</td>
                                    <td className="border text-[#313131] border-gray-400 px-4 py-2">${property.minPrice} - ${property.maxPrice}</td>
                                    <td className="border text-[#313131] border-gray-400 px-4 py-2">
                                        {property.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={() => verifyProperty(property._id)}
                                                    className="btn btn-sm btn-success mr-2"
                                                >
                                                    Verify
                                                </button>
                                                <button
                                                    onClick={() => rejectProperty(property._id)}
                                                    className="btn btn-sm btn-error"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {property.status === "verified" && (
                                            <p className="text-emerald-500 font-bold">Verified</p>
                                        )}
                                        {property.status === "rejected" && (
                                            <p className="text-pink-500 font-bold">Rejected</p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageProperties;