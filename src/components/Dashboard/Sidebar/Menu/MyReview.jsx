import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../Shared/LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import Container from '../../../Shared/Container';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';

const MyReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Fetch reviews for the logged-in user
    const { data: review = [], isLoading, refetch } = useQuery({
        queryKey: ['myReview', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/review/${user?.email}`);
            return data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    // Handle review deletion with confirmation
    const handleDelete = async (id) => {
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
                    const { data } = await axiosSecure.delete(`/review/${id}`);
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your review has been deleted.',
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
        <Container>
            <Helmet>
                <title>My Reviews</title>
            </Helmet>
            <div className="my-12 px-4">
                {/* Header Section */}
                <motion.h1
                    className="text-4xl font-extrabold text-center mb-10 text-[#313131]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    My Reviews 📝
                </motion.h1>

                {/* Reviews Section */}
                {review.length === 0 ? (
                    <motion.p
                        className="text-center text-2xl text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        You haven't given any reviews yet. 😢
                    </motion.p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {review.map((item) => (
                            <motion.div
                                key={item._id}
                                className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* Property Title */}
                                <h2 className="text-2xl font-bold text-teal-800">{item?.propertyTitle}</h2>
                                {/* Reviewer Email */}
                                <h2 className="text-2xl font-bold text-teal-800">{item?.reviewerEmail}</h2>

                                {/* Review Timestamp */}
                                <p className="text-sm text-gray-500 font-semibold mt-2">
                                    Reviewed on: {new Date(item?.timestamp).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    })}
                                </p>

                                {/* Review Description */}
                                <p className="mt-4 text-gray-700">{item?.reviewDescription}</p>

                                {/* Delete Button */}
                                <motion.button
                                    onClick={() => handleDelete(item._id)}
                                    className="mt-6 px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Delete 🗑️
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default MyReviews;