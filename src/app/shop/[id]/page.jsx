"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import { FaHeart } from 'react-icons/fa';
import { RiShoppingCartFill } from 'react-icons/ri';
import { useParams } from 'next/navigation';

const Page = () => {
    const id = useParams();
    const _id = id?.id;
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`/api/v1/category/${_id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
                );
                const data = await response.json();
                if (data?.success) {
                    setProduct(data?.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, [_id])

    return (
        <>
            <div className='lg:flex justify-between gap-8 pt-36 px-4 lg:px-20'>
                <Image width={300} height={300} alt="Fruits" src={product?.image} className='lg:w-1/2 lg:h-[400px] border-2 rounded-lg lg:px-20'></Image>
                <div className='lg:w-1/2 mt-8 lg:mt-0'>
                    <button className='text-[#749B3F] font-semibold bg-[#749B3F1A] px-4 py-1 rounded-2xl'>Fruits</button>
                    <h1 className='text-[#212337] text-2xl lg:text-4xl font-bold my-3'>{product?.productName}</h1>
                    <div className='flex items-center'><Rating value={5} /><span className='text-xl font-bold'>5.0 <span className='text-sm'>(1 review)</span></span></div>
                    <p className='text-[#FF6A1A] font-bold text-2xl my-3'>${product?.price}/kg</p>
                    <p className='text-[#4A4A52]'>{product?.description}</p>

                    <div className='font-bold my-4'>Quantity <span className='border-[1px] p-2 ml-4'>-</span><span className='border-y-[1px] p-2'>1</span><span className='border-[1px] p-2 mr-4'>+</span>/kg</div>

                    <div className='flex items-center gap-8 mt-3'>
                        <button className='flex items-center gap-2 border-2 rounded-lg px-4 py-2 text-sm lg:text-lg bg-[#F4F6F6] text-black hover:bg-[#F4F6F680]'><FaHeart />Favorites</button>
                        <button className='flex items-center gap-2 rounded-lg px-4 py-2 text-sm lg:text-lg border-none bg-[#FF6A1A] text-white hover:bg-[#FF6A1A80]'><RiShoppingCartFill />Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;