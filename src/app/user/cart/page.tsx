"use client";

import React, { useState } from "react";
import { Card, Button, Typography,  Divider } from "antd";
import { PlusOutlined, MinusOutlined, DeleteOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Image from "next/image";

const { Text, Title } = Typography;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Amul Milk", price: 60, quantity: 1, image: "/milk.png", unit: "piece" },
    { id: 2, name: "Apple 1kg", price: 119, quantity: 1, image: "/apple.png", unit: "kg" },
    { id: 3, name: "Aashirvaad Atta 10kg", price: 499, quantity: 1, image: "/atta.png", unit: "pack" },
  ]);


  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <Button type="link" icon={<ArrowLeftOutlined />} className="text-indigo-600 font-medium p-0">
            Back to Home
          </Button>
          <div className="flex items-center gap-2">
             <span className="text-2xl">🛒</span>
             <Title level={2} className="m-0! text-indigo-900! font-extrabold! tracking-tight">
                Your Shopping Cart
             </Title>
          </div>
          <div className="w-24 hidden md:block"></div> {/* Spacer */}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Left: Cart Items List */}
          <div className="lg:col-span-2 space-y-2!">
            {cartItems.map((item) => (
              <Card 
                key={item.id} 
                className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl "
                // bodyStyle={{ padding: '16px 24px' }}
              >
                <div className="flex flex-col sm:flex-row items-center gap-6!">
                  
                  {/* Image Container */}
                  <div className="bg-gray-100 rounded-xl p-2 w-24 h-24 flex items-center justify-center">
                    <Image src={item.image} alt={item.name} width={70} height={70} className="object-contain" />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <Text className="text-lg font-bold text-slate-800 block leading-tight">{item.name}</Text>
                    <Text className="text-slate-400 text-xs uppercase font-bold tracking-wider">{item.unit}</Text>
                    <div className="mt-1">
                      <Text className="text-indigo-600 font-black text-lg">₹{item.price.toLocaleString()}</Text>
                    </div>
                  </div>

                  {/* Action Controls */}
                  <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-full border border-slate-100">
                    <Button 
                      icon={<MinusOutlined className="text-xs" />}
                      className="flex! items-center justify-center border-none shadow-none hover:bg-white hover:text-red-500 rounded-full w-8 h-8"
                    />
                    <Text className="w-6 text-center font-bold text-slate-700">{item.quantity}</Text>
                    <Button 
                      icon={<PlusOutlined className="text-xs" />}
                      className="flex! items-center justify-center border-none shadow-none hover:bg-white hover:text-indigo-600 rounded-full w-8 h-8"
                    />
                  </div>

                  {/* Delete */}
                  <Button 
                    danger 
                    type="text" 
                    shape="circle"
                    icon={<DeleteOutlined className="text-lg" />} 
                    className="hover:bg-red-50"
                  />
                </div>
              </Card>
            ))}

            {cartItems.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
                <Text className="text-slate-400">Your cart is empty.</Text>
              </div>
            )}
          </div>

          {/* Right: Order Summary Section */}
          <div className="lg:sticky lg:top-10">
            <Card className="rounded-3xl border-none shadow-xl overflow-hidden">
              <Title level={4} className="mb-6! text-slate-800!">Order Summary</Title>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Text className="text-slate-500">Subtotal</Text>
                  <Text className="font-semibold text-slate-800">₹{subtotal.toLocaleString()}</Text>
                </div>
                <div className="flex justify-between">
                  <Text className="text-slate-500">Delivery Fee</Text>
                  <Text className="text-green-500 font-medium">FREE</Text>
                </div>
                
                <Divider className="my-4 border-slate-100" />
                
                <div className="flex justify-between items-end pb-2">
                  <Text className="text-lg font-bold text-slate-800">Total</Text>
                  <div className="text-right">
                    <Title level={3} className="m-0! text-indigo-600! font-black!">
                      ₹{subtotal.toLocaleString()}
                    </Title>
                  </div>
                </div>

                <Button
                  type="primary"
                  block
                  size="large"
                  className="h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700! border-none text-lg font-bold shadow-lg shadow-indigo-200 mt-4"
                >
                  Proceed to Checkout
                </Button>

                <Button 
                  type="link" 
                  danger 
                  block 
                  className="font-semibold hover:text-red-600"
                  onClick={() => setCartItems([])}
                >
                  Clear Cart
                </Button>
              </div>
            </Card>

            {/* Extra Trust Badge (Optional) */}
            <p className="text-center mt-6 text-slate-400 text-xs">
               🔒 Secure Checkout • Easy Returns
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;