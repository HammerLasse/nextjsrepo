"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/cartSlice";

export default function AddToCartButton({ drink }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;

    const timer = setTimeout(() => {
      setAdded(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [added]);

  const handleAddToCart = () => {
    dispatch(addItem(drink));
    setAdded(true);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`px-5 py-2 rounded-full text-sm text-white
        transition-all duration-200 active:scale-95
        ${added ? "bg-green-600" : "bg-[#1f1f1f] hover:bg-[#3a3a3a]"}`}
    >
      {added ? "Tilføjet!" : "Tilføj til kurv"}
    </button>
  );
}
