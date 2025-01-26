import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory, MdSave } from 'react-icons/md'
import MenuItem from './MenuItem'

const SellerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Property'
        address='add-property'
      />
      <MenuItem icon={MdHomeWork} label='My Inventory' address='my-inventory' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Orders'
        address='manage-orders'
      />
      <MenuItem
        icon={MdSave}
        label='Wish List'
        address='wish-list'
      />
    </>
  )
}

export default SellerMenu
