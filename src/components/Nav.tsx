"use client"

import {  CloseOutlined, LogoutOutlined, MenuOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge,  Button,  Dropdown, Input, MenuProps } from "antd";
import {  PlusCircle, Search, SendToBack, ShoppingBag } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import MobileSidebar from "./MobileSideBar";

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
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false)
    // const router = useRouter()

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

    user.role=== "user" ?
    {
        type: "divider",
    }: null,

    user.role=== "user" ?
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
    } 
    : null,
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
    <div className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 flex md:gap-2   md:mx-2 mx-1 my-1 p-4 md:px-16 justify-between rounded-2xl sticky top-5 z-50">
        <p className="md:text-3xl text-2xl font-bold text-white">QuickBasket</p>
        {
            user.role === "user" &&
            <div className="hidden sm:block w-95">
                <Input
                placeholder="Search your product..!"
                prefix={<Search />}
                size="large"
                className="w-95!"
            />
            </div>
        }
        {
            user.role === "user" &&
             <div className="block md:hidden text-white " onClick={()=>setShowSearch(!showSearch)}>
                <Search  className="h-8 w-8 my-auto"/>
            </div>
        }
        {
            user.role === "admin" &&
             <div className="block md:hidden text-white ml-auto px-2" onClick={() => setSidebarOpen(true)}>
                <Button
                icon={<MenuOutlined />}
                />         
            </div>
        }
        <div className="flex gap-4 justify-center items-center">
            {
                user.role === "user" ?
                <Badge count={2} showZero className="bg-white rounded-full p-1!">
                    <ShoppingCartOutlined style={{ fontSize: 24 }} />
                </Badge> :
                <div className=" md:block hidden gap-4 space-x-4">
                    <Link href={'/admin/add-grocery'}><Button  className="h-10! rounded-3xl!"><PlusCircle size={14}/>Add Groceries</Button></Link>
                    <Link href={'/'}><Button className="h-10! rounded-3xl!"><ShoppingBag size={14}/>Viwe Groceries</Button></Link>
                    <Link href={'/'}><Button className="h-10! rounded-3xl!"><SendToBack size={14}/>Manage Order&apos;s</Button></Link>
                </div>
            }
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
    {
        user.role === "admin" &&
        <div>
      {/* Sidebar */}
      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </div>
    }
    </>
  )
}

export default Nav