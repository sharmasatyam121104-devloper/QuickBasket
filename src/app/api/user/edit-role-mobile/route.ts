import { auth } from "@/auth"
import connectDb from "@/lib/db"
import serverErrorHandler from "@/lib/serverErrorHandler"
import UserModel from "@/models/user.model"
import { NextRequest, NextResponse as res } from "next/server"

//edit user role and mobile
export const POST = async (req: NextRequest) => {
  try {
    await connectDb()

    const session = await auth()

    // Not logged in
    if (!session?.user?.email) {
      return serverErrorHandler(new Error("Unauthorized access"), { status: 401 })
    }

    // Admin / DeliveryBoy not allowed
    if ( session.user.role === "admin" || session.user.role === "deliveryBoy") {
      return serverErrorHandler(new Error("Forbidden: You can't change your role"), { status: 403 })
    }

    const { mobile, role } = await req.json()

    if (!mobile || !role) {
      return serverErrorHandler(new Error("Mobile and role are required"), { status: 400 })
    }

    // find + check + update in ONE DB call
    const user = await UserModel.findOneAndUpdate(
      {
        email: session.user.email,
        mobile: { $exists: false } // Email exists but not verified yet
      },
      {
        $set: { mobile, role }
      },
      { new: true }
    )

    // User not found OR already verified
    if (!user) {
      return serverErrorHandler(new Error("Role change not allowed after account verification"), { status: 403 })
    }

    return res.json({
      success: true,
      message: "Profile updated successfully",
    })

  } catch (error) {
    return serverErrorHandler(error)
  }
}