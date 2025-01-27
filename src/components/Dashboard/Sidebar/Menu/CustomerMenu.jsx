import { BsFingerprint, BsReceipt } from 'react-icons/bs';
import { GrUserAdmin } from 'react-icons/gr';
import MenuItem from './MenuItem';
import { useState } from 'react';
// import BecomeSellerModal from '../../../Modal/BecomeSellerModal';
import { MdSave, MdVignette } from 'react-icons/md';
import { FcSettings } from 'react-icons/fc';

const CustomerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      
      <MenuItem icon={MdVignette} label='Property Bought' address='property-bought' />
      <MenuItem icon={MdSave}
        label='Wish List'
        address='wish-list'
      />
      <MenuItem icon={BsReceipt}
        label='My Review'
        address='my-review'
      />
      <MenuItem
        icon={FcSettings}
        label='My Profile'
        address='/dashboard/profile'
      />

      <div
        onClick={() => setIsOpen(true)}
        className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'
      >
        {/* <GrUserAdmin className='w-5 h-5' />

        <span className='mx-4 font-medium'>Become A Seller</span> */}
      </div>

      {/* <BecomeSellerModal closeModal={closeModal} isOpen={isOpen} /> */}
    </>
  );
};

export default CustomerMenu;
