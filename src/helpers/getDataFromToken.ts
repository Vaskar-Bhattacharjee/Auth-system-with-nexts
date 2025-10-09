import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        console.log("Token from cookies:", token);
        
        const decodedToken =  jwt.verify(token, process.env.TOKEN_SECRET!)as { id: string };
        console.log("Decoded Token:", decodedToken);
        
        return decodedToken.id;
    } catch (error : any) {
        throw new Error(' get data issue ',error);
    }
}