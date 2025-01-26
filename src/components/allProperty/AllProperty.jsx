import React from 'react';
import {useQuery} from '@tanstack/react-query'
import Container from '../Shared/Container';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Card from '../Home/Card';

const AllProperty = () => {
    const { data: properties = [], isLoading } = useQuery({
        queryKey: ['property'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/property`);
            console.log(data);
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    return (
        <div className='my-12'>
            <Container>
                <h2 className='text-4xl font-bold text-center mt-10 text-black'>All Property</h2>
                {
                    properties && properties.length > 0 ? <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                        {
                            properties.map(property => <Card key={property._id} property={property} />)
                        }
                    </div>
                        :
                        <p className='text-3xl font-bold text-center'>
                            No Data Available
                        </p>
                }
            </Container>
        </div>
    );
};

export default AllProperty;