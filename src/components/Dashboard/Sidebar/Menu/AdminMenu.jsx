import { FaUserCog } from 'react-icons/fa';
import MenuItem from './MenuItem';
import { BsGraphUp } from 'react-icons/bs';
import { MdOutlineManageHistory } from 'react-icons/md';

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Orders'
        address='manage-orders'
      />
      <MenuItem
        icon={BsGraphUp}
        label='Statistics'
        address='/dashboard'
      />
    </>
  );
};

export default AdminMenu;
