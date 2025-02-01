import React from 'react';
import useAuth from '../../hooks/useAuth';
import { shortImageName } from '../../pages/Dashboard/Seller/utilities';
import { TbFidgetSpinner } from 'react-icons/tb';
import {motion} from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const AddPlantForm = ({ handleSubmit, uploadButtonText, setUploadButtonText, loading }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>🏡 Add Property </title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto"
      >
        {/* Header Section */}
        <motion.div
          initial={{ y: -50, scale: 0.9 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-6xl font-bold ">
            🏡 Add Your Property
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mt-4 animate-bounce">
            List Your Dream Property and Make It Shine! ✨
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/90  p-8 rounded-3xl shadow-2xl transform transition-transform duration-500 hover:scale-[101%]">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Property Title */}
              <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-2xl">🏷️</span>
                  Property Title
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-300 hover:border-pink-400"
                  name="title"
                  type="text"
                  placeholder="Enter property title"
                  required
                />
              </div>

              {/* Property Location */}
              <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  Property Location
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-300 hover:border-pink-400"
                  name="location"
                  type="text"
                  placeholder="Enter property location"
                  required
                />
              </div>

              {/* Agent Name */}
              <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-2xl">👤</span>
                  Agent Name
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border-2 border-gray-200 rounded-xl bg-gray-100 cursor-not-allowed"
                  name="agentName"
                  type="text"
                  defaultValue={user?.displayName}
                  readOnly
                />
              </div>

              {/* Agent Email */}
              <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-2xl">📧</span>
                  Agent Email
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border-2 border-gray-200 rounded-xl bg-gray-100 cursor-not-allowed"
                  name="agentEmail"
                  type="email"
                  defaultValue={user?.email}
                  readOnly
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Minimum Price */}
              <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  Minimum Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-300 hover:border-pink-400"
                  name="minPrice"
                  type="text"
                  placeholder="Enter minimum price"
                  required
                />
              </div>

              {/* Maximum Price */}
              <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-2xl">💎</span>
                  Maximum Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-300 hover:border-pink-400"
                  name="maxPrice"
                  type="text"
                  placeholder="Enter maximum price"
                  required
                />
              </div>

              {/* Property Image Upload */}
              <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-2xl">🖼️</span>
                  Property Image
                </label>
                <div className="file_upload px-5 py-3 relative border-4 border-dotted border-pink-200 rounded-xl transition-all duration-300 hover:border-pink-400 hover:shadow-lg">
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
                      <div className="bg-pink-500 text-white border border-gray-300 rounded-xl font-semibold cursor-pointer p-2 px-4 hover:bg-pink-600 transition-all duration-300">
                        {shortImageName(uploadButtonText?.image)}
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Add Property Button */}
              <button
                type="submit"
                className="w-full p-3 mt-5 text-center font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  'Add Property 🚀'
                )}
              </button>
            </div>
          </div>
        </motion.form>

        {/* Floating Decorations */}
        {/* <div className="absolute top-0 left-0 w-24 h-24 bg-pink-200 rounded-full blur-xl opacity-30 animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-200 rounded-full blur-xl opacity-30 animate-[float_6s_ease-in-out_2s_infinite]"></div> */}
      </motion.div>
    </div>
  );
};

export default AddPlantForm;