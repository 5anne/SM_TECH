import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    const { pathname } = new URL(request.url);
    const email = decodeURIComponent(pathname.split('/').pop());

    if (!email) {
        return NextResponse.json({ success: false, message: "No email provided" }, { status: 400 });
    }

    try {
        const db = await connectDB();
        const allUsers = db.collection("users");

        const query = { email: email };
        const userInfo = await allUsers.findOne(query);

        if (!userInfo) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "User retrieved successfully!", data: userInfo });
    } catch (error) {
        console.error("Error retrieving user:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
};
