import Card from './Card';
import Container from '../Shared/Container';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Plants = () => {
  const axiosSecure = useAxiosSecure();
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['property'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-properties`);
      console.log(data);
      return data;
    }
  });
  console.log(properties);
  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <h2 className='text-4xl font-bold text-center mt-10 text-black'>Advertisement</h2>
      {
        properties && properties.length > 0 ? <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12'>
          {
            properties.slice(0, 4).map(property => <Card key={property._id} property={property} />)
          }
        </div>
          :
          <p className='text-3xl font-bold text-center'>
            No Data Available
          </p>
      }
    </Container>
  );
};

export default Plants;
