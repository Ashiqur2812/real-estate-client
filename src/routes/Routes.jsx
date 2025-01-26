import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import PlantDetails from '../pages/PlantDetails/PlantDetails';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import AddPlant from '../pages/Dashboard/Seller/AddPlant';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers';
import Profile from '../pages/Dashboard/Common/Profile';
import Statistics from '../pages/Dashboard/Common/Statistics';
import MainLayout from '../layouts/MainLayout';
import MyInventory from '../pages/Dashboard/Seller/MyInventory';
import ManageOrders from '../pages/Dashboard/Seller/ManageOrders';
import MyOrders from '../pages/Dashboard/Customer/MyOrders';
import AllProperty from '../components/allProperty/AllProperty';
import WishList from '../components/Dashboard/Sidebar/Menu/WishList';
import Offer from '../components/Dashboard/Sidebar/Menu/Offer';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/property/:id',
        element: <PlantDetails />,
      },
      {
        path: '/all-property',
        element: <PrivateRoute><AllProperty /></PrivateRoute>
      }
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-property',
        element: (
          <PrivateRoute>
            <AddPlant />
          </PrivateRoute>
        ),
      },
      {
        path: 'wish-list',
        element: (
          <PrivateRoute>
            <WishList />
          </PrivateRoute>
        ),
      },
      {
        path: 'offer/:id',
        element: (
          <PrivateRoute>
            <Offer />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-inventory',
        element: (
          <PrivateRoute>
            <MyInventory />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: <ManageOrders />,
      },
    ],
  },
]);
