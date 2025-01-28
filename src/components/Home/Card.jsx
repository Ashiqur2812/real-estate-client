// import { Link } from 'react-router-dom'
// import image from '../../assets/images/article1.png'
// const Card = () => {
//   return (
//     <Link
//       to={`/plant/1`}
//       className='col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl'
//     >
//       <div className='flex flex-col gap-2 w-full'>
//         <div
//           className='
//               aspect-square 
//               w-full 
//               relative 
//               overflow-hidden 
//               rounded-xl
//             '
//         >
//           <img
//             className='
//                 object-cover 
//                 h-full 
//                 w-full 
//                 group-hover:scale-110 
//                 transition
//               '
//             src={image}
//             alt='Plant Image'
//           />
//           <div
//             className='
//               absolute
//               top-3
//               right-3
//             '
//           ></div>
//         </div>
//         <div className='font-semibold text-xl text-[#313131]'>Money Plant</div>
//         <div className='font-semibold text-xl text-[#313131]'>Category: Indoor</div>
//         <div className='font-semibold text-xl text-[#313131]'>Quantity: 10</div>
//         <div className='flex flex-row items-center gap-1'>
//           <div className='font-semibold text-[#313131] text-xl'> Price: 15$</div>
//         </div>
//       </div>
//     </Link>
//   )
// }

// export default Card

import React from "react";
import { Link } from "react-router-dom";


const Card = ({ property }) => {

  const { title, location, image, minPrice, maxPrice,_id } = property || {}

  return (
    <>
    
      <div className="max-w-xl  mx-auto h-[32rem] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="relative">
          <img
            src={image}
            alt="Property"
            className="w-full aspect-square hover:scale-110 transition duration-300 ease-in-out h-64 object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Property Title */}
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {title}
          </h2>

          {/* Property Location */}
          <p className="text-sm text-gray-600 mb-2">
            Location: <span className="font-medium">{location}</span>
          </p>

          {/* Price Range */}
          <p className="text-sm text-gray-600 mb-2">
            Minimum Price: <span className="font-medium">{minPrice}</span>
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Maximum Price: <span className="font-medium">{maxPrice}</span>
          </p>
          {/* Details Button */}
          <div className="text-center my-5">
            <Link
              to={`/property/${_id}`}
            >
              <button className="relative px-8 py-3 text-lg font-semibold text-white bg-slate-800 rounded-lg overflow-hidden group">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 transition-transform duration-500 transform scale-0 group-hover:scale-100"></span>
                <span className="relative z-10">View Details</span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 blur-lg opacity-50 transition-opacity duration-500 group-hover:opacity-100"></span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

