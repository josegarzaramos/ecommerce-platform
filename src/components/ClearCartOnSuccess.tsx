"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { clearCart } from "@/lib/redux/slices/cartSlice";

export function ClearCartOnSuccess() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return null;
}
