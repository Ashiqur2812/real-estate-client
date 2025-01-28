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
  console.log(id);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: property = [], isLoading } = useQuery({
    queryKey: ['properties', id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/properties/${id}`);
      console.log(data);
      return data;
    }
  });

  if (isLoading) return <LoadingSpinner />;

  console.log(property);

  const { image, location, maxPrice, minPrice, title, agent } = property || {};

  const wishListData = {
    image, location, maxPrice, minPrice, title, agent, buyerEmail: user?.email
  };

  const handleWishList = async () => {
    try {
      const { data } = await axiosSecure.post('/add-wishList', wishListData);
      console.log(data);
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
          <title>Property Details</title>
        </Helmet>
        <div className='mx-auto flex flex-col lg:flex-row items-center justify-between w-full gap-12 my-12'>
          {/* Header */}
          <div className='flex flex-col gap-6 flex-1'>
            <div>
              <div className='w-full overflow-hidden rounded-xl'>
                <img
                  className='object-cover w-full'
                  src={image}
                  alt='header image'
                />
              </div>
            </div>
          </div>
          <div className='md:gap-10 flex-1'>
            {/* Plant Info */}
            <Heading
              title={'Fabulous Property'}
              subtitle={`Title: ${title}`}
            />
            <hr className='my-6' />
            <div
              className='
          text-lg font-medium text-neutral-500'
            >
              Agent Email : {agent?.email}
            </div>
            <hr className='my-6' />

            <div
              className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
            >
              <div>Agent Name : {agent?.name}</div>

              <img
                className='rounded-full'
                height='30'
                width='30'
                alt='Avatar'
                referrerPolicy='no-referrer'
                src={agent?.image}
              />
            </div>
            <hr className='my-6' />
            <div>
              <p
                className='
                gap-4 
                font-light
                text-slate-800
                text-xl
              '
              >
                Location: {location}
              </p>
            </div>
            <hr className='my-6' />
            <div className='flex justify-between'>
              <p className='font-bold text-3xl text-gray-500'>Price: {minPrice}$ - {maxPrice}$</p>
              <div>
                <button disabled={role === 'admin' || role === 'agent'} onClick={handleWishList} className='btn btn-outline text-[#313131] ' type='submit'>Add to wishlist</button>
              </div>
            </div>
            <hr className='my-6' />
          </div>
        </div>
      </Container>
      <div>
        <Review />
      </div>
    </>
  );
};

export default PlantDetails;
