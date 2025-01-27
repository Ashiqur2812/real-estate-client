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
import PropertyBought from '../components/Dashboard/Sidebar/Menu/PropertyBought';
import MyReviews from '../components/Dashboard/Sidebar/Menu/MyReview';
import AgentProfile from '../components/Dashboard/Sidebar/Menu/AgentProfile';
import AgentRoute from './AgentRoute';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
import MyAddedProperties from '../pages/Dashboard/Seller/MyAddedProperties';
import UpdateProperty from '../pages/Dashboard/Seller/UpdateProperty';

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
        element: <PrivateRoute><PlantDetails /></PrivateRoute>,
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
            <AgentRoute>
              <AddPlant />
            </AgentRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'wish-list',
        element: (
          <PrivateRoute>
            <UserRoute>
              <WishList />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-review',
        element: (
          <PrivateRoute>
            <UserRoute>
              <MyReviews />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'offer/:id',
        element: (
          <PrivateRoute>
            <UserRoute>
              <Offer />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'property-bought',
        element: (
          <PrivateRoute>
            <UserRoute>
              <PropertyBought />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-inventory',
        element: (
          <PrivateRoute>
            <AgentRoute>
              <MyInventory />
            </AgentRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'update-property/:id',
        element: (
          <PrivateRoute>
            <AgentRoute>
              <UpdateProperty />
            </AgentRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <UserRoute>
              <Profile />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'agent-profile',
        element: (
          <PrivateRoute>
            <AgentRoute>
              <AgentProfile />
            </AgentRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <AgentRoute>
              <MyOrders />
            </AgentRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-added-properties',
        element: (
          <PrivateRoute>
            <AgentRoute>
              <MyAddedProperties />
            </AgentRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: <AdminRoute>
          <ManageOrders />
        </AdminRoute>,
      },
    ],
  },
]);
