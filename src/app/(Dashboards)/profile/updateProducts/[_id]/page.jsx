'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const image_hosting_api = 'https://api.imgbb.com/1/upload?key=515cbf2e7466e1421466864e5e87bbbe';

const UpdateProduct = () => {
    const id = useParams();
    const _id = id?._id;
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/category/${_id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
                );
                const data = await response.json();
                console.log(data);
                if (data?.success) {
                    setProduct(data?.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, [_id])

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);
            const payload = {};

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

            for (let [key, value] of formData.entries()) {
                if (value) {
                    payload[key] = value;
                    if (key === "productImage") {
                        payload[key] = result?.data.data.url;
                    }
                    if (key === "updatedAt") {
                        payload[key] = new Date();
                    }
                    else {
                        payload.updatedAt = new Date();
                    }
                }
            }
            console.log(payload);
            const response = await fetch(`http://localhost:3000/api/v1/category/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Product Updated Successfully!")
                console.log('Update successful:', data);
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }
        } catch (err) {
            console.error('Error updating product data:', err);
        }
    }

    return (
        <div className='pt-32 px-36'>
            <form onSubmit={handleSubmit} className="card-body">
                <h2 className="text-2xl text-center font-bold mb-8 border-b-2 border-green-700 pb-4 w-1/5 mx-auto">Update Product</h2>
                <div className='flex justify-center items-center gap-8'>
                    <div className='flex-1'>
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
                            <input type="text" name='productName' placeholder="Product Name" defaultValue={product?.productName} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category Name</span>
                            </label>
                            <input type="text" name='categoryName' placeholder="Category Name" defaultValue={product.categoryName} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input type="text" name='description' placeholder="Description" defaultValue={product.description} className="input input-bordered" />
                        </div>
                    </div>
                    <div className='flex-1'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="number" name='price' placeholder="Price" defaultValue={product.price} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Created At</span>
                            </label>
                            <input type="text" placeholder={product.createdAt} defaultValue={product.createdAt} className="input input-bordered" disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Updated At</span>
                            </label>
                            <input type="text" name='updatedAt' placeholder={product.updatedAt} defaultValue={product.updatedAt} className="input input-bordered" />
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

export default UpdateProduct;