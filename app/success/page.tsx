"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useCartStore } from "@/lib/store";

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  // 这里的逻辑是：既然支付成功了，就清空购物车
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-[#fcf9f4] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full flex flex-col items-center animate-in zoom-in duration-500">
        <div className="text-green-500 mb-6">
          <CheckCircle size={80} />
        </div>
        <h1 className="text-3xl font-serif text-stone-800 mb-4">Thank You!</h1>
        <p className="text-stone-500 mb-8 leading-relaxed">
          Your order has been received. <br/>
          We are packing your notebooks with love!
        </p>
        <Link 
          href="/" 
          className="bg-stone-800 text-white px-8 py-3 rounded-full uppercase tracking-widest text-sm hover:bg-green-500 transition-colors shadow-lg"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}