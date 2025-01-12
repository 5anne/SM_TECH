import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

//GET Method: Product got here

export const GET = async () => {
    try {
        const db = await connectDB();
        const allProducts = db.collection("products");
        const productInfo = await allProducts.find().toArray();

        return NextResponse.json({ success: true, message: "Products retrieve successfully!", data: productInfo });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
};

//POST Method: Product posted here

export const POST = async (request) => {
    try {
        const productInfo = await request.json();

        const db = await connectDB();
        const productCollection = db.collection("products");

        const result = await productCollection.insertOne(productInfo);

        return NextResponse.json({ message: "Product added successfully!", result }, { status: 200 });

    } catch (error) {
        console.error("Error adding product:", error);
        return NextResponse.json({ message: "Failed to add product", error: error.message }, { status: 500 });
    }
}
