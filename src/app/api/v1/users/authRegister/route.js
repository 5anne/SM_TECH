
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";


export const POST = async (request) => {

    const { name, email, image } = await request.json();

    // Formed a DB Payload 

    const newUser = {
        fullName: name,
        email,
        password: null,
        profileImage: image,
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
    }

    // Updated the DB  

    try {
        const db = await connectDB();
        const userCollection = db.collection("users");
        const query = { email: newUser?.email };
        const isExists = await userCollection.findOne(query);

        if (isExists) {
            return Promise.reject(new Error("This user is already registered!"));
        }
        const result = await userCollection.insertOne(newUser);

        return NextResponse.json({ success: true, message: "User registered successfully!", result }, { status: 200 })
    } catch (error) {
        return new NextResponse(error.message, {
            status: 500
        })
    }
}