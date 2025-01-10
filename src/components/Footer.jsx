import React from 'react';
import { FaPhone } from 'react-icons/fa';
import { MdOutlineEmail } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import Image from 'next/image';
import logo from "../images/logo.png"
import Link from 'next/link';
import appStore from "../images/appstore.png";
import googlePlay from "../images/googleplay.png";
import visa from "../images/Visa.jpg";
import payPal from "../images/Paypal.jpg";
import applePay from "../images/ApplePay.jpg";

const Footer = () => {
    return (
        <>
            <footer className="footer bg-base-200 text-base-content px-4 lg:px-10 pt-10 mt-24">
                <aside>
                    <Link
                        href='/'
                        rel='noopener noreferrer'
                        aria-label='Back to homepage'
                        className='flex items-center gap-2 p-2'
                    >
                        <Image width={40} height={40} alt='Fresh Harvests' src={logo}></Image>
                        <h2 className='text-2xl lg:text-3xl text-[#212337] font-bold'>
                            Fresh Harvests
                        </h2>
                    </Link>
                </aside>
                <nav>
                    <h6 className="footer-title text-black">Quick links 1</h6>
                    <a className="link link-hover">Home</a>
                    <a className="link link-hover">Shop</a>
                    <a className="link link-hover">Blog</a>
                    <a className="link link-hover">Detail Blog</a>
                </nav>
                <nav>
                    <h6 className="footer-title text-black">Quick links 2</h6>
                    <a className="link link-hover">Favorites</a>
                    <a className="link link-hover">Cart</a>
                    <a className="link link-hover">Sign In</a>
                    <a className="link link-hover">Register</a>
                </nav>
                <nav>
                    <h6 className="footer-title text-black">Contact us</h6>
                    <a className="link link-hover flex items-center gap-1"><span className='text-[#749B3F]'><FaPhone /></span>1234 5678 90</a>
                    <a className="link link-hover flex items-center gap-1"><span className='text-[#749B3F]'><MdOutlineEmail /></span>Freshharvests@gmail.com</a>
                    <a className="link link-hover flex items-center gap-1"><span className='text-[#749B3F]'><LuMapPin /></span>Tanjung Sari Street, Pontianak, Indonesia</a>
                </nav>
            </footer>
            <div className='flex flex-col-reverse lg:flex-row lg:gap-[550px] bg-base-200 text-base-content px-10 pb-8'>
                <div className='mt-8 lg:mt-0'>
                    <p className='font-semibold'>Download App:</p>
                    <div className='flex items-center gap-4 mt-4'>
                        <Image width={150} height={150} alt='App Store' src={appStore}></Image>
                        <Image width={150} height={150} alt='Google Play' src={googlePlay}></Image>
                    </div>
                </div>
                <div className='mt-8 lg:mt-0'>
                    <p className='font-semibold'>Accepted Payment Methods:</p>
                    <div className='flex items-center gap-4 mt-4'>
                        <Image width={65} height={50} alt='App Store' src={visa}></Image>
                        <Image width={65} height={50} alt='Google Play' src={payPal}></Image>
                        <Image width={65} height={50} alt='Google Play' src={applePay}></Image>
                    </div>
                </div>
            </div>
            <footer className="footer footer-center flex flex-col-reverse lg:flex-row lg:gap-[700px] bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
                <aside className="grid-flow-col items-center font-semibold text-center">
                    <p>© Copyright 2024, All Rights Reserved by Banana Studio</p>
                </aside>
                <nav className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4 mt-4 lg:mt-0">
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                    </div>
                </nav>
            </footer>
        </>
    );
};

export default Footer;