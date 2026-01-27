import { auth } from "@/auth";
import EditRoleMobile from "@/components/EditRoleMobile";
import connectDb from "@/lib/db";
import UserModel from "@/models/user.model";
import { redirect } from "next/navigation";

const HomeRouter = async() => {

  await connectDb()
  const session = await auth()
  const user = await UserModel.findById(session?.user?.id)
  if(!user) {
    redirect("/login")
  }

  const inCompeteData =  !user.mobile  
  if(inCompeteData) {
    return <EditRoleMobile/>
  }

  return (
    <div>
      HomeRouter
    </div>
  )
}

export default HomeRouter;