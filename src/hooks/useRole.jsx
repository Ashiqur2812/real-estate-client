import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    // console.log(user);

    const { data: role = [], isLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/role/${user?.email}`);
            // console.log(data.role);
            return data.role
        }
    });
    // console.log(role);
    return [role, isLoading];
};

export default useRole;