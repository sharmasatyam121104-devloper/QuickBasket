import clientErrorHandler from '@/lib/clientErrorHandler';
import { GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface handleLoginInterface {
    email: string;
    password: string;
}

const Login = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
//   const session = useSession()
//   console.log(session);

    //Login logic here
    const handleLogin = async(value: handleLoginInterface)=>{
        try {
            setLoading(true)
            await signIn("credentials",{
                email: value.email,
                password: value.password
            })
            message.success("Login Successfully!")
            router.push('/')
        } 
        catch (error) {
            return clientErrorHandler(error)
        }
        finally {
            setLoading(false)
        }
    }

    const handleAuthWithGoogle = async() =>{
        try {
            setLoading(true)
            await signIn("google",{callbackUrl: "/"})
        } 
        catch (error) {
            return clientErrorHandler(error)
        }
        finally {
            setLoading(false)
        }
    }

  return (
    <div className='flex flex-col items-center justify-center md:p-8  min-h-screen w-full relative'>
        
        <div className='flex flex-col gap-2'>
            <h1 className='font-extrabold md:text-5xl text-4xl text-indigo-600 animate__animated animate__backInRight'>
                Login Here!
            </h1>
            <p className='text-gray-500 font-semibold text-sm w-full text-end animate__animated animate__backInLeft' >
                Welcom back QuickBasket today!
            </p>
        </div>

        <Form
            onFinish={handleLogin}
            layout="vertical"
            className="max-w-md! mx-auto!  px-12! md:w-110! w-90 animate__animated animate__backInUp "
            >
           
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
                <Button type="primary" htmlType="submit" block className='h-12!' loading={loading} >
                    Login Now
                </Button>
            </Form.Item>
            {/* Divider */}
            <div className="flex items-center gap-2 my-2 w-full">
                <span className="h-px flex-1 bg-gray-400"></span>
                <span className="text-gray-400 text-xs">OR</span>
                <span className="h-px flex-1 bg-gray-400"></span>
            </div>
            <Button className=' h-12! md:w-88! w-65' loading={loading} onClick={handleAuthWithGoogle}>
                <GoogleOutlined className='text-lg'/>
                <p className='text-sm'>Login with Google</p>
            </Button>
        </Form>
        {/* Don't have an account */}
        <div className="text-end text-sm text-gray-600 animate__animated animate__backInUp mt-2">
            Don&#39;t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline font-medium">
                Register Now
            </Link>
        </div>
        </div>
  )
}


export default Login