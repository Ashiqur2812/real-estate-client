import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const ManageReviews = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const { data } = await axiosSecure('/reviews');
            // console.log(data);
            return data;
        }
    });

    // console.log(reviews);
    if (isLoading) return <LoadingSpinner />;

    const deleteReview = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            customClass: {
                popup: 'rounded-2xl',
                confirmButton: 'px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-all duration-300',
                cancelButton: 'px-6 py-2 bg-gray-500 hover:bg-gray-600 transition-all duration-300',
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/review/${id}`);
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Review has been deleted.',
                        icon: 'success',
                        confirmButtonColor: '#10B981',
                        customClass: {
                            popup: 'rounded-2xl',
                            confirmButton: 'px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all duration-300',
                        },
                    });
                    refetch();
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong!',
                        text: error.message,
                        customClass: {
                            popup: 'rounded-2xl',
                            confirmButton: 'px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-all duration-300',
                        },
                    });
                }
            }
        });
    };


    return (
        <>
            <Helmet>
                <title>🏡 Review Villa Management</title>
            </Helmet>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 py-12 px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="text-4xl sm:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text "
                    >
                        🏘️ Feedback Estates
                    </motion.h1>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.1 }}
                    >
                        {reviews.map((review) => (
                            <motion.div
                                key={review.id}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.4 }}
                                className="relative bg-white rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 border-4 border-rose-100 group"
                            >
                                {/* Review Rating Badge */}
                                <div className="absolute -top-4 -right-4 bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate__animated animate__rubberBand">
                                    ⭐{review.rating || "5.0"}
                                </div>

                                {/* Reviewer Card */}
                                <div className="flex flex-col md:flex-row items-start gap-6">
                                    <motion.div
                                        className="relative w-full md:w-1/3 h-48 rounded-xl overflow-hidden border-4 border-rose-200"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <img
                                            src={review.reviewerImage}
                                            alt={review.reviewerName}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                            <h3 className="text-white font-bold text-lg truncate">
                                                🧑💼 {review.reviewerName}
                                            </h3>
                                        </div>
                                    </motion.div>

                                    {/* Review Content */}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex gap-2 text-center text-sm text-rose-600">
                                            <span className="bg-rose-100 px-3 py-1 rounded-full">🏡 Property Expert</span>
                                            <span className="bg-rose-100 px-3 py-1 rounded-full">📅 2 days ago</span>
                                        </div>

                                        <motion.p
                                            className="text-gray-600 text-lg italic relative pl-4 border-l-4 border-amber-300"
                                            whileHover={{ x: 5 }}
                                        >
                                            ❝{review.reviewDescription}❞
                                        </motion.p>

                                        <motion.button
                                            onClick={() => deleteReview(review._id)}
                                            className="w-full py-3 bg-gradient-to-r from-rose-500 to-amber-600 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all group"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            🚧 Demolish Review
                                            <span className="group-hover:animate-bounce">💥</span>
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Decorative Elements */}
                                <div className="absolute -bottom-4 -left-4 text-6xl opacity-20 -z-10">🏠</div>
                                <div className="absolute -top-4 -left-4 text-4xl opacity-30 animate-float">🏷️</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Empty State */}
                    {reviews.length === 0 && (
                        <motion.div
                            className="text-center py-24"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="text-9xl mb-6 animate-bounce">🏚️</div>
                            <h2 className="text-3xl font-bold text-gray-700">
                                No reviews in the neighborhood yet!
                            </h2>
                            <p className="text-gray-500 mt-2">Be the first to leave your mark!</p>
                        </motion.div>
                    )}

                    {/* Floating Decorations */}
                    <div className="hidden lg:block">
                        <motion.div
                            className="absolute top-20 left-20 w-16 h-16 bg-rose-200 rounded-full"
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute bottom-40 right-32 w-24 h-24 bg-amber-200 rounded-lg rotate-12"
                            animate={{ y: [0, -30, 0] }}
                            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                        />
                    </div>
                </div>
            </motion.div>

            <style jsx global>{`
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
  `}</style>
        </>
    );
};

export default ManageReviews;
