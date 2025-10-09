import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbconfig/dbconfig";
import User from "@/model/usermodel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectToDatabase();

export async function GET(request: NextRequest) {
    try {
       const userId = getDataFromToken(request);
         const user = await User.findById(userId).select("-password");
         console.log("Fetched user for ID:", userId, user);
        if(!user) {
            console.log("User not found for ID:", userId);
            return NextResponse.json({
                message: "User not found",
                success: false,
                
            },{ status: 404 } );
        }
        
         return NextResponse.json({
            message: "User fetched successfully",
            success: true,
            user
        },
        { status: 200 });
        
        } catch (error : any) {
            console.log("Error in /api/users/me:", error);
            return NextResponse.json({
            message: error.message  || "Could not fetch user",
            success: false,
            status: 500
        });
    }
}