'use client'
import { Card } from "antd";
import {
  Apple,
  Baby,
  Box,
  Coffee,
  Cookie,
  Flame,
  Heart,
  Home,
  Milk,
  ShoppingCart,
  Wheat,
} from "lucide-react";
import React, { useRef } from "react";

const CategorySlider = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  const categories = [
    { id: 1, name: "Fruits & Vegetables", icon: Apple, color: "bg-green-100!" },
    { id: 2, name: "Dairy & Eggs", icon: Milk, color: "bg-yellow-100!" },
    { id: 3, name: "Rice, Atta & Grains", icon: Wheat, color: "bg-orange-100!" },
    { id: 4, name: "Snacks & Biscuits", icon: Cookie, color: "bg-pink-100!" },
    { id: 5, name: "Spices & Masalas", icon: Flame, color: "bg-red-100!" },
    { id: 6, name: "Beverages & Drinks", icon: Coffee, color: "bg-green-100!" },
    { id: 7, name: "Personal Care", icon: Heart, color: "bg-purple-100!" },
    { id: 8, name: "Household Essentials", icon: Home, color: "bg-lime-100!" },
    { id: 9, name: "Instant & Packaged Food", icon: Box, color: "bg-teal-100!" },
    { id: 10, name: "Baby & Pet Care", icon: Baby, color: "bg-rose-100!" },
  ];

  return (
    <div className="w-full flex flex-col items-center my-6 gap-6 animate__animated animate__fadeInUp">
      <h1 className="flex gap-2 items-center text-indigo-600 font-bold text-2xl">
        <ShoppingCart /> Shop by Category
      </h1>

      <div className="w-full relative">
        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 px-8 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {categories.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                className={`min-w-50 h-40 rounded-2xl ${item.color} 
                flex items-center justify-center text-center shrink-0`}
              >
                <Icon className="mx-auto mb-2 text-indigo-600 h-12 w-10" />
                <p className="text-gray-700 font-medium">{item.name}</p>
              </Card>
            );
          })}
        </div>

        {/* Left Arrow */}
        <div
          onClick={scrollLeft}
          className="absolute top-1/3 left-2 
          flex items-center justify-center
          text-4xl font-extrabold 
          text-indigo-700 
          bg-slate-300 
          rounded-full 
          h-14 w-14
          cursor-pointer
          hover:bg-indigo-700
          hover:text-white
          transition-all duration-300 ease-in-out"
        >
          <p className="pb-2 mr-1">‹</p>
        </div>

        {/* Right Arrow */}
        <div
          onClick={scrollRight}
          className="absolute top-1/3 right-2 
          flex items-center justify-center
          text-4xl font-extrabold 
          text-indigo-700 
          bg-slate-300 
          rounded-full 
          h-14 w-14
          cursor-pointer
          hover:bg-indigo-700
          hover:text-white
          transition-all duration-300 ease-in-out"
        >
          <p className="pb-2 ml-1">›</p>
        </div>
      </div>

      <h1 className="text-indigo-600 font-bold text-2xl">
        Popular Grocery Items
      </h1>
    </div>
  );
};

export default CategorySlider;
