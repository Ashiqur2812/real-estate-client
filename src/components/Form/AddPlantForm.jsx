import React from 'react';
import useAuth from '../../hooks/useAuth';
import { shortImageName } from '../../pages/Dashboard/Seller/utilities';
import { TbFidgetSpinner } from 'react-icons/tb';

const AddPlantForm = ({ handleSubmit, uploadButtonText, setUploadButtonText, loading }) => {
  const { user } = useAuth();

  return (
    <div>
      <div>
        <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                {/* Property Title */}
                <div className="space-y-1 text-sm">
                  <label className="block text-gray-600">
                    Property Title
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-pink-300 focus:outline-pink-500 rounded-md bg-white"
                    name="title"
                    id="title"
                    type="text"
                    placeholder="Property Title"
                    required
                  />
                </div>
                {/* Property Location */}
                <div className="space-y-1 text-sm">
                  <label className="block text-gray-600">
                    Property Location
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-pink-300 focus:outline-pink-500 rounded-md bg-white"
                    name="location"
                    id="location"
                    type="text"
                    placeholder="Property Location"
                    required
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label className="block text-gray-600">
                    Agent Name
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-100"
                    name="agentName"
                    id="agentName"
                    type="text"
                    defaultValue={user?.displayName}
                    readOnly
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label className="block text-gray-600">
                    Agent Email
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-100"
                    name="agentEmail"
                    defaultValue={user?.email}
                    id="agentEmail"
                    type="email"
                    readOnly
                  />
                </div>
              </div>
              <div className="space-y-6 flex flex-col">
                {/* Price Range */}
                {/* Minimum Price */}
                <div className="space-y-1 text-sm">
                  <label className="block text-gray-600">
                    Minimum Price
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-pink-300 focus:outline-pink-500 rounded-md bg-white"
                    name="minPrice"
                    id="priceRange"
                    type="text"
                    placeholder="Price (e.g., $100,000)"
                    required
                  />
                </div>
                {/* Maximum Price */}
                <div className="space-y-1 text-sm">
                  <label className="block text-gray-600">
                    Maximum price
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-pink-300 focus:outline-pink-500 rounded-md bg-white"
                    name="maxPrice"
                    id="priceRange"
                    type="text"
                    placeholder="Price (e.g., $100,000)"
                    required
                  />
                </div>
                {/* Property Image */}
                <div className="p-4 w-full m-auto rounded-lg flex-grow">
                  <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                    <div className="flex flex-col w-max mx-auto text-center">
                      <label>
                        <input
                          onChange={(e) => setUploadButtonText({ image: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) })}
                          className="text-sm cursor-pointer w-36 hidden"
                          type="file"
                          name="image"
                          id="image"
                          accept="image/*"
                          hidden
                        />
                        <div className="bg-pink-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-pink-500">
                          {shortImageName(uploadButtonText?.image)}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                {/* Add Property Button */}
                <button
                  type="submit"
                  className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
                >
                  {loading ? (
                    <TbFidgetSpinner className='animate-spin m-auto' />
                  ) : (
                    'Add Property'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
        <form>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            <div className='space-y-6'>
              
              <div className='space-y-1 text-sm'>
                <label htmlFor='name' className='block text-gray-600'>
                  Name
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='name'
                  id='name'
                  type='text'
                  placeholder='Plant Name'
                  required
                />
              </div>
              
              <div className='space-y-1 text-sm'>
                <label htmlFor='category' className='block text-gray-600 '>
                  Category
                </label>
                <select
                  required
                  className='w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='category'
                >
                  <option value='Indoor'>Indoor</option>
                  <option value='Outdoor'>Outdoor</option>
                  <option value='Succulent'>Succulent</option>
                  <option value='Flowering'>Flowering</option>
                </select>
              </div>
              
              <div className='space-y-1 text-sm'>
                <label htmlFor='description' className='block text-gray-600'>
                  Description
                </label>

                <textarea
                  id='description'
                  placeholder='Write plant description here...'
                  className='block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 '
                  name='description'
                ></textarea>
              </div>
            </div>
            <div className='space-y-6 flex flex-col'>
              
              <div className='flex justify-between gap-2'>
               
                <div className='space-y-1 text-sm'>
                  <label htmlFor='price' className='block text-gray-600 '>
                    Price
                  </label>
                  <input
                    className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                    name='price'
                    id='price'
                    type='number'
                    placeholder='Price per unit'
                    required
                  />
                </div>

               
                <div className='space-y-1 text-sm'>
                  <label htmlFor='quantity' className='block text-gray-600'>
                    Quantity
                  </label>
                  <input
                    className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                    name='quantity'
                    id='quantity'
                    type='number'
                    placeholder='Available quantity'
                    required
                  />
                </div>
              </div>
             
              <div className=' p-4  w-full  m-auto rounded-lg flex-grow'>
                <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                  <div className='flex flex-col w-max mx-auto text-center'>
                    <label>
                      <input
                        className='text-sm cursor-pointer w-36 hidden'
                        type='file'
                        name='image'
                        id='image'
                        accept='image/*'
                        hidden
                      />
                      <div className='bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500'>
                        Upload
                      </div>
                    </label>
                  </div>
                </div>
              </div>

             
              <button
                type='submit'
                className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 '
              >
                Save & Continue
              </button>
            </div>
          </div>
        </form>
      </div> */}
    </div>
  );
};

export default AddPlantForm;