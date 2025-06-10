import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SerializableProduct } from "@/components/AddToCartButton";

export interface CartItem extends SerializableProduct {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<SerializableProduct>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },

    incrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      }
    },
  },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
