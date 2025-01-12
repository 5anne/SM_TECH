import Link from 'next/link';
import React from 'react';
import { HiUsers } from "react-icons/hi2";
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';

const Sidebar = ({ userData }) => {

    return (
        <div className='flex flex-col justify-center mt-48 fixed z-10'>
            <div className='bg-[#749B3F80] w-14 h-48 rounded-3xl flex flex-col justify-center items-center gap-8'>
                <Link href={`/profile/${userData?.email}/allUsers`} className='text-xl border-2 rounded-full p-2 mx-2 tooltip tooltip-right' data-tip="All Users"><HiUsers /></Link>
                <Link href={`/profile/${userData?.email}/allProducts`} className='text-xl border-2 rounded-full p-2 mx-2 tooltip tooltip-right' data-tip="All Products"><MdOutlineProductionQuantityLimits /></Link>
            </div>
        </div>
    );
};

export default Sidebar;