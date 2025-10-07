import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbconfig/dbconfig";
import User from "@/model/usermodel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connectToDatabase();

export async function GET(request: NextRequest) {
    try {
       const userId = await getDataFromToken(request);
         const user = await User.findById({_id: userId}).select("-password");
        if(!user) {
            return NextResponse.json({
                message: "User not found",
                success: false,
                status: 404
            });
        }
        
         return NextResponse.json({
            message: "User fetched successfully",
            success: true,
            status: 200,
            user
        });
        } catch (error : any) {
        
    }
}