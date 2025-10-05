import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbconfig/dbconfig";
import User from "@/model/usermodel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
connectToDatabase();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(email, password);
        const user = await User.findOne({email})
        if(!user) {
            return NextResponse.json(
                {message: "User not found, please signup"}, 
                {status: 404}
            )
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            return NextResponse.json(
                {message: "Invalid password"}, 
                {status: 400}
            )
        }
        const token = {
            id: user._id,
            email: user.email,
            username: user.username
        }
        const jwtToken = jwt.sign(
            token,
            process.env.JWT_SECRET_KEY!,
            {expiresIn: '7d'}

        )
        const response = NextResponse.json(
            {
                message: "User logged in successfully",
                success: true,
            }
        )
        response.cookies.set("token", jwtToken, {
            httpOnly: true,
        })
        return response;
    } catch (error) {
        throw new Error(
            "Error logging in user" + error);
    }
}