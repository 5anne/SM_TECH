'use client'
import React from 'react';
import AuthForm from './ui/AuthForm';

const RegisterModal = ({ toggleModal }) => {

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget)
            const fullName = formData.get('userName');
            const email = formData.get('userEmail');
            const password = formData.get('password');
            console.log(fullName, email, password);

            const response = await fetch(`/api/v1/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, email, password }),
            });
            console.log(response);
            if (response.ok) {
                alert("User registered successfully! Please, Log In!")
            } else {
                console.error("Error occurred!")
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box card rounded-none bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit} method="card-body">
                        <h1 className='text-center text-3xl text-black font-extrabold my-4'>Register</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" name='userName' placeholder="Enter your name" className="input input-bordered text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='userEmail' placeholder="Enter your email" className="input input-bordered text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="Enter your password" className="input input-bordered text-black" required />
                            <label className="label my-4">
                                <div className='flex items-center gap-2 text-[#FF6A1A] text-sm'>
                                    <input type="checkbox" className="checkbox" />
                                    <p> Remember me</p>
                                </div>
                                <a href="#" className="label-text-alt link link-hover underline">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <button className="btn bg-[#FF6A1A] text-white text-lg">Register</button>
                        </div>
                    </form>
                    <div className='flex justify-center items-center gap-2 text-black font-bold mt-4'>
                        <p className='border-[1px] w-3/5'></p>
                        <span className='text-sm text-center w-full'>Or Sign Up with</span>
                        <p className='border-[1px] w-3/5'></p>
                    </div>
                    <AuthForm />
                    <p className='font-bold text-center text-black my-4'>Already have an account? <button className='text-[#FF6A1A]' onClick={toggleModal}>Log In </button></p>
                </div>
            </dialog>
        </>
    );
};

export default RegisterModal;