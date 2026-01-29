'use client'

import { Leaf, ShoppingBasket, Smartphone, Truck } from 'lucide-react';
import Image from 'next/image';
import  { useEffect, useState } from 'react'

const HeroSection = () => {
    const [current, setCurrent] = useState(0)
    const slides = [
        {
            id: 1,
            icon: (
            <Leaf className="w-20 h-20 sm:w-28 sm:h-28 text-green-400 drop-shadow-lg" />
            ),
            title: "Fresh Organic Groceries 🌱",
            subtitle:
            "Farm-fresh fruits, vegetables, and daily essentials delivered straight to your doorstep.",
            btnText: "Shop Now",
            bg:"https://media.istockphoto.com/id/453963935/photo/fruits-and-vegetables-at-city-market-in-riga.jpg?b=1&s=612x612&w=0&k=20&c=9l8jo5v3GbAs0s-CtWRrqXStGi1_sqKP39d0I6qZQFk="
        },
        {
            id: 2,
            icon: (
            <Truck className="w-20 h-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg" />
            ),
            title: "Fast & Reliable Delivery 🚚",
            subtitle:
            "We ensure your groceries reach your home quickly and safely, every time.",
            btnText: "Order Now",
            bg: "https://media.istockphoto.com/id/1824077027/photo/at-street-food-in-night-city-thailand-delivery-drivers-are-making-deliveries-to-consumers-who.jpg?b=1&s=612x612&w=0&k=20&c=prQTC---i3QxCOeNdErt3i4lLEDteMKtC0IohWr5WY4="
        },
        {
            id: 3,
            icon: (
            <Smartphone className="w-20 h-20 sm:w-28 sm:h-28 text-blue-400 drop-shadow-lg" />
            ),
            title: "Shop Anytime, Anywhere 📱",
            subtitle:
            "Enjoy a smooth and seamless online grocery shopping experience on any device.",
            btnText: "Get Started",
            bg: "https://media.istockphoto.com/id/1560030949/photo/happy-young-indian-couple-with-shopping-bags-in-hand-looking-camera-concept-of-festival.jpg?b=1&s=612x612&w=0&k=20&c=_PCrc1hjw3_Myj_AcsBku8OWyd_NxUZBdaP95n_6_Xw="
        },
    ];

    useEffect(()=>{
        const timer = setInterval(()=>{
            setCurrent((prev) => (prev + 1) % (slides.length))
        },2500)
        return ()=>clearInterval(timer)
    },[slides.length])

  return (
    <div className='relative md:w-[78%] w-[] mx-auto mt-8 h-[80vh] rounded-3xl overflow-hidden shadow-2xl'>
        <div className='absolute inset-0 bg-black/50 backdrop-blur-[1px] animate__animated animate__fadeInRight animate__faster' key={current}>
           <Image
                src={slides[current]?.bg}
                fill
                priority
                alt='slides'
                className='object-cover'
           />
        </div>

        <div className='absolute inset-0 flex items-center justify-center text-center text-white px-6'>
            <div className='flex flex-col items-center justify-center gap-6 max-w-3xl'>
                <div className='bg-white/10 backdrop-blur-md p-6 rounded-full shadow-l animate__animated animate__fadeInRight animate__faster' key={current}>
                    {slides[current]?.icon}
                </div>
                <h1 className='text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg'>{slides[current]?.title}</h1>
                <p>{slides[current]?.subtitle}</p>
                <button className='bg-white text-green-700 hover:bg-green-100 px-8 py-3 rounded-full font-semibold flex gap-2 cursor-pointer '>
                    <ShoppingBasket className='w-5 h-5'/>
                    {slides[current]?.btnText}
                </button>
            </div>
        </div>

        <div className='absolute bottom-6 left-1/2 -translate-x-0.5 flex gap-3'>
                {slides.map((_,index)=>{
                    return (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full translate-all ${
                            index === current ? "bg-white w-6" : "bg-white/50"
                            }`}
                        />
                    )
                })}
        </div>
        
    </div>
  )
}

export default HeroSection