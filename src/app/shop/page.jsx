"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, MenuItem, Pagination, Stack, TextField } from '@mui/material';
import Link from 'next/link';

const Shop = () => {
    const [displayProducts, setDisplayProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`/api/v1/category`,
                    {
                        // credentials: "include",
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const data = await response.json();
                if (data?.success) {
                    setProducts(data?.data);
                    setDisplayProducts(data?.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, [])

    const handleFilter = e => {
        const filter = e.target.value;

        if (filter === 'ALL') {
            setDisplayProducts(products);
        }
        else if (filter === 'FRUITS') {
            const filteredProducts = products?.filter(product => {
                const value = product.categoryName;
                return value.toUpperCase() === filter
            });
            setDisplayProducts(filteredProducts);
        }
        else if (filter === 'VEGETABLES') {
            const filteredProducts = products?.filter(product => {
                const value = product.categoryName;
                return value.toUpperCase() === filter
            });
            setDisplayProducts(filteredProducts);
        }
        else if (filter === 'SALAD') {
            const filteredProducts = products?.filter(product => {
                const value = product.categoryName;
                return value.toUpperCase() === filter
            });
            setDisplayProducts(filteredProducts);
        }
    }

    return (
        <>
            <div className='pt-28 mb-10 flex justify-center'>
                <Box width={300}>
                    <TextField
                        label="Select Category"
                        onChange={handleFilter}
                        select
                        fullWidth
                    >
                        <MenuItem value="ALL">All</MenuItem>
                        <MenuItem value="FRUITS">Fruits</MenuItem>
                        <MenuItem value="VEGETABLES">Vegetables</MenuItem>
                        <MenuItem value="SALAD">Salad</MenuItem>
                    </TextField>
                </Box>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-8 px-4 lg:px-14 '>
                {
                    displayProducts?.map((product, index) => (
                        <div key={index} className='shadow-xl rounded-lg space-y-1 p-4'>
                            <div className='flex justify-center items-center bg-[#F4F6F6] rounded-lg'>
                                <Image width={200} height={200} alt={product?.productName} src={product?.image}></Image>
                            </div>
                            <h1 className='text-center text-[#212337] font-bold'>{product?.productName}</h1>
                            <p className='text-center text-[#4A4A52]'>${product?.price}/kg</p>
                            <div className='flex justify-between items-center gap-4'>
                                <button className='border-2 rounded-lg px-2 py-2 text-sm lg:text-base hover:border-none hover:bg-[#FF6A1A] hover:text-white'>Add to cart</button>
                                <Link href={`/shop/${product._id}`}><button className='border-2 rounded-lg px-2 py-2 text-sm lg:text-base hover:border-none hover:bg-[#FF6A1A] hover:text-white'>View Details</button></Link>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='flex justify-center mt-12'>
                <Stack spacing={2} className='flex justify-center'>
                    <Pagination count={10} color="primary" />
                </Stack>
            </div>
        </>
    );
};

export default Shop;