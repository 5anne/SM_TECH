import Image from 'next/image';
import React from 'react';
import aboutImage from "../../images/aboutImage.jpg";
import leaf from "../../images/leaf2.jpg";
import mushroom from "../../images/mushroom.png";
import logo2 from "../../images/logo2.jpg";
import pattern from "../../images/pattern.jpg";

const about = () => {
    return (
        <>
            <div className='lg:flex items-center gap-8 relative pt-32'>
                <div className='relative'>
                    <Image width={600} height={600} alt='Fresh Mushroom' src={aboutImage} className=''></Image>
                    <Image width={150} height={150} alt='Fresh Mushroom' src={logo2} className='absolute top-[66.666667%] left-[50%] w-28 lg:w-32 h-8 lg:h-10'></Image>
                    <Image width={50} height={50} alt='Fresh Mushroom' src={pattern} className='absolute top-[70%] left-[85%]'></Image>
                    <div className='shadow-xl rounded-lg space-y-1 text-xs lg:text-sm bg-white p-2 lg:p-4 lg:w-36 absolute top-[78%] left-[60%]'>
                        <div className='flex justify-center items-center bg-[#F4F6F6] rounded-lg'>
                            <Image width={60} height={60} alt='Mushroom' src={mushroom} className='w-10 lg:w-16 h-10 lg:h-16'></Image>
                        </div>
                        <h1 className='text-center text-[#212337] font-bold'>Mushroom</h1>
                        <p className='text-center text-[#4A4A52]'>$50/kg</p>
                        <div className='flex justify-center items-center'>
                            <button className='border-2 rounded-lg px-2 lg:px-4 py-1 lg:py-2 hover:border-none hover:bg-[#FF6A1A] hover:text-white'>Add to cart</button>
                        </div>
                    </div>
                </div>
                <div className='px-4 md:px-8 lg:px-0 mt-14 lg:mt-0'>
                    <Image width={120} height={100} alt='Fresh Mushroom' src={leaf} className='hidden absolute top-[5%] left-[70%] lg:left-[35%] w-16 lg:w-32 h-16 lg:h-28'></Image>
                    <button className='text-[#749B3F] font-semibold bg-[#749B3F1A] px-4 py-1 rounded-2xl'>About us</button>
                    <h1 className='text-[#212337] text-2xl lg:text-4xl font-bold my-3'>About Fresh Harvest</h1>
                    <p className='text-[#4A4A52] max-w-xl mx-auto'>Welcome to Fresh Harvest, your premier destination for high-quality and fresh produce. We are passionate about providing you with the finest fruits, vegetables, and salad ingredients to nourish your body and delight your taste buds. With a commitment to excellence, sustainability, and customer satisfaction, Fresh Harvest is here to revolutionize your grocery shopping experience.</p>
                    <button className='border-2 border-[#FF6A1A] rounded-lg text-[#FF6A1A] font-bold px-4 py-2 mt-3 hover:bg-[#FF6A1A80] hover:text-white'>Read More</button>
                </div>
            </div>
        </>
    );
};

export default about;