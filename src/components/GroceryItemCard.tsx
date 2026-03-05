'use client'
import Image from "next/image";
import { Card, Button, Tag } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addToCart, decreaseQuantity, increaseQuantity } from "@/redux/cartSlice";
import { Minus, Plus } from "lucide-react";

export interface IGrocery extends Document {
  _id: string; 
  name: string;
  category:
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
  price: number;
  unit: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}


const GroceryItemCard = ({ item }: {item: IGrocery}) => {

  const dispatch = useDispatch<AppDispatch>()
  const {cartData} = useSelector((state: RootState)=>state.cart)

  const cartItem = cartData.find(i=>i._id === item._id)

  return (
    <Card
      hoverable
      className=" md:w-60 min-w-70!   rounded-2xl shadow-sm"
      cover={
        <div className="relative h-48 w-90 overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
      }
    >
      {/* Title */}
      <h3 className="text-md font-semibold mb-1 line-clamp-1">
        {item.name}
      </h3>

      {/* Price + Unit */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-green-600 font-bold text-lg">
          ₹{item.price}
        </span>

        <Tag color="blue">
          1 kg
        </Tag>
      </div>

      {/* Add to Cart Button (Bottom) */}

      {
        !cartItem ? (
          <Button
            type="primary"
            block
            icon={<ShoppingCartOutlined />}
            className="rounded-full! h-11 font-medium"
            onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
          >
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center justify-between h-9 rounded-full border border-gray-200 bg-amber-100 px-1">
            
            <Button
              onClick={()=>dispatch(decreaseQuantity(item._id))}
              type="text"
              shape="circle"
              icon={<Minus size={16} />}
              className="flex items-center justify-center hover:bg-red-200!"
            />

            <span className="text-base font-semibold w-8 text-center">
              {cartItem.quantity}
            </span>

            <Button
              onClick={()=>dispatch(increaseQuantity(item._id))}
              type="text"
              shape="circle"
              icon={<Plus size={16} />}
              className="flex items-center justify-center hover:bg-green-200!"
            />

          </div>
        )
      }
    </Card>
  );
};

export default GroceryItemCard;

