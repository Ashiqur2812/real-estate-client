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
      console.log(data);
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
      console.log(error);
      console.log(error);
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
      console.log(res.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User is now an agent",
        showConfirmButton: false,
        timer: 3000
      });
      refetch();
    } catch (error) {
      console.log(error);
      console.log(error);
      Swal.fire({
        title: `${error?.message}`,
        icon: "error",
        draggable: true
      });
    }
  };

  const markAsFraud = async (id) => {
    try {
      const res = await axiosSecure.patch(`/make-fraud/${id}`);
      console.log(res.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User is now marked as fraud",
        showConfirmButton: false,
        timer: 3000
      });
      refetch();
    } catch (error) {
      console.log(error);
      console.log(error);
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
      console.log(response.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `User with email ${email} has been deleted.`,
        showConfirmButton: false,
        timer: 3000
      });
      refetch();
    } catch (error) {
      console.log(error);
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
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Manage Users</h1>
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="table-auto w-full border-collapse border border-gray-300 bg-white">
            <thead>
              <tr className="bg-slate-500 text-white">
                <th className="border border-gray-300 px-6 py-3 text-lg">Name</th>
                <th className="border border-gray-300 px-6 py-3 text-lg">Email</th>
                <th className="border border-gray-300 px-6 py-3 text-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="text-center hover:bg-gray-100">
                  <td className="border border-gray-300 px-6 py-4 text-gray-700 font-medium break-words">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700 font-medium break-words">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-6 py-4">
                    {user.role !== "fraud" && (
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          onClick={() => makeAdmin(user._id)}
                          className={`px-4 py-2 rounded-lg text-white font-semibold transition-transform transform hover:scale-105 shadow-md ${user.role === "admin"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600"
                            }`}
                          disabled={user.role === "admin"}
                        >
                          Make Admin
                        </button>
                        <button
                          onClick={() => makeAgent(user._id)}
                          className={`px-4 py-2 rounded-lg text-white font-semibold transition-transform transform hover:scale-105 shadow-md ${user.role === "agent"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            }`}
                          disabled={user.role === "agent"}
                        >
                          Make Agent
                        </button>
                      </div>
                    )}
                    {user.role === "agent" && user.role !== "fraud" && (
                      <button
                        onClick={() => markAsFraud(user._id)}
                        className="mt-2 px-4 py-2 rounded-lg text-white font-semibold bg-yellow-500 hover:bg-yellow-600 transition-transform transform hover:scale-105 shadow-md"
                      >
                        Mark as Fraud
                      </button>
                    )}
                    <button
                      onClick={() => deleteUser(user._id, user.email)}
                      className="mt-2 px-4 py-2 rounded-lg text-white font-semibold bg-red-500 hover:bg-red-600 transition-transform transform hover:scale-105 shadow-md"
                    >
                      Delete User
                    </button>
                    {user.role === "fraud" && (
                      <p className="mt-2 text-red-600 font-bold">Fraud</p>
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
