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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-all duration-300',
        cancelButton: 'px-6 py-2 bg-gray-500 hover:bg-gray-600 transition-all duration-300',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/users/${id}`);
          Swal.fire({
            title: 'Deleted!',
            text: 'User has been deleted.',
            icon: 'success',
            confirmButtonColor: '#10B981',
            customClass: {
              popup: 'rounded-2xl',
              confirmButton: 'px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all duration-300',
            },
          });
          refetch();
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: error.message,
            customClass: {
              popup: 'rounded-2xl',
              confirmButton: 'px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-all duration-300',
            },
          });
        }
      }
    });
  };


  return (
    <>
      <Helmet>
        <title>Luxury User Estates</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold text-center mb-12 [#313131] animate__animated animate__fadeInDown animate__delay-1s">
            🏰 User Management
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-20 animate__animated animate__fadeInUp">
            {users.map((user, index) => (
              <div key={user._id} className="relative bg-white rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border-4 border-indigo-50">
                {/* User Status Ribbon */}
                {user.role === "fraud" && (
                  <div className="absolute -top-4 -right-4 bg-red-500 text-white px-6 py-2 rotate-45 shadow-lg animate__animated animate__heartBeat animate__infinite">
                    ⚠️ Fraud
                  </div>
                )}

                {/* User Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="rounded-full bg-indigo-100 flex items-center justify-center border-4 border-indigo-200 animate__animated animate__bounceIn">
                    {user?.image ? (
                      <img src={user?.image} alt="User Image" className="w-24 h-24 object-cover rounded-full transition-all hover:scale-105 duration-300 ease-in-out" />
                    ) : (
                      <span className="text-4xl">👤</span>
                    )}
                  </div>
                </div>

                {/* User Info */}
                <div className="space-y-4 text-center">
                  <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
                    {user?.name}
                  </h2>
                  <p className="text-lg text-gray-600 font-medium">
                    📧 {user?.email}
                  </p>

                  {/* Role Badge */}
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800">
                    <span className="mr-2">🎖️</span>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {user.role !== "fraud" && (
                    <>
                      <button
                        onClick={() => makeAdmin(user._id)}
                        disabled={user.role === "admin"}
                        className={`p-3 rounded-xl flex flex-col items-center transition-all ${user.role === "admin"
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-green-100 hover:bg-green-200 hover:scale-105"
                          }`}
                      >
                        <span className="text-2xl">👑</span>
                        <span className="text-sm font-semibold text-green-800">Crown Admin</span>
                      </button>

                      <button
                        onClick={() => makeAgent(user._id)}
                        disabled={user.role === "agent"}
                        className={`p-3 rounded-xl flex flex-col items-center transition-all ${user.role === "agent"
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-100 hover:bg-blue-200 hover:scale-105"
                          }`}
                      >
                        <span className="text-2xl">🕵️</span>
                        <span className="text-sm font-semibold text-blue-800">Assign Agent</span>
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => deleteUser(user._id, user?.email)}
                    className="p-3 rounded-xl bg-red-100 hover:bg-red-200 hover:scale-105 transition-all col-span-2 flex items-center justify-center"
                  >
                    <span className="text-2xl mr-2">🗑️</span>
                    <span className="text-sm font-semibold text-red-800">Remove User</span>
                  </button>

                  {user?.role === "agent" && (
                    <button
                      onClick={() => markAsFraud(user._id)}
                      className="p-3 rounded-xl bg-yellow-100 hover:bg-yellow-200 hover:scale-105 transition-all col-span-2 flex items-center justify-center"
                    >
                      <span className="text-2xl mr-2">🕵️♂️</span>
                      <span className="text-sm font-semibold text-yellow-800">Mark as Fraud</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
