"use client";

import { toast } from "sonner";
import { addProductToCart } from "../_actions/CardActions";
import { useContext, useState } from "react";
import { cartContext } from "../_context/CartContextProvider";

export default function AddToCartBtn({ productId }: { productId: string }) {
  const { getCart } = useContext(cartContext);
  const [loading, setLoading] = useState(false);

  async function handleAddToCart() {
    if (loading) return;
    setLoading(true);

    try {
      await addProductToCart(productId);

      //  refresh cart after add
      await getCart();

      toast.success( "Product added to cart!", { position: "top-center" });
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Failed to add product.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className={`bg-emerald-600 text-white rounded-full h-10 w-10 flex items-center justify-center text-2xl 
                  hover:bg-emerald-700 transition-colors duration-200 font-bold cursor-pointer
                  ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      +
    </button>
  );
}