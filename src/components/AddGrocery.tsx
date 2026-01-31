'use client'

import clientErrorHandler from '@/lib/clientErrorHandler';
import { Button, Card, Form, Input, InputNumber, message, Select } from 'antd'
import axios from 'axios';
import {  ArrowLeft, PlusCircleIcon, Upload } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

export type GroceryCategory =
  | "Fruits & Vegetables"
  | "Dairy, Bread & Eggs"
  | "Cold Drinks & Juices"
  | "Snacks & Munchies"
  | "Breakfast & Instant Food"
  | "Sweet Tooth"
  | "Bakery & Biscuits"
  | "Tea, Coffee & Health Drinks"
  | "Atta, Rice & Dal"
  | "Masala, Oil & Dry Fruits"
  | "Chicken, Meat & Fish"
  | "Baby Care"
  | "Cleaning Essentials"
  | "Home & Office"
  | "Personal Care"
  | "Pet Care"
  | "Paan Corner"
  | "Pharma & Hygiene";


const categoryOptions: GroceryCategory[] = [
  "Fruits & Vegetables",
  "Dairy, Bread & Eggs",
  "Cold Drinks & Juices",
  "Snacks & Munchies",
  "Breakfast & Instant Food",
  "Sweet Tooth",
  "Bakery & Biscuits",
  "Tea, Coffee & Health Drinks",
  "Atta, Rice & Dal",
  "Masala, Oil & Dry Fruits",
  "Chicken, Meat & Fish",
  "Baby Care",
  "Cleaning Essentials",
  "Home & Office",
  "Personal Care",
  "Pet Care",
  "Paan Corner",
  "Pharma & Hygiene",
];

interface AddGroceryFormValues {
  name: string;
  category: GroceryCategory;
  unit: number;
  Price: number;
}



const AddGrocery = () => {
    const [image, setImage] = useState<File | null>()
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleFormData = async (value: AddGroceryFormValues) => {
        if (!image) {
            return message.error("Image is required");
        }

        const formData = new FormData();

        formData.append("name", value.name);
        formData.append("category", value.category);
        formData.append("unit", value.unit.toString());
        formData.append("price", value.Price.toString());
        formData.append("image", image); 

        try {
            setLoading(true)
            await axios.post("/api/admin/add-grocery", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            });
            message.success("Grocery added successfully")
            router.replace('/')
        } 
        catch (error) {
            return clientErrorHandler(error)
        }
        finally{
            setLoading(false)
        }
    };


    const handleImage = (e:ChangeEvent<HTMLInputElement>)=>{
        const files = e.target.files
        if(!files || files.length===0 ) {
            return message.warning("Image not Selected.")
        }
        const file = files[0]
        setImage(file)
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
    }

    console.log(image);
  return (
    <div className='flex items-center justify-center min-h-screen p-2'>
        
        <Card>
            <Link href={'/'}><Button type={'dashed'}><ArrowLeft/></Button></Link>
            <div className='flex flex-col items-center my-2 gap-2'>
                <h1 className='flex gap-2 font-bold text-xl text-indigo-600'><PlusCircleIcon size={30}/> Add Your Grocery</h1>
                <p className='text-sm text-slate-500'>Fill out the details below to add a new grocery item.</p>
            </div>
            <Form 
                onFinish={handleFormData}
                layout='vertical'
                className=''
            >
                <Form.Item
                    label="Grocery Name"
                    name="name"
                    rules={[
                    { required: true, message: "Grocery Name required" },
                    ]}
                    >
                    <Input placeholder="Enter Grocery Name" />
                </Form.Item>

                <div className='md:flex md:gap-4'>
                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[
                        { required: true, message: "Category is required" },
                        ]}
                        >
                        <Select
                        placeholder="Select category"
                        showSearch
                        options={categoryOptions.map((category) => ({
                            label: category,
                            value: category,
                        }))}
                        />

                    </Form.Item>

                    <Form.Item
                        label="Unit"
                        name="unit"
                        rules={[
                        { required: true, message: "Unit is required" },
                        {type: "number"}
                        ]}
                        >
                        <InputNumber placeholder="Enter Unit"  className='w-full!'/>
                    </Form.Item>
                </div>

                <Form.Item
                    label="Price"
                    name="Price"
                    rules={[
                    { required: true, message: "Price is required" },
                    {type: "number"}
                    ]}
                    >
                    <InputNumber placeholder="Enter Price" className='w-full!'/>
                </Form.Item>

                <Form.Item
                    label="Product Image"
                    rules={[
                    { required: true, message: "Product Image is required" },
                    ]}
                    >
                    <Input placeholder="Enter Unit" type={"file"} onChange={handleImage}/>
                    {
                        preview && <Image
                            src={preview}
                            width={100}
                            height={100}
                            alt='preview'
                            className='rounded-xl shadow-md border border-indigo-600 object-cover mt-2'
                            unoptimized
                        />
                    }
                </Form.Item>
                
                <Form.Item
                    >
                    <Button className='w-full' type='primary'  htmlType="submit" block loading={loading} disabled={loading}><Upload size={16}/>Upload product</Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
  )
}

export default AddGrocery