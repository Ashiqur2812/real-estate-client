import { BsFillHouseAddFill, BsFillPersonBadgeFill, BsFingerprint, BsGift } from 'react-icons/bs';
import { MdHomeWork, MdShop } from 'react-icons/md';
import MenuItem from './MenuItem';
import { FcAddImage } from 'react-icons/fc';

const SellerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Property'
        address='add-property'
      />
      {/* <MenuItem icon={MdHomeWork} label='My Inventory' address='my-inventory' />
      <MenuItem icon={BsFingerprint} label='My Orders' address='my-orders' /> */}
      <MenuItem
        icon={BsGift}
        label='Offered Properties'
        address='offered-properties'
      />
      <MenuItem
        icon={BsFillPersonBadgeFill}
        label='Agent Profile'
        address='agent-profile'
      />
      <MenuItem
        icon={FcAddImage}
        label='My Properties'
        address='my-added-properties'
      />
      <MenuItem
        icon={MdShop}
        label='My Sold Properties'
        address='my-sold-properties'
      />


    </>
  );
};

export default SellerMenu;
