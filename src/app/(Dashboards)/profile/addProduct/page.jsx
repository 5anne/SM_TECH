"use client"
import Sidebar from '@/components/Sidebar';
import axios from 'axios';
import React from 'react';

const image_hosting_api = 'https://api.imgbb.com/1/upload?key=515cbf2e7466e1421466864e5e87bbbe';

const AddProduct = () => {
    const time = new Date();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);
            const payload = {};

            //Image hosted

            const productImageFile = { image: e.currentTarget.productImage.files[0] };

            if (!productImageFile) {
                console.error('No file selected');
                return;
            }

            const result = await axios.post(image_hosting_api, productImageFile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            //Payload Updated 

            for (let [key, value] of formData.entries()) {
                if (value) {
                    payload[key] = value;
                    if (key === "productImage") {
                        payload[key] = result?.data.data.url;
                    }
                    if (key === "createdAt") {
                        payload[key] = new Date();
                    }
                    if (key === "updatedAt") {
                        payload[key] = new Date();
                    }
                }
            }
            console.log(payload);

            //Update Product

            const response = await fetch(`https://fresh-harvests-6kzq.vercel.app/api/v1/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            console.log('Added successfully:', data);
            if (response.ok) {
                alert("Product added Successfully!")
                window.location.reload();
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }
        } catch (err) {
            console.error('Error adding product data:', err.message);
        }
    }

    return (
        <>
            <Sidebar />
            <div className='pt-32 lg:px-36'>
                <form onSubmit={handleSubmit} className="card-body">
                    <h2 className="text-2xl text-center font-bold mb-8 border-b-2 border-green-700 pb-4 w-2/3 md:w-2/5 lg:w-1/5 mx-auto uppercase">Add Product</h2>
                    <div className='md:flex justify-center items-center gap-8'>
                        <div className='md:w-1/2'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Image</span>
                                </label>
                                <input type="file" name='productImage' placeholder="Product Image" className="input input-bordered py-2" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input type="text" name='productName' placeholder="Product Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category Name</span>
                                </label>
                                <input type="text" name='categoryName' placeholder="Category Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <input type="text" name='description' placeholder="Description" className="input input-bordered" required />
                            </div>
                        </div>
                        <div className='md:w-1/2'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input type="number" name='price' placeholder="Price" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Created At</span>
                                </label>
                                <input type="text" name='createdAt' placeholder={time} className="input input-bordered" disabled />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Updated At</span>
                                </label>
                                <input type="text" name='updatedAt' placeholder={time} className="input input-bordered" disabled />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-[#15803dcc] uppercase text-white">Add</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddProduct;