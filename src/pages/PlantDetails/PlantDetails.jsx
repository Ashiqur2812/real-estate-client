import Container from '../../components/Shared/Container';
import { Helmet } from 'react-helmet-async';
import Heading from '../../components/Shared/Heading';
import Button from '../../components/Shared/Button/Button';
import PurchaseModal from '../../components/Modal/PurchaseModal';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import Review from './Review';

const PlantDetails = () => {
  // let [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate()

  const { data: property = [], isLoading } = useQuery({
    queryKey: ['properties', id],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/property/${id}`);
      console.log(data);
      return data;
    }
  });

  if (isLoading) return <LoadingSpinner />;

  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  const { image, location, maxPrice, minPrice, title, agent } = property || {};

  const handleWishList =  () => {
    navigate('/dashboard/wish-list')
  }

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
              <div>Agent: {agent?.name}</div>

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
                <button onClick={()=>handleWishList()} className='btn btn-outline text-[#313131]' type='submit'>Add to wishlist</button>
              </div>
              {/* <div>
              <Button onClick={() => setIsOpen(true)} label='Purchase' />
            </div> */}
            </div>
            <hr className='my-6' />
          </div>
        </div>
      </Container>
      <div>
        <Review />
      </div>
      {/* <div className='w-fit flex justify-center mb-9 lg:mx-[43rem]'>
        <Button onClick={() => setIsOpen(true)} label='Add a review' />
      </div> */}
      {/* <PurchaseModal property={property} closeModal={closeModal} isOpen={isOpen} /> */}
    </>
  );
};

export default PlantDetails;
