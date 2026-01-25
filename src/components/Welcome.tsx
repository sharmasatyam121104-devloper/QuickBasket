'use client'

import { ArrowRight, Bike, ShoppingBasket } from "lucide-react"
import { Button } from 'antd';
import 'animate.css';


const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center md:p-8  min-h-screen ">
        <div className="space-y-4">
            <div className="flex gap-2 justify-center animate__animated animate__backInDown ">
                <ShoppingBasket  className="text-indigo-600 md:w-16 w-12 md:h-16 h-12 items-center " />
                <h1 className="font-extrabold md:text-5xl text-4xl text-indigo-600">QuickBasket</h1>
            </div>
            <div className="md:px-0 px-4 animate__animated animate__fadeIn animate__slower">
                <p className="text-xl text-gray-800 md:max-w-lg  text-center ">
                AI-powered grocery delivery for fresh produce, organic staples, and everyday essentials — fast, smart, and doorstep-ready!
            </p>
            </div>
        </div>
        <div className="flex my-6 md:gap-4 ">
            <ShoppingBasket size={100} className="text-indigo-600 animate__animated animate__backInRight "/>
            <Bike size={100} className="text-green-500 animate__animated animate__backInLeft "/>
        </div>
        <div className="animate__animated animate__backInUp ">
            <Button size="large" className="bg-indigo-600! text-white! hover:bg-white! hover:text-indigo-600! ">
                Register Now
                <ArrowRight/>
            </Button>
        </div>
    </div>
  )
}

export default Welcome