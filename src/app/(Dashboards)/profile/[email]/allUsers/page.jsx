"use client"
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/v1/users`,
                    {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const data = await response.json();
                if (data?.success) {
                    setUsers(data?.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchUsers();
    }, [])

    return (
        <div className='pt-36 px-20'>
            <Sidebar />
            <div>
                <h2 className="text-2xl text-center font-bold mb-8 border-b-2 border-green-700 pb-4 w-1/5 mx-auto uppercase">All Users</h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>User Name</th>
                                <th>Full Name</th>
                                <th>Phone Number</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                users?.map((user, idx) => (
                                    <tr key={idx}>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <Image width={20} height={20} alt='User Image' src={user.profileImage} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user.userName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {user.fullName}
                                            <br />
                                            <span className="badge badge-ghost badge-sm">{user.email}</span>
                                        </td>
                                        <td>{user.phoneNumber}</td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs">{user.role}</button>
                                        </th>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;