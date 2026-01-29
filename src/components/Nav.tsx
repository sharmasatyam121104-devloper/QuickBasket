"use client"

import {  CloseOutlined, LogoutOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge,  Button,  Dropdown, Input, MenuProps } from "antd";
import {  Search, ShoppingBag } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

interface IUser {
    _id:string,
    name: string;
    email: string;
    password?: string;
    mobile?: string;
    role: "user" | "deliveryBoy" | "admin";
    image?: string;
}



const Nav = ({user}:{user:IUser}) => {
    const [showSearch, setShowSearch] = useState(false)

   const items: MenuProps["items"] = [
    {
        key: "profile",
        label: (
            <div className=" py-3 w-fit space-y-1">
                <div className="flex gap-1 text-sm">
                    <span className="text-gray-500">Name:</span>
                    <span className="font-medium capitalize text-gray-900">
                    {user.name}
                    </span>
                </div>

                <div className="flex gap-1  text-sm">
                    <span className="text-gray-500">Role:</span>
                    <span className="text-gray-700 truncate max-w-37.5 text-right capitalize">
                    {user.role}
                    </span>
                </div>

                {user.mobile && (
                    <div className="flex gap-1  text-sm">
                    <span className="text-gray-500">Phone:</span>
                    <span className="text-gray-700">
                        {user.mobile}
                    </span>
                    </div>
                )}
            </div>
        ),
        disabled: true,
    },
    {
        type: "divider",
    },
    {
        key:"order",
        label: (
            <Link href={"/"} className="flex text-sm gap-2">
                <span className="text-gray-500"><ShoppingBag /></span>
                <span className="text-gray-700 truncate max-w-37.5 text-right capitalize">
                My Orders
                </span>
            </Link>
        )
    },
    {
        type: "divider",
    },
    {
        key: "logout",
        label: (
                <Button
                type="text"
                danger
                icon={<LogoutOutlined />}
                className="w-full text-left cursor-pointer"
                onClick={()=>signOut({callbackUrl:"/login"})}
                >
                Logout
                </Button>
            ),
    },
    ]
  return (
    <>
    <div className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 flex md:gap-2   md:mx-2 mx-1 my-1 p-4 md:px-16 justify-between rounded-2xl sticky z-10">
        <p className="md:text-3xl text-2xl font-bold text-white">QuickBasket</p>
        <div className="hidden sm:block w-95">
            <Input
            placeholder="Search your product..!"
            prefix={<Search />}
            size="large"
            className="w-95!"
        />
        </div>
        <div className="block md:hidden text-white " onClick={()=>setShowSearch(!showSearch)}>
            <Search  className="h-8 w-8 my-auto"/>
        </div>
        <div className="flex gap-4 justify-center items-center">
            <Badge count={2} showZero className="bg-white rounded-full p-1!">
                <ShoppingCartOutlined style={{ fontSize: 24 }} />
            </Badge> 
            <Dropdown
                menu={{ items }}
                trigger={["hover"]}
                placement="bottomRight"
                className=""
            >
                <Avatar src={user.image || <UserOutlined/>} className="bg-white!  text-indigo-500! cursor-pointer!"/>
            </Dropdown>
        </div>
    </div>
    {
        showSearch && 
        <div className="block md:hidden  text-center">
            <Input
                placeholder="Search your product..!"
                prefix={<Search />}
                suffix={<CloseOutlined onClick={()=>setShowSearch(!showSearch)}/>}
                size="large"
                className="w-82! mt-1 h-12"
            />
        </div>
    }
    </>
  )
}

export default Nav