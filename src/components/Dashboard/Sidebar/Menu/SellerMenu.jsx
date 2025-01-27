import { BsFillHouseAddFill, BsFillPersonBadgeFill, BsFingerprint } from 'react-icons/bs';
import { MdHomeWork } from 'react-icons/md';
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
      <MenuItem icon={MdHomeWork} label='My Inventory' address='my-inventory' />
      <MenuItem icon={BsFingerprint} label='My Orders' address='my-orders' />
      
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

    </>
  );
};

export default SellerMenu;
