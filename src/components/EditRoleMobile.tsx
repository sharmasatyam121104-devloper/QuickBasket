'use client'

import 'animate.css';
import clientErrorHandler from '@/lib/clientErrorHandler'
import { Button, Card, Form, Input, message } from 'antd'
import axios from 'axios'
import {  Motorbike, Save, User, UserStar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSession } from 'next-auth/react';

const EditRoleMobile = () => {
    const session = useSession()
    console.log(session);
  const role = [
    {role: "user", lable: "User", icon:<User />},
    {role: "admin", lable: "Admin", icon:<UserStar />},
    {role: "deliveryBoy", lable: "Delivery Boy", icon:<Motorbike />}
  ]

  const [selectedRole, setSelectedRole] = useState("")
  const [mobile, setMobile] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const {update} = useSession()

  const handleEditRoleAndMobile = async()=>{
    try {
      if(!mobile || !selectedRole) {
        return message.warning("Role and Mobile both are required.")
      }
      
      setLoading(true)
      await axios.post('/api/user/edit-role-mobile', {mobile, role:selectedRole})
      await update({role: selectedRole})
      message.info("Your profile verification completed.")
      router.push('/')
    } 
    catch (error) {
      return clientErrorHandler(error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center w-full gap-8 my-10'>
      <h1 className='md:text-5xl text-4xl text-indigo-600 font-bold animate__animated animate__bounceInDown'>Select Your Role</h1>
      <div className='grid md:grid-cols-3 grid-cols-1 gap-5 mb-4 animate__animated animate__bounceInDown'>
        {
          role.map((item,index:number)=>{
            return(
              <Card key={index} 
                onClick={()=>setSelectedRole(item.role)}
                hoverable 
                className= {`w-40 h-40 flex flex-col items-center justify-center  gap-2 ${selectedRole === item.role ? "border-6! border-indigo-500!" : ""}`}
                >
                <h1 className=' w-full font-bold'>{item.lable}</h1>
                <div className='w-full flex justify-center'>{item.icon}</div>
              </Card>
            )
          })
        }
      </div>
      <div className='flex'>
        <h2>Mobile: </h2>
        <Form>
          <Form.Item
            name="mobile"
            rules={[
            { required: true, message: "Mobile number is required" },
            { pattern: /^[6-9]\d{9}$/, message: "Enter valid 10 digit mobile number" },
            ]}
            >
            <Input
              type="tel"
              placeholder="Enter mobile number"
              maxLength={10}
              className='ml-2!'
              onChange={(e)=>setMobile(e.target.value)}
            />
          </Form.Item>
        </Form>
      </div>
        <Button type='primary' size='large' onClick={handleEditRoleAndMobile} loading={loading}>
          <Save/>
          Save
        </Button>
    </div>
  )
}

export default EditRoleMobile