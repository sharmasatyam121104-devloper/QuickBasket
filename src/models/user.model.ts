import mongoose from "mongoose";

interface IUser {
    name: string;
    email: string;
    password: string;
    mobile?: string;
    role: "user" | "deliveryBoy" | "admin"
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    mobile: {
        type: String,
        trim: true,
        sparse: true
    },
    role: {
        type: String,
        enum: ["user", "deliveryBoy", "admin"],
        default: "user",
    }
},{timestamps:true})

const UserModel = mongoose.models.User || mongoose.model("User", userSchema)

export default UserModel