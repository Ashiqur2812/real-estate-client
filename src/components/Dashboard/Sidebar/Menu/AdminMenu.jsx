import { FaUserCog } from 'react-icons/fa';
import MenuItem from './MenuItem';
import { BsGraphUp, BsPerson } from 'react-icons/bs';
import { MdManageHistory, MdOutlineManageHistory } from 'react-icons/md';

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      {/* <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Orders'
        address='manage-orders'
      /> */}
     
      <MenuItem
        icon={MdManageHistory}
        label='Manage Properties'
        address='manage-properties'
      />
      <MenuItem
        icon={MdManageHistory}
        label='Manage Reviews'
        address='reviews'
      />
      <MenuItem
        icon={BsPerson}
        label='Admin Profile'
        address='admin-profile'
      />
      {/* <MenuItem
        icon={BsGraphUp}
        label='Statistics'
        address='/dashboard'
      /> */}
    </>
  );
};

export default AdminMenu;
