"use client"
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';

const Profile = ({ params }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { email } = await params;
                const response = await fetch(`https://fresh-harvests-beta.vercel.app/api/v1/users/${decodeURIComponent(email)}`);
                const data = await response.json();
                setUserData(data?.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [params]);

    if (loading) {
        return <div className='pt-44'><p className="text-center text-red-700 text-2xl">Loading...</p></div>;
    }

    if (!userData) {
        return <div className='pt-44'><p className="text-center text-red-700 text-2xl">User not found!</p></div>;
    }

    return (
        <>
            <div className='flex'>
                <Sidebar userData={userData} />
                <div className="container mx-auto pt-32 px-4">
                    <h2 className="text-2xl text-center font-bold mb-8 border-b-2 border-green-700 pb-4 w-1/5 mx-auto">User Profile</h2>
                    <div className='bg-slate-100 mx-20'>
                        <div className='flex justify-center items-center gap-10 pt-8'>
                            <div className='w-1/2 flex justify-end items-center'>
                                <Image width={200} height={200} alt={userData.userName} src={userData.profileImage} />
                            </div>
                            <div className="p-6 w-1/2">
                                <ul className="list-none">
                                    <li className="flex items-center mb-2">
                                        <span className="font-semibold">User Name:</span>
                                        <span className="ml-2">{userData.userName}</span>
                                    </li>
                                    <li className="flex items-center mb-2">
                                        <span className="font-semibold">Full Name:</span>
                                        <span className="ml-2">{userData.fullName}</span>
                                    </li>
                                    <li className="flex items-center mb-2">
                                        <span className="font-semibold">Email:</span>
                                        <span className="ml-2">{userData.email}</span>
                                    </li>
                                    <li className="flex items-center mb-2">
                                        <span className="font-semibold">Role:</span>
                                        <span className="ml-2">{userData.role}</span>
                                    </li>
                                    <li className="flex items-center mb-2">
                                        <span className="font-semibold">Phone Number:</span>
                                        <span className="ml-2">{userData.phoneNumber}</span>
                                    </li>
                                    <li className="flex items-center mb-2">
                                        <span className="font-semibold">Created At:</span>
                                        <span className="ml-2">{new Date(userData.createdAt).toLocaleString()}</span>
                                    </li>
                                    <li className="flex items-center mb-2">
                                        <span className="font-semibold">Updated At:</span>
                                        <span className="ml-2">{new Date(userData.updatedAt).toLocaleString()}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <Link href={`/profile/${userData.email}/${userData._id}`}><button className="btn bg-[#15803dcc] my-8">Update Profile <FaEdit /></button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
