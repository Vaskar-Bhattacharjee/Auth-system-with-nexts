import { connectToDatabase } from '@/dbconfig/dbconfig';
import User from '@/model/usermodel';
import { NextResponse, NextRequest } from 'next/server';

connectToDatabase();

export async function POST(request: NextRequest) {
    try {
        console.log("Processing email verification request...");
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log("Received token:", token);

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });
        console.log("User found:", user);

        if (!user) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Email verified successfully", success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
