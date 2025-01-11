import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const db = await connectDB();
        const allProducts = db.collection("products");
        const productInfo = await allProducts.find().toArray();

        return NextResponse.json({ success: true, message: "Categories retrieve successfully!", data: productInfo });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
};