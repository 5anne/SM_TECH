import Image from 'next/image';
import React from 'react';
import arrow from "../images/arrow.png";
import freshSalad from "../images/fresh-salad.png";
import appStore from "../images/appstore.png";
import googlePlay from "../images/googleplay.png";

const Banner = () => {
    return (
        <div className="bg-no-repeat bg-cover bg-center px-4 lg:px-32 pt-32 lg:pt-44 pb-10" style={{ backgroundImage: "url(https://i.postimg.cc/0QyXP9c9/Bg-1.png)" }}>
            <div className='lg:w-2/3 space-y-6'>
                <button className='text-[#749B3F] font-semibold bg-[#749B3F1A] text-sm lg:text-base px-4 py-1 rounded-2xl'>Welcome to Fresh Harvest</button>
                <h1 className='font-bold text-4xl lg:text-7xl text-[#212337]'>Fresh Fruits <br />and Vegetables</h1>
                <p className='text-[#4A4A52] text-sm lg:text-base lg:w-10/12'>At Fresh Harvests, we are passionate about providing you with the freshest and most flavorful fruits and vegetables</p>
                <button className='font-bold text-[#FFFFFF] bg-[#FF6A1A] rounded-lg px-4 py-2'>Shop Now</button>
                <div className='flex gap-8 lg:pl-20'>
                    <Image width={40} height={40} alt='Arrow' src={arrow} className='hidden lg:flex w-10 h-10'></Image>
                    <div className='flex items-center gap-2 bg-[#EBEBEB] rounded-lg p-6'>
                        <div className='font-bold lg:leading-relaxed'>
                            <p className='text-[#176D38]'>Special Offer</p>
                            <h1 className='text-[#212337] text-xl lg:text-3xl'>Fresh Salad</h1>
                            <p className='text-[#212337]'><span className='text-[#176D38]'>Up to</span> <span className='text-xl lg:text-2xl'>70%</span> off</p>
                            <button className='bg-[#176D38] text-[#FFFFFF] text-sm lg:text-lg rounded-2xl px-2 lg:px-4 py-1 mt-2'>CODE : <span className='text-[#FAC614]'>FRESH25</span></button>
                        </div>
                        <Image width={150} height={150} alt='Fresh Salad' src={freshSalad} className='w-24 lg:w-28 h-24 lg:h-28'></Image>
                    </div>
                </div>
                <div>
                    <p>Download App:</p>
                    <div className='flex items-center gap-4 mt-4'>
                        <Image width={150} height={150} alt='App Store' src={appStore}></Image>
                        <Image width={150} height={150} alt='Google Play' src={googlePlay}></Image>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;