import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Container from '../Shared/Container';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Card from '../Home/Card';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllProperty = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('asc'); // Default sorting: Ascending

    const { data: properties = [], isLoading, refetch } = useQuery({
        queryKey: ['property', search, sort],
        queryFn: async () => {
            const { data } = await axiosSecure(`/search-sort?search=${search}&sort=${sort}`);
            console.log(data);
            return data;
        }
    });

    // if (isLoading) return <LoadingSpinner />;

    return (
        <div className='my-12'>
            <Container>
                <h2 className='text-4xl font-bold text-center mt-10 text-black'>All Properties</h2>

                {/* Search and Sort Controls */}
                <div className='flex flex-col md:flex-row justify-between items-center gap-4 mt-6'>
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search by location..."
                        className="px-4 py-2 border rounded-md w-full md:w-1/3"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            refetch();
                        }}
                    />

                    {/* Sort Dropdown */}
                    <select
                        className="px-4 py-2 border rounded-md w-full md:w-1/4"
                        value={sort}
                        onChange={(e) => {
                            setSort(e.target.value);
                            refetch();
                        }}
                    >
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>

                {/* Property Grid */}
                {
                    properties.length > 0 ? (
                        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                            {properties.map(property => <Card key={property._id} property={property} />)}
                        </div>
                    ) : (
                        <p className='text-3xl font-bold text-center'>No Data Available</p>
                    )
                }
            </Container>
        </div>
    );
};

export default AllProperty;
