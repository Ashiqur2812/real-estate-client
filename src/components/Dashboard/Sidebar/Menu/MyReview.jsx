import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../Shared/LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import Container from '../../../Shared/Container';
import Swal from 'sweetalert2';

const MyReviews = () => {
    const axiosSecure = useAxiosSecure();
    // const queryClient = useQueryClient();

    // Fetch reviews for the logged-in user
    const { data: reviews = [], isLoading,refetch } = useQuery({
        queryKey: ['myReviews'],
        queryFn: async () => {
            const { data } = await axiosSecure('/reviews');
            // console.log(data);
            return data;
        },
    });

    // console.log(reviews);

    if (isLoading) return <LoadingSpinner />;

    // Handle review deletion
    const handleDelete = async (id) => {
        try {
            const { data } = await axiosSecure.delete(`/review/${id}`);
            Swal.fire({
                title: "Review deleted successfully!!!",
                icon: "success",
                draggable: true
            });
            // console.log(data);
            refetch();
        } catch (error) {
            // console.log(error.message);
            Swal.fire({
                icon: "error",
                title: "Something went wrong!",
                draggable: true
            });
        }
    };

    return (
        <Container>
            <Helmet>
                <title>My Reviews</title>
            </Helmet>
            <div className="my-12">
                <h1 className="text-2xl font-bold mb-6">My Reviews</h1>
                {reviews.length === 0 ? (
                    <p className="text-gray-500">You haven't given any reviews yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="p-4 border rounded-lg shadow-md hover:shadow-lg transition"
                            >
                                <h2 className="text-xl font-semibold">{review.propertyTitle}</h2>
                                <p className="text-sm text-gray-500">Reviewed on: {new Date(review?.timestamp).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                })}</p>
                                <p className="mt-2 text-gray-800">{review.reviewDescription}</p>
                                <button
                                    onClick={() => handleDelete(review._id)}
                                    className="mt-4 px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default MyReviews;
