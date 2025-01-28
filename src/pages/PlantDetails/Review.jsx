import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Heading from '../../components/Shared/Heading';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import PurchaseModal from '../../components/Modal/PurchaseModal';
import Button from '../../components/Shared/Button/Button';
import useRole from '../../hooks/useRole';

const Review = () => {
    const axiosSecure = useAxiosSecure();
    let [isOpen, setIsOpen] = useState(false);
    const [role] = useRole();

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/reviews`);
            console.log(data);
            return data;
        }
    });
    console.log(reviews);
    refetch();

    const closeModal = () => {
        setIsOpen(false);
    };


    return (
        <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-20">
            <div className="flex justify-center">
                <Heading subtitle="Latest User Reviews" />
            </div>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper bg-[#d9d3d3] my-10"
            >
                {reviews.map((review) => (
                    <SwiperSlide key={review.id}>
                        <div className="flex flex-col items-center mx-4 sm:mx-8 md:mx-16 lg:mx-24 my-8 sm:my-12 md:my-16">
                            {/* Reviewer Image */}
                            <img
                                src={review.reviewerImage}
                                alt={`${review.reviewerName}'s avatar`}
                                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-full mb-4"
                            />
                            {/* Review Description */}
                            <p className="py-4 sm:py-5 text-center text-[#313131] text-sm sm:text-base md:text-lg lg:text-xl max-w-[20rem] sm:max-w-[30rem] md:max-w-[40rem] lg:max-w-[60rem]">
                                {review.reviewDescription}
                            </p>
                            {/* Reviewer Name */}
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#313131]">
                                {review.reviewerName}
                            </h3>
                            {/* Property Title */}
                            <h4 className="text-lg sm:text-xl font-medium text-[#525252] mt-2">
                                Property: {review.propertyTitle}
                            </h4>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='w-fit flex justify-center mb-9 lg:mx-[38rem]'>
                <Button disabled={role === 'admin' || role === 'agent'} onClick={() => setIsOpen(true)} label='Add a review' />
            </div>
            <PurchaseModal reviews={reviews} closeModal={closeModal} isOpen={isOpen} />
        </div>
    );
};

export default Review;

