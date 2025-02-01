import { useState } from 'react';
import { GrLogout } from 'react-icons/gr';
import { FcSettings } from 'react-icons/fc';
import { AiOutlineBars } from 'react-icons/ai';
import MenuItem from './Menu/MenuItem';
import useAuth from '../../../hooks/useAuth';
import AdminMenu from './Menu/AdminMenu';
import { Link } from 'react-router-dom';
import SellerMenu from './Menu/SellerMenu';
import CustomerMenu from './Menu/CustomerMenu';
import logo from '../../../assets/images/elegant-logo.webp';
import useRole from '../../../hooks/useRole';
import {motion} from 'framer-motion'

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role, isLoading] = useRole();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 text-gray-800 flex justify-between md:hidden shadow-lg">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img
                className="rounded-md transform transition-transform duration-300 hover:scale-105"
                src={logo}
                alt="logo"
                width="60"
                height="60"
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-pink-100 rounded-lg"
        >
          <AiOutlineBars className="h-5 w-5 text-gray-800 hover:text-pink-600 transition-colors duration-300" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gradient-to-br from-pink-50 to-purple-50 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && "-translate-x-full"
          } md:translate-x-0 transition duration-200 ease-in-out shadow-2xl`}
      >
        <div>
          {/* Logo */}
          <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-white mx-auto transform transition-transform duration-300 hover:scale-105">
            <Link to="/">
              <img
                className="rounded-lg"
                src={logo}
                alt="logo"
                width="80"
                height="80"
              />
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {/* Menu Items */}
              {role === "user" && <CustomerMenu />}
              {role === "agent" && <SellerMenu />}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>
        </div>

        {/* Logout Button */}
        <div>
          <hr className="border-pink-200" />
          <motion.button
            onClick={logOut}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-800 hover:bg-pink-100 hover:text-pink-600 rounded-lg transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </motion.button>
        </div>
      </div>

      {/* Floating Decorations */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-pink-200 rounded-full blur-xl opacity-30 animate-[float_6s_ease-in-out_infinite] md:hidden"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-200 rounded-full blur-xl opacity-30 animate-[float_6s_ease-in-out_2s_infinite] md:hidden"></div>
    </>
  );
};

export default Sidebar;
