import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import Swal from 'sweetalert2';
import {motion} from 'framer-motion';

const UpdateProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

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

        // console.table({ propertyData });
        try {
            const { data } = await axiosSecure.put(`/update-property/${id}`, propertyData);
            // console.log(data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Property Updated Successfully!!!",
                showConfirmButton: false,
                timer: 2000
            });
            navigate('/dashboard/my-added-properties');
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
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-12 px-4 md:px-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="container mx-auto"
            >
                {/* Animated Header */}
                <motion.div
                    initial={{ y: -50, rotate: -2 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ type: 'spring' }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-bold animate-bounce">
                        🏗️ Remodel Your Listing
                    </h1>
                    <p className="text-xl text-gray-600 mt-4">Shape Your Property's Future 🚀</p>
                </motion.div>

                {/* Construction-themed Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 max-w-4xl mx-auto border-4 border-dashed border-orange-100 hover:border-orange-200 transition-colors"
                >
                    {/* Floating Decorations */}
                    <div className="absolute -top-8 -left-8 w-24 h-24 bg-orange-200 rounded-full blur-xl opacity-30 animate-float"></div>
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-yellow-200 rounded-full blur-xl opacity-30 animate-float-delayed"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { label: "🏠 Property Image", name: "image", emoji: "🖼️", type: "text" },
                            { label: "📝 Property Title", name: "title", emoji: "🏷️", type: "text" },
                            { label: "📍 Location", name: "location", emoji: "🌎", type: "text" },
                            { label: "💰 Min Price", name: "minPrice", emoji: "💸", type: "number" },
                            { label: "💎 Max Price", name: "maxPrice", emoji: "💰", type: "number" },
                            { label: "🤵 Agent Name", name: "agent.name", emoji: "👤", type: "text", readOnly: true },
                            { label: "📧 Agent Email", name: "agent.email", emoji: "✉️", type: "email", readOnly: true },
                        ].map((field, index) => (
                            <motion.div
                                key={field.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="space-y-2"
                            >
                                <label className="block text-lg font-semibold text-gray-700 flex items-center gap-2">
                                    <span className="text-2xl">{field.emoji}</span>
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    defaultValue={
                                        field.name.includes('.')
                                            ? field.name.split('.').reduce((obj, key) => obj?.[key], property) // Access nested properties
                                            : property?.[field.name]
                                    }
                                    readOnly={field.readOnly}
                                    className={`w-full px-4 py-3 text-lg rounded-xl border-2 ${field.readOnly
                                            ? 'bg-gray-100 border-gray-200 cursor-not-allowed'
                                            : 'border-orange-200 hover:border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                                        } transition-all duration-300 shadow-sm`}
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Animated Submit Button */}
                    <motion.div
                        className="text-center mt-10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <button
                            type="submit"
                            className="relative overflow-hidden px-12 py-4 text-2xl font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl hover:from-red-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                🔨 Update Now
                                <span className="text-xl animate-bounce">👉</span>
                            </span>
                            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </motion.div>
                </motion.form>
            </motion.div>

            {/* <style jsx global>{`
    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    @keyframes float-delayed {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(-5deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-float-delayed {
      animation: float-delayed 6s ease-in-out 2s infinite;
    }
  `}</style> */}
        </div>
    );
};

export default UpdateProperty;
