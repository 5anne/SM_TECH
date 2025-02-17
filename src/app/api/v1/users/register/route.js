
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/connectDB";


export const POST = async (request) => {

    const { fullName, email, password } = await request.json();

    // Encrypted the Password 

    const hassedPassword = await bcrypt.hash(password, 5);

    // Formed a DB Payload 

    const newUser = {
        fullName,
        email,
        password: hassedPassword,
        profileImage: null,
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

        return NextResponse.json({ message: "User registered successfully!", result }, { status: 200 })
    } catch (error) {
        return new NextResponse(error.message, {
            status: 500
        })
    }
}