import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import Swal from 'sweetalert2';

const UpdateProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    // const [property, setProperty] = useState(null);
    // const [formData, setFormData] = useState({
    //     image: '',
    //     title: '',
    //     location: '',
    //     minPrice: '',
    //     maxPrice: '',
    // });

    const { data: property = [], isLoading, refetch } = useQuery({
        queryKey: ['properties', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/properties/${id}`);
            // console.log(data);
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const location = form.location.value;
        const minPrice = parseFloat(form.minPrice.value);
        const maxPrice = parseFloat(form.maxPrice.value);
        const image = form.image.value;

        const propertyData = { title, location, minPrice, maxPrice, image };

        console.table({ propertyData });

        // await axios.put(`/api/properties/${id}`, formData); // Update property in the database
        try {
            const { data } = await axiosSecure.put(`/update-property/${id}`, propertyData);
            console.log(data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Property Updated Successfully!!!",
                showConfirmButton: false,
                timer: 2000
            });
            navigate('/my-added-properties');
            return data;
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: `${error?.message}`,
                icon: "error",
                draggable: true
            });
        }
    };

    return (
        <div className="container mx-auto my-12 px-4">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
                Update Property
            </h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-6 md:p-10 space-y-6 max-w-3xl mx-auto"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Property Image
                        </label>
                        <input
                            type="text"
                            name="image"
                            defaultValue={property?.image}
                            className="input input-bordered w-full rounded-lg border-gray-300 focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Property Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={property?.title}
                            className="input input-bordered w-full rounded-lg border-gray-300 focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Property Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            defaultValue={property?.location}
                            className="input input-bordered w-full rounded-lg border-gray-300 focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Minimum Price
                        </label>
                        <input
                            type="number"
                            name="minPrice"
                            defaultValue={property?.minPrice}
                            className="input input-bordered w-full rounded-lg border-gray-300 focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Maximum Price
                        </label>
                        <input
                            type="number"
                            name="maxPrice"
                            defaultValue={property?.maxPrice}
                            className="input input-bordered w-full rounded-lg border-gray-300 focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Agent Name
                        </label>
                        <input
                            type="text"
                            defaultValue={property.agent?.name}
                            readOnly
                            className="input input-bordered w-full rounded-lg border-gray-300 bg-gray-100 text-[#313131] cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Agent Email
                        </label>
                        <input
                            type="text"
                            defaultValue={property.agent?.email}
                            readOnly
                            className="input input-bordered w-full rounded-lg border-gray-300 text-[#313131] bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="btn btn-neutral px-6 py-3 text-lg rounded-lg shadow-md hover:bg-rose-700 hover:text-white transition-all duration-300"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>

    );
};

export default UpdateProperty;
