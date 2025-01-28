import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useRole from '../../../../hooks/useRole';

const Offer = () => {
    const [role] = useRole()
    const { user } = useAuth();
    const [offerAmount, setOfferAmount] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    // const [property, setProperty] = useState({});
    const { id } = useParams();
    console.log(id);
    const axiosSecure = useAxiosSecure();

    const { data: property = [] } = useQuery({
        queryKey: ['property', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/property/${id}`);
            console.log(data);
            return data;
        }

    });
    console.log(property)


    const handleSubmit = async e => {
        e.preventDefault();
        // const form = e.target;
        const minPrice = property?.minPrice;
        const maxPrice = property?.maxPrice;

        if (offerAmount < minPrice || offerAmount > maxPrice) {
            setErrorMessage(`Offer must be between $${minPrice} and $${maxPrice}.`);
            return;
        }

        const offerDetails = {
            propertyId: property._id,
            propertyImage:property?.image,
            location:property?.location,
            buyerEmail: user?.email,
            buyerName: user?.displayName,
            agent: property?.agent?.name,
            offerAmount,
            buyingDate: startDate,
            status: 'pending',

        };

        try {
            const { data } = await axiosSecure.post('/offer', offerDetails);
            console.log(data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Property Added Successfully!!!",
                showConfirmButton: false,
                timer: 2000
            });
            navigate(`/dashboard/property-bought`);
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
        <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg">
                {/* Property Title */}
                <div className="space-y-1 text-sm">
                    <label className="block text-gray-600">Property Title</label>
                    <input
                        className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-100"
                        // value={property.title}
                        defaultValue={property?.title}
                        name='title'
                        readOnly
                    />
                </div>

                {/* Property Location */}
                <div className="space-y-1 text-sm">
                    <label className="block text-gray-600">Property Location</label>
                    <input
                        className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-100"
                        value={property?.location}
                        name='location'
                        readOnly
                    />
                </div>

                {/* Agent Name */}
                <div className="space-y-1 text-sm">
                    <label className="block text-gray-600">Agent Name</label>
                    <input
                        className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-100"
                        defaultValue={property?.agent?.name}
                        name='agentName'
                        readOnly
                    />
                </div>

                {/* Offer Amount */}
                <div className="space-y-1 text-sm">
                    <label className="block text-gray-600">Offer Amount</label>
                    <input
                        className="w-full px-4 py-3 text-gray-800 border border-pink-300 focus:outline-pink-500 rounded-md bg-white"
                        type="number"
                        value={offerAmount}
                        name="offerAmount"
                        onChange={(e) => setOfferAmount(e.target.value)}
                        placeholder={`Enter an amount between $${property?.minPrice} and $${property?.maxPrice}`}
                        required
                    />
                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                </div>

                {/* Buyer Email */}
                <div className="space-y-1 text-sm">
                    <label className="block text-gray-600">Buyer Email</label>
                    <input
                        className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-100"
                        defaultValue={property?.
                            buyerEmail}
                        name='email'
                        readOnly
                    />
                </div>

                {/* Buyer Name */}
                <div className="space-y-1 text-sm">
                    <label className="block text-gray-600">Buyer Name</label>
                    <input
                        className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-100"
                        defaultValue={user?.displayName}
                        name='name'
                        readOnly
                    />
                </div>

                {/* Buying Date */}
                <div className="space-y-1 text-sm">
                    <label className="block text-gray-600">Buying Date</label>
                    <DatePicker
                        className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-100"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                    />
                </div>

                {/* Offer Button */}
                <button
                    type="submit"
                    className="w-full p-3 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500 hover:bg-rose-600"
                >
                    Submit Offer
                </button>
            </form>
        </div>
    );
};

export default Offer;