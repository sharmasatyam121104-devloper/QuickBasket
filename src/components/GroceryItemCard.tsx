'use client'
import Image from "next/image";
import { Card, Button, Tag } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

export interface IGrocery extends Document {
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
      <Button
        type="primary"
        block
        icon={<ShoppingCartOutlined />}
        className="rounded-4xl!"
      >
        Add to Cart
      </Button>
    </Card>
  );
};

export default GroceryItemCard;

