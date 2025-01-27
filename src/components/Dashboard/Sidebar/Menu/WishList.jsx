// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import { Helmet } from 'react-helmet-async';
// import { useParams } from 'react-router-dom';
// import LoadingSpinner from '../../../Shared/LoadingSpinner';
// import useAxiosSecure from '../../../../hooks/useAxiosSecure';
// import useAuth from '../../../../hooks/useAuth';
// import Card from '../../../Home/Card';

// const WishList = () => {
//     const {user} = useAuth()
//     const axiosSecure = useAxiosSecure();
//     const { id } = useParams();
//     console.log(id);

//     const { data: wishListedProperties = [], isLoading, refetch } = useQuery({
//         queryKey: ['wishList', id],
//         queryFn: async () => {
//             const { data } = await axiosSecure.get(`/property/${id}`);
//             console.log(data);
//             return data;
//         }
//     });

//     if (isLoading) return <LoadingSpinner />;
//     console.log(wishListedProperties);

//     return (
//         <div>
//             <Helmet>
//                 <title>Wishlist</title>
//             </Helmet>
//             <div className="mx-auto my-12 max-w-7xl px-4">
//                 <h1 className="text-3xl font-bold text-center mb-8">My Wishlist</h1>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {wishListedProperties.map((property) => (
//                         <div
//                             key={property.id}
//                             className="border rounded-lg shadow-lg p-4 flex flex-col justify-between"
//                         >
//                             {/* Property Image */}
//                             <img
//                                 src={property.image}
//                                 alt={property.title}
//                                 className="w-full h-48 object-cover rounded-lg mb-4"
//                             />
//                             {/* Property Title */}
//                             <h2 className="text-xl font-bold text-gray-800 mb-2">
//                                 {property.title}
//                             </h2>
//                             {/* Property Location */}
//                             <p className="text-gray-600 mb-2">Location: {property.location}</p>
//                             {/* Agent Info */}
//                             <div className="flex items-center gap-4 mb-4">
//                                 <img
//                                     src={property.agent.image}
//                                     alt={property.agent.name}
//                                     className="w-10 h-10 rounded-full object-cover"
//                                 />
//                                 <div>
//                                     <p className="text-gray-800 font-medium">{property.agent.name}</p>
//                                     <p className="text-sm text-gray-500">
//                                         {property.agent.verified ? 'Verified' : 'Not Verified'}
//                                     </p>
//                                 </div>
//                             </div>
//                             {/* Price Range */}
//                             <p className="text-lg font-semibold text-gray-700 mb-4">
//                                 Price: ${property.minPrice} - ${property.maxPrice}
//                             </p>
//                             {/* Buttons */}
//                             <div className="flex justify-between">
//                                 <button
//                                     className="btn btn-primary"
//                                     onClick={() => handleMakeOffer(property.id)}
//                                 >
//                                     Make an Offer
//                                 </button>
//                                 <button
//                                     className="btn btn-outline btn-error"
//                                     onClick={() => handleRemove(property.id)}
//                                 >
//                                     Remove
//                                 </button>
//                             </div>
//                         </div>
//                         // <Card/>
//                     ))}
//                 </div>
//                 {wishListedProperties.length === 0 && (
//                     <p className="text-center text-gray-500 mt-8">No properties in your wishlist.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default WishList;



import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
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
    // let [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: wishList = [], isLoading, refetch } = useQuery({
        queryKey: ['wishList', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/wish-list/${user?.email}`);
            console.log(data);
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    // const closeModal = () => {
    //     setIsOpen(false);
    // };
    console.log(wishList);

    const handleDelete = async (id) => {
        try {
            const { data } = await axiosSecure.delete(`/property/${id}`);
            Swal.fire({
                title: "Property deleted successfully!!!",
                icon: "success",
                draggable: true
            });
            console.log(data);
            refetch()
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                icon: "error",
                title: "Something went wrong!",
                draggable: true
            });
        }
    };

    const handleOffer = (id) => {
        navigate(`/dashboard/offer/${id}`)
    }

    return (
        <>
            <Container>
                <Helmet>
                    <title>Wish List</title>
                </Helmet>
                {
                    wishList.map(item => <>
                        <div key={item._id} className='mx-auto flex flex-col lg:flex-row items-center justify-between w-full gap-12 my-12'>

                            <div className='flex flex-col gap-6 flex-1'>
                                <div>
                                    <div className='w-full overflow-hidden rounded-xl'>
                                        <img
                                            className='object-cover w-full'
                                            src={item?.image}
                                            alt='header image'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='md:gap-10 flex-1'>

                                <Heading
                                    title={'Fabulous Property'}
                                    subtitle={`Title: ${item?.title}`}
                                />
                                <hr className='my-6' />
                                <div
                                    className='text-lg font-medium text-neutral-500'>
                                    Agent Email : {item?.agent?.email}
                                </div>
                                <hr className='my-6' />

                                <div
                                    className=' text-xl  font-semibold  flex  flex-row  items-center gap-2'>
                                    <div>Agent: {item.agent?.name}</div>
                                    <img
                                        className='rounded-full'
                                        height='30'
                                        width='30'
                                        alt='Avatar'
                                        referrerPolicy='no-referrer'
                                        src={item.agent?.image}
                                    />
                                </div>
                                <hr className='my-6' />
                                <div>
                                    <p className=' gap-4  font-light text-slate-800 text-xl'>
                                        Location: {item?.location}
                                    </p>
                                </div>
                                <hr className='my-6' />
                                <div className='flex justify-between'>
                                    <p className='font-bold text-3xl text-gray-500'>Price: {item?.minPrice}$ - {item?.maxPrice}$</p>
                                    <button onClick={() => handleDelete(item?._id)}
                                        class="flex justify-center items-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                                    >
                                        <svg viewBox="0 0 15 15" class="w-5 fill-white">
                                            <svg
                                                class="w-6 h-6"
                                                stroke="currentColor"
                                                stroke-width="1.5"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    stroke-linejoin="round"
                                                    stroke-linecap="round"
                                                ></path>
                                            </svg>
                                            Button
                                        </svg>
                                    </button>
                                </div>
                                <hr className='my-6' />
                            </div>
                        </div>
                        <div className='w-fit flex justify-center mb-9 lg:mx-[25rem]'>
                            <Button onClick={()=>handleOffer(item._id)} label='Make an Offer' />
                        </div>  
                        </>
                    )
                }
            </Container>
            
            {/* <PurchaseModal property={property} closeModal={closeModal} isOpen={isOpen} /> */}
        </>
    );
};

export default WishList;
