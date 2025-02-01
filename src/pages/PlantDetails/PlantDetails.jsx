import Container from '../../components/Shared/Container';
import { Helmet } from 'react-helmet-async';
import Heading from '../../components/Shared/Heading';
// import Button from '../../components/Shared/Button/Button';
// import PurchaseModal from '../../components/Modal/PurchaseModal';
// import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import Review from './Review';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';

const PlantDetails = () => {
  const { user } = useAuth();
  const [role] = useRole();
  // let [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: property = [], isLoading } = useQuery({
    queryKey: ['properties', id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/properties/${id}`);
      // console.log(data);
      return data;
    }
  });

  if (isLoading) return <LoadingSpinner />;

  // console.log(property);

  const { image, location, maxPrice, minPrice, title, agent } = property || {};

  const wishListData = {
    image, location, maxPrice, minPrice, title, agent, buyerEmail: user?.email
  };

  const handleWishList = async () => {
    try {
      const { data } = await axiosSecure.post('/add-wishList', wishListData);
      // console.log(data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Property Added Successfully!!!",
        showConfirmButton: false,
        timer: 2000
      });
      navigate('/dashboard/wish-list');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      Swal.fire({
        title: `${error?.message}`,
        icon: "error",
        draggable: true
      });
    }
  };


  return (
    <>
      <Container>
        <Helmet>
          <title>✨ Property Details | DreamWell</title>
        </Helmet>
        <div className="mx-auto flex flex-col lg:flex-row items-center justify-between w-full gap-12 my-12 animate-fadeInUp">
          {/* Header Image with Hover Effect */}
          <div className="flex-1 w-full hover:transform hover:scale-105 transition-all duration-500">
            <div className="w-full overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl">
              <img
                className="object-cover w-full h-[600px] rounded-3xl"
                src={image}
                alt="property header"
                loading="lazy"
              />
            </div>
          </div>

          {/* Property Details Card */}
          <div className="flex-1 bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 lg:-ml-20">
            <Heading
              title={title}
              subtitle="Your Dream Awaits"
              className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
            />

            {/* Agent Section */}
            <div className="my-8 space-y-6">
              <div className="flex items-center space-x-4 animate-slideInRight">
                <img
                  className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover hover:transform hover:scale-110 transition-all"
                  src={agent?.image}
                  alt="Agent"
                />
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold text-gray-800">{agent?.name}</h3>
                  <p className="text-purple-600 hover:text-blue-500 transition-colors">
                    ✉️ {agent?.email}
                  </p>
                </div>
              </div>

              {/* Price & Wishlist */}
              <div className="bg-white p-6 rounded-2xl shadow-lg animate-pulse-slow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-semibold text-gray-600">Investment Range</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                      ${minPrice} - ${maxPrice}
                    </p>
                  </div>
                  <button
                    onClick={handleWishList}
                    disabled={role === 'admin' || role === 'agent'}
                    className="heartBeat bg-gradient-to-r from-pink-400 to-red-500 text-white px-8 py-3 rounded-full hover:from-red-500 hover:to-pink-400 transition-all transform hover:scale-110 disabled:opacity-50"
                  >
                    ❤️ Add to Wishlist
                  </button>
                </div>
              </div>

              {/* Location & Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-md">
                  <span className="text-3xl">🌍</span>
                  <p className="text-xl font-semibold text-gray-700">{location}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-md text-center">
                    <p className="text-2xl">🛏️</p>
                    <p className="font-bold">5 Bedrooms</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-md text-center">
                    <p className="text-2xl">🚿</p>
                    <p className="font-bold">4 Bathrooms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Icons Decoration */}
        <div className="hidden lg:block">
          <div className="absolute top-0 left-0 w-24 h-24 bg-purple-200 rounded-full blur-xl opacity-30 animate-float"></div>
          <div className="absolute top-1/3 right-0 w-32 h-32 bg-blue-200 rounded-full blur-xl opacity-30 animate-float-delayed"></div>
        </div>
      </Container>

      {/* Review Section */}
      <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <Review />
      </div>

      <style jsx global>{`
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-slow {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-float-delayed {
      animation: float 6s ease-in-out 2s infinite;
    }
    .animate-fadeInUp {
      animation: fadeInUp 1s ease-out;
    }
    .animate-pulse-slow {
      animation: pulse-slow 4s ease-in-out infinite;
    }
    .animate-slideInRight {
      animation: slideInRight 0.5s ease-out;
    }
  `}</style>
    </>
  );
};

export default PlantDetails;
