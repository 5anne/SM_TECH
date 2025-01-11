import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const GET = async (request) => {
    const { pathname } = new URL(request.url);
    const _id = pathname.split('/').pop();
    console.log(_id);

    if (!_id) {
        return NextResponse.json({ success: false, message: "No ID provided" }, { status: 400 });
    }

    try {
        const db = await connectDB();
        const allProducts = db.collection("products");

        const query = { _id: new ObjectId(_id) };
        const productInfo = await allProducts.findOne(query);

        if (!productInfo) {
            return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Product retrieved successfully!", data: productInfo });
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
};
