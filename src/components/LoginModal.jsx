'use client'
import React, { useState } from 'react';
import AuthForm from './ui/AuthForm';
import { doCredentialsLogIn } from '@/app/actions';

const LoginModal = ({ toggleModal }) => {
    const [error, setError] = useState('');

    async function handleFormSubmit(event) {
        event.preventDefault();
        try {
            const formData = {
                email: event.target.email.value,
                password: event.target.password.value
            }
            console.log(formData);

            const response = await doCredentialsLogIn(formData);
            console.log(response);
            if (response.error) {
                setError(response.error.message);
            } else {
                window.location.reload();
                setError('');
            }
        } catch (err) {
            console.error(err.message);
            setError(err.message);
        }
    }

    return (
        <>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box card rounded-none bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleFormSubmit} method="card-body">
                        <h1 className='text-center text-3xl text-black font-extrabold my-4'>Login</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="Enter your email" className="input input-bordered text-black" required />
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
                            <button className="btn bg-[#FF6A1A] text-white text-lg">Login</button>
                        </div>
                        <div className='text-red-600 text-center text-sm mt-2'>{error}</div>
                    </form>
                    <div className='flex justify-center items-center gap-2 text-black font-bold mt-4'>
                        <p className='border-[1px] w-3/5'></p>
                        <span className='text-sm text-center w-full'>Or Sign Up with</span>
                        <p className='border-[1px] w-3/5'></p>
                    </div>
                    <AuthForm />
                    <p className='font-bold text-center text-black my-4'>Do not have an account? <button className='text-[#FF6A1A]' onClick={toggleModal}>Sign up</button></p>
                </div>
            </dialog>
        </>
    );
};

export default LoginModal;