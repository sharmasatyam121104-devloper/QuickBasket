'use client'
import { useSession } from 'next-auth/react'


const AdminDashboard = () => {
  const session = useSession()
  console.log(session);
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard