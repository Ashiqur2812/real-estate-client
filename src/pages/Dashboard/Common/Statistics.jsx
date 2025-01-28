import { Helmet } from 'react-helmet-async'
// import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { Navigate } from 'react-router-dom';

const Statistics = () => {
  const [role,isLoading] = useRole()
  if(isLoading) return <LoadingSpinner/>
  if (role === 'user') return <Navigate to='/dashboard/profile' />;
  if (role === 'agent') return <Navigate to='/dashboard/agent-profile' />

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {/* {role === 'admin' && <AdminStatistics />} */}
    </div>
  )
}

export default Statistics
