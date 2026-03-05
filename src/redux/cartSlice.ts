import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface IGrocery {
  _id?: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ICartSlice {
  cartData: IGrocery[]
}

const initialState: ICartSlice = {
  cartData: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IGrocery>)=>{
      state.cartData.push(action.payload)
    },
    increaseQuantity: (state, action: PayloadAction<string>)=>{
      const item = state.cartData.find(i=> i._id === action.payload)
      if(item) {
        item.quantity = item.quantity+1
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>)=>{
        const item = state.cartData.find(i=> i._id === action.payload)

        if(item && item?.quantity && item?.quantity>1) {
          item.quantity = item.quantity-1
        }
        else {
          state.cartData = state.cartData.filter(i=>i._id !== action.payload)
        }
    },
  }
});

export const { addToCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;