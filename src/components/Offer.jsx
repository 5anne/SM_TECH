import Image from 'next/image';
import React from 'react';
import fruitImg from "../images/fruits.png";
import leaf from "../images/leaf1.png";

const Offer = () => {
    return (
        <div className='flex items-center lg:pt-24'>
            <div className='bg-no-repeat bg-cover bg-center bg-gray-100 bg-blend-multiply pl-2 lg:pl-14 pt-20 h-[450px]' style={{ backgroundImage: "url(https://i.ibb.co.com/Vg5jMR2/bg2.jpg)" }}>
                <div className='flex justify-center lg:justify-start'>
                    <button className='text-[#749B3F] font-semibold bg-[#749B3F1A] px-4 py-1 rounded-2xl'>Special Offer</button>
                </div>
                <h1 className='text-[#212337] text-4xl lg:text-5xl text-center lg:text-start font-bold my-3'>Seasonal Fruit Bundle</h1>
                <h1 className='text-[#212337] text-2xl lg:text-3xl text-center lg:text-start font-bold my-3'>Discount up to <span className='text-[#FF6A1A]'>80% OFF</span></h1>
                <div className='flex items-center gap-4'>
                    <button className='bg-white rounded-lg shadow-2xl text-2xl font-bold p-6'>01 <p className='text-sm font-normal'>Days</p></button>
                    <button className='bg-white rounded-lg shadow-2xl text-2xl font-bold p-6'>01 <p className='text-sm font-normal'>Hour</p></button>
                    <button className='bg-white rounded-lg shadow-2xl text-2xl font-bold p-6'>01 <p className='text-sm font-normal'>Min</p></button>
                    <button className='bg-white rounded-lg shadow-2xl text-2xl font-bold p-6'>01 <p className='text-sm font-normal'>Sec</p></button>
                </div>
                <div className='flex justify-center lg:justify-start'>
                    <button className='bg-[#176D38] text-[#FFFFFF] font-semibold rounded-2xl px-4 py-1 mt-4'>CODE : <span className='text-[#FAC614]'>FRESH25</span></button>
                </div>
            </div>
            <div className='bg-no-repeat bg-cover bg-center bg-gray-100 bg-blend-multiply pr-2 pt-8 h-[450px]' style={{ backgroundImage: "url(https://i.ibb.co.com/Wxs96r5/bg1.jpg)" }}>
                <Image width={100} height={10} alt='Leaf' src={leaf}></Image>
                <Image width={500} height={500} alt='Fruits' src={fruitImg}></Image>
                <Image width={100} height={100} alt='Leaf' src={leaf} className='absolute left-[80%]'></Image>
            </div>
        </div>
    );
};

export default Offer;