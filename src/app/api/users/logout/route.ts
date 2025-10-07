import { connectToDatabase } from '@/dbconfig/dbconfig';
import { NextResponse } from 'next/server';

connectToDatabase();

export async function POST() {
    try {
        const response = NextResponse.json({
            message: "User logged out successfully",
            success: true,
            status: 200
        })
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        return response;

        
    } catch (error : any) {
        return NextResponse.json(
           { message: "Error parsing request body", error }, 
           { status: 400 }
        );
    }
}