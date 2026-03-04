import { auth } from "@/auth"
import serverErrorHandler from "@/lib/serverErrorHandler"
import UserModel from "@/models/user.model"
import { error } from "console"
import {NextResponse as res } from "next/server"

export const GET = async()=>{
    try{
        const session = await auth()

        if(!session || !session.user) {
            return serverErrorHandler(new Error("Un authorized access"), {status: 400})
        }

        const user = await UserModel.findOne({email: session.user.email})

        if(!user) {
            return serverErrorHandler(new Error("User not found"), {status: 400})
        }

        return res.json(user)
    } 
    catch {
        return serverErrorHandler(error)
    }
}