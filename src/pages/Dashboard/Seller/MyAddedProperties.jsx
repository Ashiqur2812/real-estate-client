import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const MyAddedProperties = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: properties = [], isLoading, refetch } = useQuery({
        queryKey: ['properties', user?.email],
        enabled: !loading || !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/my-properties/${user?.email}`);
            console.log(data);
            return data;
        }
    });
    console.log(properties);

    if (isLoading) return <LoadingSpinner />;

    const deleteProperty = async (id) => {
        try {
            const { data } = await axiosSecure.delete(`/my-properties/${id}`);
            Swal.fire({
                title: "Property deleted successfully!!!",
                icon: "success",
                draggable: true
            });
            console.log(data);
            refetch();
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                icon: "error",
                title: `${error.message}`,
                draggable: true
            });
        }
    };

    return (
        <div className="container mx-auto my-12">
            <h1 className="text-3xl font-bold mb-8">My Added Properties</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties?.map((property) => (
                    <div key={property._id} className="border p-4 rounded-lg shadow-lg">
                        <img src={property?.image} alt={property.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                        <h2 className="text-xl font-bold">{property?.title}</h2>
                        <p className="text-gray-600">Location: {property?.location}</p>
                        <p className="text-gray-600">Price Range: ${property.minPrice} - ${property?.maxPrice}</p>
                        <div className="flex items-center mt-4">
                            <img src={property.agent?.image} alt={property.agent?.name} className="w-10 h-10 rounded-full mr-2" />
                            <p>{property.agent?.name}</p>
                        </div>
                        <p className={`mt-2 font-bold ${property.status === 'verified' ? 'text-emerald-500' : property.status === 'rejected' ? 'text-rose-500' : 'text-yellow-500'}`}>
                            Status: {property?.status}
                        </p>
                        <div className="flex justify-between mt-4">
                            {property?.status !== 'rejected' && (
                                <button
                                    onClick={() => navigate(`/dashboard/update-property/${property._id}`)}
                                    className="btn btn-outline"
                                >
                                    Update
                                </button>
                            )}
                            <button
                                onClick={() => deleteProperty(property._id)}
                                className="btn btn-outline btn-neutral"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAddedProperties;
