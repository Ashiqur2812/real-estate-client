import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

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
        try {
            const res = await axiosSecure.delete(`/review/${id}`);
            // console.log(res.data);
            Swal.fire({
                title: "Reviews deleted successfully!!!",
                icon: "success",
                draggable: true
            })
            refetch();
        } catch (error) {
            // console.log(error);
            Swal.fire({
                icon: "error",
                title: `${error.message}`,
                draggable: true
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Manage Reviews</title>
            </Helmet>
            <div className="container mx-auto my-12">
                <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
                    Manage Reviews
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center mb-4">
                                <img
                                    src={review.reviewerImage}
                                    alt={review.reviewerName}
                                    className="w-12 h-12 rounded-full border border-gray-300 object-cover mr-4"
                                />
                                <div>
                                    <h2 className="text-lg font-bold text-gray-700">
                                        {review.reviewerName}
                                    </h2>
                                    {/* <p className="text-sm text-gray-500">{review.reviewerEmail}</p> */}
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">{review.
                                reviewDescription}</p>
                            <button
                                onClick={() => deleteReview(review._id)}
                                className="w-full px-4 py-2 text-white bg-rose-500 hover:bg-rose-600 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105"
                            >
                                Delete Review
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ManageReviews;
