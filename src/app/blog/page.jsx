import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';
import Image from 'next/image';
import { Rating } from '@mui/material';
import { RiShoppingCartFill } from 'react-icons/ri';
import { FaHeart } from 'react-icons/fa';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import SectionTitle from '@/components/SectionTitle';

const blog = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='pt-28 lg:pt-36 px-4 lg:px-20'>
                <div className='lg:flex justify-between gap-8'>
                    <Carousel className="border-2 rounded-lg lg:px-20 lg:w-1/2">
                        <CarouselContent>
                            <CarouselItem>
                                <Image width={500} height={300} alt="Mushroom" src="https://i.ibb.co.com/tHHPKSh/mushroom.png" ></Image>
                            </CarouselItem>
                            <CarouselItem>
                                <Image width={500} height={300} alt="Mushroom" src="https://i.ibb.co.com/bJX4JNT/16-2.jpg" ></Image>
                            </CarouselItem>
                            <CarouselItem>
                                <Image width={500} height={300} alt="Mushroom" src="https://i.ibb.co.com/WtMWzDf/16-4.jpg" ></Image>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                    <div className='lg:w-1/2 mt-8 lg:mt-0'>
                        <button className='text-[#749B3F] font-semibold bg-[#749B3F1A] px-4 py-1 rounded-2xl'>Fruits</button>
                        <h1 className='text-[#212337] text-2xl lg:text-4xl font-bold my-3'>Mushroom</h1>
                        <div className='flex items-center'><Rating value={5} /><span className='text-xl font-bold'>5.0 <span className='text-sm'>(1 review)</span></span></div>
                        <p className='text-[#FF6A1A] font-bold text-2xl my-3'>$60/kg</p>
                        <p className='text-[#4A4A52]'>From our farm directly to your door, our fresh coconuts are harvested at the peak of ripeness, offering you a sweet, hydrating treat full of flavor. Packed with natural nutrients, coconut is perfect for a variety of culinary uses, from smoothies to savory dishes, or even for a refreshing drink straight from the shell.</p>

                        <div className='font-bold my-6'>Quantity <span className='border-[1px] p-2 ml-4'>-</span><span className='border-y-[1px] p-2'>1</span><span className='border-[1px] p-2 mr-4'>+</span>/kg</div>

                        <div className='lg:flex items-center gap-8 mt-3'>
                            <button className='flex justify-center items-center gap-2 border-2 rounded-lg px-4 py-2 text-sm lg:text-lg bg-[#F4F6F6] text-black hover:bg-[#F4F6F680] w-full'><FaHeart />Favorites</button>
                            <button className='flex justify-center items-center gap-2 rounded-lg px-4 py-2 text-sm lg:text-lg border-none bg-[#FF6A1A] text-white hover:bg-[#FF6A1A80] w-full mt-6 lg:mt-0'><RiShoppingCartFill />Add to cart</button>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-2 lg:gap-4 mt-20'>
                    <button className='text-[#A6A6A6] border-2 border-[#A6A6A6] rounded-lg px-2 lg:px-4 py-1 hover:bg-[#749B3F] hover:border-none hover:text-white'>Description</button>
                    <button className='text-[#A6A6A6] border-2 border-[#A6A6A6] rounded-lg px-2 lg:px-4 py-1 hover:bg-[#749B3F] hover:border-none hover:text-white'>Reviews (1)</button>
                </div>
                <div className='text-[#4A4A52] bg-[#F4F6F6] rounded-lg p-8 mt-8 lg:w-2/3'>
                    <p>Our coconuts are sustainably grown, ensuring the best quality and taste. Each coconut is handpicked and carefully prepared, offering you the freshest product possible. Rich in healthy fats, electrolytes, and essential nutrients, coconuts provide both hydration and nourishment. Whether you are using the water, flesh, or milk, our coconuts bring versatility to your kitchen while supporting healthy living.

                        Perfect for smoothies, desserts, curries, and more — let the natural sweetness of the coconut elevate your recipes. Enjoy the tropical goodness in its purest form, directly from nature.</p>
                </div>
                <div className='mt-24'>
                    <SectionTitle tag="Our Products" title="Related products" description="We pride ourselves on offering a wide variety of fresh and flavorful fruits, vegetables, and salad ingredients." />
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8 px-4 lg:px-0 mt-4'>
                        {
                            products.map((product, index) => (
                                <div key={index} className='shadow-xl rounded-lg space-y-1 p-4'>
                                    <div className='flex justify-center items-center bg-[#F4F6F6] rounded-lg'>
                                        <Image width={200} height={200} alt={product.foodTitle} src={product.image}></Image>
                                    </div>
                                    <h1 className='text-center text-[#212337] font-bold'>{product.foodTitle}</h1>
                                    <p className='text-center text-[#4A4A52]'>${product.price}/kg</p>
                                    <div className='flex justify-center items-center'>
                                        <button className='border-2 rounded-lg px-4 py-2 text-sm lg:text-base hover:border-none hover:bg-[#FF6A1A] hover:text-white'>Add to cart</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default blog;

const products = [
    {
        id: 1,
        image: "https://i.ibb.co.com/tHHPKSh/mushroom.png",
        foodTitle: "Mushroom",
        price: 50
    },
    {
        id: 2,
        image: "https://i.ibb.co.com/bJX4JNT/16-2.jpg",
        foodTitle: "Mustard",
        price: 50
    },
    {
        id: 3,
        image: "https://i.ibb.co.com/bBSVdCx/16-3.jpg",
        foodTitle: "Orange",
        price: 50
    },
    {
        id: 4,
        image: "https://i.ibb.co.com/WtMWzDf/16-4.jpg",
        foodTitle: "Pomegranate",
        price: 50
    },
]