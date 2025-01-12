"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import bcrypt from "bcryptjs";
import axios from 'axios';

const image_hosting_api = 'https://api.imgbb.com/1/upload?key=515cbf2e7466e1421466864e5e87bbbe';

const UpdateProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const id = useParams();
    const _id = id?._id;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://fresh-harvests-6kzq.vercel.app/api/v1/users/updateProfile/${_id}`);
                const data = await response.json();
                console.log(data);
                setUserData(data?.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [_id]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);
            const payload = {};

            //Image hosted

            const profileImageFile = { image: e.currentTarget.profileImage.files[0] };

            if (!profileImageFile) {
                console.error('No file selected');
                return;
            }

            const result = await axios.post(image_hosting_api, profileImageFile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            //payload updated

            for (let [key, value] of formData.entries()) {
                if (value) {
                    payload[key] = value;
                    if (key === "profileImage") {
                        payload[key] = result?.data.data.url;
                    }
                    if (key === "password") {
                        const hassedPassword = await bcrypt.hash(payload[key], 5);
                        payload[key] = hassedPassword;
                    }
                    if (key === "updatedAt") {
                        payload[key] = new Date();
                    }
                }
            }
            console.log(payload);

            //profile updated

            const response = await fetch(`https://fresh-harvests-6kzq.vercel.app/api/v1/users/updateProfile/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Profile Updated Successfully!")
                console.log('Update successful:', response);
                window.location.reload();
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }
        } catch (err) {
            console.error('Error updating user data:', err.message);
        }
    }

    if (loading) {
        return <div className='pt-44'><p className="text-center text-red-700 text-2xl">Loading...</p></div>;
    }

    if (!userData) {
        return <div className='pt-44'><p className="text-center text-red-700 text-2xl">User not found!</p></div>;
    }

    return (
        <div className='pt-32 lg:px-36'>
            <form onSubmit={handleSubmit} className="card-body">
                <h2 className="text-2xl text-center font-bold mb-8 border-b-2 border-green-700 pb-4 w-2/3 md:w-2/5 lg:w-1/5 mx-auto uppercase">Update Profile</h2>
                <div className='md:flex justify-center items-center gap-8'>
                    <div className='flex-1'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Profile Image</span>
                            </label>
                            <input type="file" name='profileImage' placeholder="Profile Image" className="input input-bordered py-2" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">User Name</span>
                            </label>
                            <input type="text" name='userName' placeholder="User Name" defaultValue={userData.userName} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" name='fullName' placeholder="Full Name" defaultValue={userData.fullName} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="Email" defaultValue={userData.email} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="Password" defaultValue={userData.password} className="input input-bordered" />
                        </div>
                    </div>
                    <div className='flex-1'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Role</span>
                            </label>
                            <input type="text" name='role' placeholder="Role" defaultValue={userData.role} className="input input-bordered" disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="text" name='phoneNumber' placeholder="Phone Number" defaultValue={userData?.phoneNumber} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Created At</span>
                            </label>
                            <input type="text" placeholder={userData.createdAt} defaultValue={userData.createdAt} className="input input-bordered" disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Updated At</span>
                            </label>
                            <input type="text" placeholder={userData.updatedAt} defaultValue={userData.updatedAt} className="input input-bordered" disabled />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#15803dcc] uppercase text-white">Update</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;