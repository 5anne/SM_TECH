import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET Method - Retrieve User Data
export const GET = async (request) => {
  const { pathname } = new URL(request.url);
  const _id = pathname.split('/').pop();
  console.log("Requested Path:", _id);

  if (!_id) {
    return NextResponse.json({ success: false, message: "No ID provided" }, { status: 400 });
  }

  try {
    const db = await connectDB();
    const allUsers = db.collection("users");

    const query = { _id: new ObjectId(_id) };
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

// PUT Method - Update User Data
export const PUT = async (request) => {
  const { pathname } = new URL(request.url);
  const _id = pathname.split('/').pop();
  console.log("Requested Path:", _id);

  if (!_id) {
    return NextResponse.json({ success: false, message: "No ID provided" }, { status: 400 });
  }

  try {
    const db = await connectDB();
    const allUsers = db.collection("users");

    const body = await request.json();
    const query = { _id: new ObjectId(_id) };

    const updateResult = await allUsers.updateOne(query, { $set: body }, { upsert: true });

    if (updateResult.matchedCount === 0 && updateResult.upsertedCount === 0) {
      return NextResponse.json({ success: false, message: "User update failed" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "User updated successfully!" });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};
