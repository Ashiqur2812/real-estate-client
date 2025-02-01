import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Container from '../../../Shared/Container';
import LoadingSpinner from '../../../Shared/LoadingSpinner';
import Button from '../../../Shared/Button/Button';
import Heading from '../../../Shared/Heading';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';


const WishList = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: wishList = [], isLoading, refetch } = useQuery({
        queryKey: ['wishList', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/wish-list/${user?.email}`);
            // console.log(data);
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    // const closeModal = () => {
    //     setIsOpen(false);
    // };
    // console.log(wishList);

    const handleDelete = async (id) => {
        try {
            const { data } = await axiosSecure.delete(`/property/${id}`);
            Swal.fire({
                title: "Property deleted successfully!!!",
                icon: "success",
                draggable: true
            });
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

    const handleOffer = (id) => {
        navigate(`/dashboard/offer/${id}`);
    };

    return (
        <>
            <Container>
                <Helmet>
                    <title>🌟 My Dream Collection | Wish List</title>
                </Helmet>
                {wishList.length === 0 ? (
                    <p className="text-center text-4xl md:text-6xl text-rose-600 animate-bounce mt-40 md:mt-60 font-semibold">No properties found. 🏡</p>
                ) : <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 py-12">
                    {wishList.map((item) => (
                        <div
                            key={item._id}
                            className="mx-auto mb-16 max-w-6xl animate-floatIn transition-all duration-300 hover:scale-[101%]"
                        >
                            {/* Property Card */}
                            <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl hover:shadow-3xl overflow-hidden">
                                {/* Image Section */}
                                <div className="lg:w-1/2 relative group overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
                                        src={item?.image}
                                        alt="property"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <span className="absolute top-4 right-4 px-4 py-2 bg-white/90 rounded-full text-xl font-bold animate-pulse">
                                        ❤️ Saved
                                    </span>
                                </div>

                                {/* Details Section */}
                                <div className="lg:w-1/2 p-8 space-y-6">
                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-pink-500 bg-clip-text text-transparent">
                                            {item?.title}
                                        </h2>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">📍</span>
                                            <p className="text-xl font-semibold text-gray-700">{item?.location}</p>
                                        </div>
                                    </div>

                                    {/* Price & Actions */}
                                    <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-2xl">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-2xl font-bold text-gray-600">Dream Price</p>
                                                <p className="text-4xl font-black text-green-600">
                                                    ${item?.minPrice} - ${item?.maxPrice}
                                                </p>
                                            </div>
                                            <div className="text-4xl">💸</div>
                                        </div>
                                    </div>

                                    {/* Agent Card */}
                                    <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                        <img
                                            className="w-16 h-16 rounded-full border-4 border-purple-200"
                                            src={item.agent?.image}
                                            alt="Agent"
                                        />
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Agent Name : {item.agent?.name}</h3>
                                            <p className="text-teal-600 hover:text-lime-500 transition-colors">
                                                📧 {item.agent?.email}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                        <button
                                            onClick={() => handleDelete(item?._id)}
                                            className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-red-400 to-pink-600 text-white px-8 py-4 rounded-xl hover:scale-105 transition-transform hover:shadow-xl hover:shadow-red-200"
                                        >
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                            <span>Break My Heart 💔</span>
                                        </button>

                                        <button
                                            onClick={() => handleOffer(item._id)}
                                            className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-400 to-blue-600 text-white px-8 py-4 rounded-xl hover:scale-105 transition-transform hover:shadow-xl hover:shadow-green-200"
                                        >
                                            <span className="text-2xl">🤝</span>
                                            <span>Make It Mine! 💰</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            {/* <div className="hidden lg:block">
                                <div className="relative -top-8 -left-8 w-24 h-24 bg-purple-200 rounded-full blur-xl opacity-30 animate-float" />
                                <div className="relative -top-16 -right-8 w-32 h-32 bg-pink-200 rounded-full blur-xl opacity-30 animate-float-delayed" />
                            </div> */}
                        </div>
                    ))}
                </div>
                }
            </Container>

            {/* <style jsx global>{`
    @keyframes floatIn {
      0% { opacity: 0; transform: translateY(50px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
    .animate-floatIn {
      animation: floatIn 0.6s ease-out;
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-float-delayed {
      animation: float 6s ease-in-out 2s infinite;
    }
  `}</style> */}
        </>
    );
};

export default WishList;
