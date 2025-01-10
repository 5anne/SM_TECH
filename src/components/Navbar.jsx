"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import logo from "../images/logo.png";
import { FaBars, FaHeart } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";
import LogOut from './ui/LogOut';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import userImg from "../images/user.jpg";

const Navbar = ({ session }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
    const email = session?.user?.email;

    return (
        <div className='navbar flex justify-evenly items-center bg-[#749B3F80] h-20 fixed z-10 w-screen'>
            <Link
                href='/'
                rel='noopener noreferrer'
                aria-label='Back to homepage'
                className='flex items-center gap-2 p-2'
            >
                <Image width={40} height={40} alt='Logo' src={logo} className='w-8 lg:w-10'></Image>
                <h2 className='text-xl lg:text-3xl text-[#212337] font-bold'>
                    Fresh Harvests
                </h2>
            </Link>
            <ul className='items-stretch hidden space-x-3 font-medium text-[#212337CC] lg:flex'>
                <li className='flex '>
                    <Link
                        rel='noopener noreferrer'
                        href='/'
                        className='flex items-center px-4 -mb-1 hover:underline'
                    >
                        Home
                    </Link>
                </li>
                <li className='flex'>
                    <Link
                        rel='noopener noreferrer'
                        href='/shop'
                        className='flex items-center px-4 -mb-1 hover:underline'
                    >
                        Shop
                    </Link>
                </li>
                <li className='flex'>
                    <Link
                        rel='noopener noreferrer'
                        href='/about'
                        className='flex items-center px-4 -mb-1 hover:underline'
                    >
                        About Us
                    </Link>
                </li>
                <li className='flex'>
                    <Link
                        rel='noopener noreferrer'
                        href='/blog'
                        className='flex items-center px-4 -mb-1 hover:underline'
                    >
                        Blog
                    </Link>
                </li>
            </ul>
            <div className='flex items-center gap-4 text-[#FFFFFF]'>
                <button className='hidden lg:flex items-center gap-2'><FaHeart />Favorites</button>
                <button className='flex items-center gap-2 ml-10 lg:ml-0'><RiShoppingCartFill /><span className='hidden lg:flex'>Cart</span></button>

                {
                    session?.user ?
                        <div className='flex items-center gap-4'>
                            {session?.user?.image ?
                                <Image height={35} width={35} alt={session?.user?.name} src={session?.user?.image} className='rounded-full' />
                                :
                                <Image height={35} width={35} alt="User" src={userImg} className='rounded-full' />
                            }
                            <LogOut />
                        </div>
                        :
                        <button className='border-[1px] rounded-lg px-4 py-2 hover:bg-[#FF6A1A]' onClick={() => document.getElementById('my_modal_3').showModal()}>Sign In</button>
                }
                {
                    isLoginModalOpen ?
                        <LoginModal toggleModal={() => setIsLoginModalOpen(false)} /> : <RegisterModal toggleModal={() => setIsLoginModalOpen(true)} />
                }
            </div>
            <Link href={`/profile/${email}`}><FaBars /></Link>
            <div className='dropdown dropdown-end lg:hidden'>
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-28 p-2 shadow">
                    <li className='flex '>
                        <Link
                            rel='noopener noreferrer'
                            href='/'
                            className='flex items-center px-4 -mb-1 hover:underline'
                        >
                            Home
                        </Link>
                    </li>
                    <li className='flex '>
                        <Link
                            rel='noopener noreferrer'
                            href='/shop'
                            className='flex items-center px-4 -mb-1 hover:underline'
                        >
                            Shop
                        </Link>
                    </li>
                    <li className='flex '>
                        <Link
                            rel='noopener noreferrer'
                            href='/about'
                            className='flex items-center px-4 -mb-1 hover:underline'
                        >
                            About Us
                        </Link>
                    </li>
                    <li className='flex '>
                        <Link
                            rel='noopener noreferrer'
                            href='/blog'
                            className='flex items-center px-4 -mb-1 hover:underline'
                        >
                            Blog
                        </Link>
                    </li>
                    {
                        session?.user ?
                            <div className='flex items-center gap-4'>
                                {session?.user?.image ?
                                    <Image height={35} width={35} alt={session?.user?.name} src={session?.user?.image} className='rounded-full' /> :
                                    <Image height={35} width={35} alt="User" src={userImg} className='rounded-full' />
                                }
                                <LogOut />
                            </div>
                            :
                            <button className='border-[1px] rounded-lg px-4 py-2 hover:bg-[#FF6A1A]' onClick={() => document.getElementById('my_modal_3').showModal()}>Sign In</button>
                    }
                    {
                        isLoginModalOpen ?
                            <LoginModal /> : <RegisterModal />
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;