"use client"; // 这个文件负责交互

import { useCartStore } from "@/lib/store";

export default function AddToCartButton({ product }: { product: any }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button 
      onClick={() => {
        addToCart(product);
        alert("Added to cart!"); 
      }}
      className="w-full bg-stone-800 text-white py-5 rounded-full uppercase tracking-widest font-bold hover:bg-red-400 hover:scale-[1.02] transition-all shadow-xl mt-4"
    >
      Add to Cart - ${product.price.toFixed(2)}
    </button>
  );
}