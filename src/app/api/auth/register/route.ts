import connectDb from "@/lib/db";
import serverErrorHandler from "@/lib/serverErrorHandler";
import UserModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse as res } from "next/server";

export const POST = async(req: NextRequest)=>{
    try {
        await connectDb()

        const {name, email, password } = await req.json()

        if(!name) {
            return serverErrorHandler(new Error("name is required"), {status: 400})
        }

        if(!email) {
            return serverErrorHandler(new Error("email is required"), {status: 400})
        }

        if(!password) {
            return serverErrorHandler(new Error("password is required"), {status: 400})
        }

        if(password.length < 6) {
            return serverErrorHandler(new Error("password must be at least 6 charcters"), {status: 400})
        }

        const existUser = await UserModel.findOne({email})

        if(existUser) {
            return serverErrorHandler(new Error("Email already regisred."), {status: 409})
        }

       const hashedPassword = await bcrypt.hash(password, 12)

       const user = await UserModel.create({
            name,
            email,
            password: hashedPassword
        })

        const userObj = user.toObject();
        delete userObj.password;

       return res.json({
        message: "User Resgisterd successfully",
        user: userObj   
       })


    } 
    catch (error) {
        return serverErrorHandler(error)
    }
}