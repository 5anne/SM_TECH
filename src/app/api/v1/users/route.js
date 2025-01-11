import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const db = await connectDB();
        const allUsers = db.collection("users");
        const userInfo = await allUsers.find().toArray();

        return NextResponse.json({ success: true, message: "Users retrieve successfully!", data: userInfo });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
};