import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useRole from '../../../../hooks/useRole';
import { Helmet } from 'react-helmet-async';

const Offer = () => {
    const [role] = useRole();
    const { user } = useAuth();
    const [offerAmount, setOfferAmount] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    // const [property, setProperty] = useState({});
    const { id } = useParams();
    // console.log(id);
    const axiosSecure = useAxiosSecure();

    const { data: property = [] } = useQuery({
        queryKey: ['property', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/property/${id}`);
            // console.log(data);
            return data;
        }

    });
    // console.log(property);


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
            propertyTitle: property?.title,
            propertyImage: property?.image,
            location: property?.location,
            buyerEmail: user?.email,
            buyerName: user?.displayName,
            agent: property?.agent?.name,
            offerAmount,
            buyingDate: startDate,
            status: 'pending',

        };

        try {
            const { data } = await axiosSecure.post('/offer', offerDetails);
            // console.log(data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Property Added Successfully!!!",
                showConfirmButton: false,
                timer: 2000
            });
            navigate(`/dashboard/property-bought`);
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
        <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center bg-gradient-to-br from-pink-50 to-purple-50 relative overflow-hidden">
            <Helmet>
                <title>✨ Make It Yours! | Offer Form</title>
            </Helmet>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-200 rounded-full blur-xl opacity-30"></div>
            <div className="absolute bottom-0 -right-20 w-72 h-72 bg-pink-200 rounded-full blur-xl opacity-30"></div>

            <form onSubmit={handleSubmit} className="relative space-y-6 w-full max-w-lg p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                {/* Form Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold animate-pulse transition-all duration-300 ease-in-out">
                        🚀 Launch Your Offer!
                    </h1>
                    <p className="text-gray-600 mt-2 ">Let's Make Magic Happen! ✨</p>
                </div>

                {/* Property Card */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 animate-pulse-slow">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🏡</span>
                        <h2 className="text-xl font-bold text-gray-800">{property?.title}</h2>
                    </div>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">📍</span>
                            <span>{property?.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🤵</span>
                            <span>{property?.agent?.name}</span>
                        </div>
                    </div>
                </div>

                {/* Offer Input Section */}
                <div className="space-y-6">
                    {/* Offer Amount */}
                    <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700 flex items-center gap-2">
                            💰 Your Magic Number
                            <span className="text-sm text-gray-500">(Between ${property?.minPrice} - ${property?.maxPrice})</span>
                        </label>
                        <div className="relative group">
                            <input
                                className="w-full px-6 py-4 text-xl border-2 border-purple-200 rounded-xl bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-300 group-hover:scale-[101%]"
                                type="number"
                                value={offerAmount}
                                onChange={(e) => setOfferAmount(e.target.value)}
                                placeholder="Enter your offer amount..."
                                required
                            />
                            {errorMessage && (
                                <div className=" right-4 top-4 animate-pulse">
                                    <span className="text-rose-500 text-2xl">⚠️</span>
                                    <p className="text-rose-500 text-sm font-semibold">{errorMessage}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Buyer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700 flex items-center gap-2">
                                📧 Your Email
                            </label>
                            <input
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50"
                                defaultValue={property?.buyerEmail}
                                readOnly
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700 flex items-center gap-2">
                                🧑💼 Your Name
                            </label>
                            <input
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50"
                                defaultValue={user?.displayName}
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Date Picker */}
                    <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700 flex items-center gap-2">
                            📅 Move-In Date
                        </label>
                        <DatePicker
                            className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl hover:border-pink-400 transition-colors"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            popperClassName="rounded-xl shadow-lg"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-4 text-xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl hover:from-purple-600 hover:to-pink-500 transition-all duration-300 transform hover:scale-[102%] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                    <span className="text-2xl">🚀</span>
                    Launch Offer!
                    <span className="text-2xl">💸</span>
                </button>
            </form>
{/* 
            <style jsx global>{`
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
    @keyframes float-delayed {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
    @keyframes pulse-slow {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(5px); }
      50% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
      100% { transform: translateX(0); }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-float-delayed {
      animation: float-delayed 6s ease-in-out 2s infinite;
    }
    .animate-pulse-slow {
      animation: pulse-slow 4s ease-in-out infinite;
    }
    .animate-shake {
      animation: shake 0.4s ease-in-out;
    }
  `}</style> */}
        </div>
    );
};

export default Offer;