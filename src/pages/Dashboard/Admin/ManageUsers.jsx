import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axiosSecure('/users');
      // console.log(data);
      return data;
    }
  });

  if (isLoading) return <LoadingSpinner />;

  const makeAdmin = async (id) => {
    try {
      const res = await axiosSecure.patch(`/make-admin/${id}`);
      console.log(res.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User is now an admin",
        showConfirmButton: false,
        timer: 3000
      });
      refetch();
    } catch (error) {
      // console.log(error);
      Swal.fire({
        title: `${error?.message}`,
        icon: "error",
        draggable: true
      });
    }
  };

  const makeAgent = async (id) => {
    try {
      const res = await axiosSecure.patch(`/make-agent/${id}`);
      // console.log(res.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User is now an agent",
        showConfirmButton: false,
        timer: 3000
      });
      refetch();
    } catch (error) {
      // console.log(error);
      Swal.fire({
        title: `${error?.message}`,
        icon: "error",
        draggable: true
      });
    }
  };

  const markAsFraud = async (id) => {
    // console.log(id)
    try {
      const res = await axiosSecure.patch(`/make-fraud/${id}`);
      // console.log(res.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User is now marked as fraud",
        showConfirmButton: false,
        timer: 3000
      });
      refetch();
    } catch (error) {
      // console.log(error);
      Swal.fire({
        title: `${error?.message}`,
        icon: "error",
        draggable: true
      });
    }
  };

  const deleteUser = async (id, email) => {
    try {
      const response = await axiosSecure(`/users/${id}`);
      // console.log(response.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `User with email ${email} has been deleted.`,
        showConfirmButton: false,
        timer: 3000
      });
      refetch();
    } catch (error) {
      // console.log(error);
      Swal.fire({
        title: `${error?.message}`,
        icon: "error",
        draggable: true
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Users</title>
      </Helmet>
      <div className="container mx-auto my-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 text-gray-800 animate__animated animate__fadeInDown">
          Manage Users
        </h1>
        <div className="overflow-x-auto shadow-2xl rounded-xl bg-opacity-80 backdrop-blur-lg">
          <table className="w-full border-collapse bg-gradient-to-br from-gray-100 to-white shadow-xl rounded-xl animate__animated animate__fadeIn">
            <thead>
              <tr className="bg-gradient-to-r from-cyan-600 to-teal-700 text-white rounded-t-lg">
                <th className="px-4 sm:px-6 py-4 text-md sm:text-lg font-semibold tracking-wide text-left">Name</th>
                <th className="px-4 sm:px-6 py-4 text-md sm:text-lg font-semibold tracking-wide text-left">Email</th>
                <th className="px-4 sm:px-6 py-4 text-md sm:text-lg font-semibold tracking-wide text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`hover:bg-blue-100 transition-all duration-300 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                >
                  <td className="px-4 sm:px-6 py-4 text-gray-700 font-medium break-words">{user.name}</td>
                  <td className="px-4 sm:px-6 py-4 text-gray-700 font-medium break-words">{user.email}</td>
                  <td className="px-4 sm:px-6 py-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                    {user.role !== "fraud" && (
                      <>
                        <button
                          onClick={() => makeAdmin(user._id)}
                          className={`px-3 sm:px-4 py-2 rounded-lg text-white font-semibold shadow-md transition-transform transform hover:scale-105 ${user.role === "admin"
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-green-500 hover:bg-green-600"
                            }`}
                          disabled={user.role === "admin"}
                        >
                          Make Admin
                        </button>
                        <button
                          onClick={() => makeAgent(user._id)}
                          className={`px-3 sm:px-4 py-2 rounded-lg text-white font-semibold shadow-md transition-transform transform hover:scale-105 ${user.role === "agent"
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600"
                            }`}
                          disabled={user.role === "agent"}
                        >
                          Make Agent
                        </button>
                      </>
                    )}
                    {user?.role === "agent" && user?.role !== "fraud" && (
                      <button
                        onClick={() => markAsFraud(user._id)}
                        className="px-3 sm:px-4 py-2 rounded-lg text-white font-semibold bg-yellow-500 hover:bg-yellow-600 shadow-md transition-transform transform hover:scale-105"
                      >
                        Mark as Fraud
                      </button>
                    )}
                    <button
                      onClick={() => deleteUser(user._id, user.email)}
                      className="px-3 sm:px-4 py-2 rounded-lg text-white font-semibold bg-rose-500 hover:bg-rose-600 shadow-md transition-transform transform hover:scale-105"
                    >
                      Delete User
                    </button>
                    {user.role === "fraud" && (
                      <p className="mt-2 text-rose-600 font-bold animate__animated animate__flash">
                        Fraud
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
