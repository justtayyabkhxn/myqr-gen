import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../../../../lib/mongodb";
import User from "../../../../lib/User";

export async function POST(req: Request) {
  try {
    await connectDB(); // Connect to MongoDB
    const { name, email, password } = await req.json();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists!" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ success: true, message: "Signup successful!" });
  } catch (error) {
    console.error("Signup Error:", error); // ✅ Logs the error for debugging
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
}
