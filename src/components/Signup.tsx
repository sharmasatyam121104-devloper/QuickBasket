'use client'
 
import clientErrorHandler from '@/lib/clientErrorHandler';
import { GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type propType = {
    nextStep:(s:number)=>void
}

interface handleSignupInterface {
    name: string;
    email: string;
    password: string;
}

const Signup = ({nextStep}: propType) => {
    const [loading, setLoading] = useState(false)

    //Signup/register logic here
    const handleSignup = async(value: handleSignupInterface)=>{
        try {
            setLoading(true)
            await axios.post('/api/auth/register',value)
            message.success("Registered Successfully!")
        } catch (error) {
            return clientErrorHandler(error)
        }
        finally {
            setLoading(false)
        }
    }

  return (
    <div className='flex flex-col items-center justify-center md:p-8  min-h-screen w-full relative'>
        <div
            onClick={()=>nextStep(1)}
            className='text-indigo-600 flex w-fit h-fit m-4 p-4 gap-1
             font-extrabold items-center hover:bg-slate-300 hover:rounded-xl 
             cursor-pointer absolute left-0 top-0'
            >
            <ArrowLeft size={20}/>
            Back
        </div>

        <div className='flex flex-col gap-2'>
            <h1 className='font-extrabold md:text-5xl text-4xl text-indigo-600 animate__animated animate__backInRight'>
                Create Account
            </h1>
            <p className='text-gray-500 font-semibold text-sm w-full text-end animate__animated animate__backInLeft' >
                Join QuickBasket today!
            </p>
        </div>

        <Form
            onFinish={handleSignup}
            layout="vertical"
            className="max-w-md! mx-auto!  px-12! md:w-110! w-90 animate__animated animate__backInUp "
            >
            {/* Name */}
            <Form.Item
                label="Full Name"
                name="name"
                rules={[
                    { required: true, message: 'Please enter your name' },
                ]}
                >
                <Input placeholder="Enter your name" className='h-12!'/>
            </Form.Item>


            {/* Email */}
            <Form.Item
                label="Email"
                name="email"
                rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Enter a valid email' },
                ]}
                >
                <Input placeholder="Enter your email" className='h-12!'/>
            </Form.Item>


            {/* Password */}
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please enter password' }]}
                >
                <Input.Password placeholder="Enter password" className='h-12!'/>
            </Form.Item>


            {/* Submit */}
            <Form.Item>
                <Button type="primary" htmlType="submit" block className='h-12!' loading={loading} disabled={loading}>
                    Register Now
                </Button>
            </Form.Item>
            {/* Divider */}
            <div className="flex items-center gap-2 my-2 w-full">
                <span className="h-px flex-1 bg-gray-400"></span>
                <span className="text-gray-400 text-xs">OR</span>
                <span className="h-px flex-1 bg-gray-400"></span>
            </div>
            <Button className=' h-12! md:w-88! w-65' loading={loading} disabled={loading}>
                <GoogleOutlined className='text-lg'/>
                <p className='text-sm'>Continue with Google</p>
            </Button>
        </Form>
        {/* Already have an account */}
        <div className="text-end text-sm text-gray-600 animate__animated animate__backInUp mt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Login
            </Link>
        </div>
        </div>
  )
}

export default Signup