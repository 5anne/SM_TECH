
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/connectDB";


export const POST = async (request) => {

    const { fullName, email, password } = await request.json();
    console.log(fullName, email, password);

    // Encrypt the Password 

    const hassedPassword = await bcrypt.hash(password, 5);

    // Form a DB Payload 

    const newUser = {
        fullName,
        password: hassedPassword,
        email
    }

    // Update the DB  

    try {
        const db = await connectDB();
        const userCollection = db.collection("users");
        const query = { email: newUser?.email };
        const isExists = await userCollection.findOne(query);
        console.log(isExists);
        if (isExists) {
            return Promise.reject(new Error("This user is already registered!"));
        }
        const result = await userCollection.insertOne(newUser);
        console.log(result);
        return NextResponse.json({ message: "User registered successfully!", result }, { status: 200 })
    } catch (error) {
        console.log(error);
        return new NextResponse(error.message, {
            status: 500
        })
    }
}