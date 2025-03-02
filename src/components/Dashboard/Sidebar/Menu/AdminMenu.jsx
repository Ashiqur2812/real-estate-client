import { FaUserCog } from 'react-icons/fa';
import MenuItem from './MenuItem';
import { BsGraphUp, BsPerson } from 'react-icons/bs';
import { MdManageHistory, MdOutlineManageHistory } from 'react-icons/md';

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
     
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
    </>
  );
};

export default AdminMenu;
