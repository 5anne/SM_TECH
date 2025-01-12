"use client"
import React, { useEffect, useState } from 'react';
import SectionTitle from './SectionTitle';
import Image from 'next/image';
import leaf2 from "../images/leaf2.jpg";
import Link from 'next/link';

const FreshProducts = () => {

    const [displayProducts, setDisplayProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`/api/v1/category`);
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
        <div className='mt-24'>
            <div className='flex justify-evenly'>
                <Image width={150} height={100} alt='Leaf' src={leaf2} className='w-10 lg:w-28 h-10 lg:h-28'></Image>
                <SectionTitle tag="Our Products" title="Our Fresh Products" description="We pride ourselves on offering a wide variety of fresh and flavorful fruits, vegetables, and salad ingredients." />
                <Image width={150} height={100} alt='Leaf' src={leaf2} className='w-10 lg:w-28 h-10 lg:h-28'></Image>
            </div>
            <div onClick={handleFilter} className='flex justify-center items-center gap-2 lg:gap-4 my-8'>
                <button value="ALL" className='text-[#A6A6A6] border-2 border-[#A6A6A6] rounded-lg px-2 lg:px-4 py-1 hover:bg-[#749B3F] hover:border-none hover:text-white'>All</button>
                <button value="FRUITS" className='text-[#A6A6A6] border-2 border-[#A6A6A6] rounded-lg px-2 lg:px-4 py-1 hover:bg-[#749B3F] hover:border-none hover:text-white'>Fruits</button>
                <button value="VEGETABLES" className='text-[#A6A6A6] border-2 border-[#A6A6A6] rounded-lg px-2 lg:px-4 py-1 hover:bg-[#749B3F] hover:border-none hover:text-white'>Vegetables</button>
                <button value="SALAD" className='text-[#A6A6A6] border-2 border-[#A6A6A6] rounded-lg px-2 lg:px-4 py-1 hover:bg-[#749B3F] hover:border-none hover:text-white'>Salad</button>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8 px-4 lg:px-0'>
                {
                    displayProducts?.map((product, index) => (
                        <div key={index} className='shadow-xl rounded-lg space-y-1 p-4'>
                            <div className='flex justify-center items-center bg-[#F4F6F6] rounded-lg'>
                                <Image width={200} height={200} alt={product?.productName} src={product?.image}></Image>
                            </div>
                            <h1 className='text-center text-[#212337] font-bold'>{product?.productName}</h1>
                            <p className='text-center text-[#4A4A52]'>${product?.price}/kg</p>
                            <div className='flex justify-center items-center'>
                                <button className='border-2 rounded-lg px-4 py-2 text-sm lg:text-base hover:border-none hover:bg-[#FF6A1A] hover:text-white'>Add to cart</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='flex justify-center items-center mt-8'>
                <Link href="/shop"><button className='border-2 border-[#FF6A1A] rounded-lg text-[#FF6A1A] font-bold px-4 py-2 hover:bg-[#FF6A1A80] hover:text-white'>See All Products</button></Link>
            </div>
        </div>
    );
};

export default FreshProducts;