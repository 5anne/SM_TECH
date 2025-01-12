"use client"
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`/api/v1/category`);
                const data = await response.json();
                console.log("All Products", data);
                if (data?.success) {
                    setProducts(data?.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, [])

    async function handleDelete(params) {
        const _id = await params;
        console.log(_id);
        try {
            const response = await fetch(`/api/v1/category/${_id}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            console.log("Deleted Product", data);

            if (response.ok) {
                alert("Product Deleted Successfully!");
                window.location.reload();
            } else {
                throw new Error(`Error: ${data.message}`);
            }
        } catch (err) {
            console.error("Error deleting product:", err.message);
        }
    }

    return (
        <>
            <Sidebar />
            <div className='pt-36 md:px-20'>
                <div>
                    <h2 className="text-2xl text-center font-bold mb-8 border-b-2 border-green-700 pb-4 w-2/3 md:w-2/5 lg:w-1/5 mx-auto uppercase">All Products</h2>
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
                                    <th>Product Image</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    products?.map((product, idx) => (
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
                                                            <Image width={20} height={20} alt='Product Image' src={product.image} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{product.categoryName}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {product.productName}
                                                <br />
                                                <span className="badge badge-ghost badge-sm hidden lg:flex">{product.description}</span>
                                            </td>
                                            <td>${product.price}</td>
                                            <th>
                                                <Link href={`/profile/updateProducts/${product._id}`}><button className="btn btn-ghost btn-xs text-blue-700"><FaEdit /></button></Link>
                                            </th>
                                            <th>
                                                <button onClick={() => handleDelete(product._id)} className="btn btn-ghost btn-xs text-red-700"><RiDeleteBin6Line /></button>
                                            </th>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='flex justify-center'>
                        <Link href='/profile/addProduct'><button className="btn bg-[#15803dcc] my-8">Add Product</button></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllProducts;