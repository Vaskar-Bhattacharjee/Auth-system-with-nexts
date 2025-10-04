import { connectToDatabase } from '@/dbconfig/dbconfig';
import User from '@/model/usermodel';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import { sendEmail } from '@/helpers/mailers';
connectToDatabase();

export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json();
        //validation
        console.log(username, email, password);
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { message: "User already exists" }, 
                { status: 400 }
            );
        } 

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();
        console.log(savedUser);


        //send welcome email
        await sendEmail(
            {
                email,
                emailType: "VERIFY",
                userId: savedUser._id
            })

            return NextResponse.json(
                {
                    message: "User created successfully",
                    success: true,
                    user: savedUser
                }
        );

    } catch (error : any) {
        return NextResponse.json(
           { message: "Error parsing request body", error }, 
           { status: 400 }
        );
    }
}