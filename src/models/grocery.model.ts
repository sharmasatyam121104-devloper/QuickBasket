import { model, models, Schema, Document } from "mongoose";

/* ----------------- Interface ----------------- */
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

/* ----------------- Schema ----------------- */
const grocerySchema = new Schema<IGrocery>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: {
        values: [
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
        ],
        message: "{VALUE} is not a valid category",
      },
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

/* ----------------- Model ----------------- */
const GroceryModel = models.Grocery || model<IGrocery>("Grocery", grocerySchema);

export default GroceryModel;