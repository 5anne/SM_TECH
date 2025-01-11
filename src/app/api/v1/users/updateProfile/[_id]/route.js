import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const handler = async (request) => {
  const { pathname } = new URL(request.url);
  const _id = pathname.split('/').pop();

  if (!_id) {
    return NextResponse.json({ success: false, message: "No ID provided" }, { status: 400 });
  }

  try {
    const db = await connectDB();
    const allUsers = db.collection("users");
    const query = { _id: new ObjectId(_id) };

    if (request.method === 'GET') {
      const userInfo = await allUsers.findOne(query);

      if (!userInfo) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: "User retrieved successfully!", data: userInfo });
    }

    if (request.method === 'PUT') {
      const body = await request.json();

      const updateResult = await allUsers.updateOne(query, { $set: body }, { upsert: true });

      if (updateResult.matchedCount === 0 && updateResult.upsertedCount === 0) {
        return NextResponse.json({ success: false, message: "User update failed" }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: "User updated successfully!" });
    }

  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};