import { auth } from "@/auth"
import { uploadOnCloudinary } from "@/lib/cloudinary"
import connectDb from "@/lib/db"
import serverErrorHandler from "@/lib/serverErrorHandler"
import GroceryModel from "@/models/grocery.model"
import { NextRequest, NextResponse as res } from "next/server"

export const POST = async(req: NextRequest)=>{
    try {

        const session = await auth()
        if(!session) {
            return serverErrorHandler(new Error("Unauthorized Access"), {status: 401})
        }

        if(session.user?.role !== "admin") {
            return serverErrorHandler(new Error("Unauthorized Access"), {status: 401})           
        }

        const formData = await req.formData()
        const name = formData.get("name") as string
        const category = formData.get("category") as string
        const price = formData.get("price") as string
        const unit = formData.get("unit") as string
        const image = formData.get("image") as Blob

        if (!name.trim()) {
            return res.json({ message: "Name is required" }, { status: 400 });
        }

        if (!category) {
            return res.json({ message: "Category is required" }, { status: 400 });
        }

        if (!price) {
            return res.json({ message: "Price is required" }, { status: 400 });
        }

        if (!unit.trim()) {
            return res.json({ message: "Unit is required" }, { status: 400 });
        }

        if (!image || !(image instanceof Blob)) {
            return res.json({ message: "Image is required" }, { status: 400 });
        }

        await connectDb()

        const imageUrl = await uploadOnCloudinary(image)
        if(!imageUrl) {
            return res.json({ message: "Failed to upload " }, { status: 500 });
        }

        const payload = {
            name,
            category,
            price,
            unit,
            image: imageUrl
        }

        const grocery = await GroceryModel.create(payload)

        return res.json(grocery)

    } 
    catch (error) {
        return serverErrorHandler(error)  
    }
}