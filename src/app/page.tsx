import { auth } from "@/auth";
import EditRoleMobile from "@/components/EditRoleMobile";
import connectDb from "@/lib/db";
import UserModel from "@/models/user.model";
import { redirect } from "next/navigation";
import Nav from "../components/Nav";
import UserDashboard from "@/components/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import DeliveryBoyDashboard from "@/components/DeliveryBoyDashboard";

const HomeRouter = async() => {

  await connectDb()
  const session = await auth()
  const user = await UserModel.findById(session?.user?.id)
  const plainUser = JSON.parse(JSON.stringify(user))
  if(!plainUser) {
    redirect("/login")
  }

  const inCompeteData =  !user.mobile  
  if(inCompeteData) {
    return <EditRoleMobile/>
  }

  return (
    <>
      <Nav user={plainUser}/>
      {
        user.role === "user" 
        ? (<UserDashboard/>): user.role === "admin" 
        ? (<AdminDashboard/>) : (<DeliveryBoyDashboard/>)
      }
    </>
  )
}

export default HomeRouter;