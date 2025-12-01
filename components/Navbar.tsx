"use client";

import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import CartDrawer from "./CartDrawer"; // <--- 引入刚才写的抽屉

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);
  
  // --- 新增：控制抽屉打开/关闭的状态 ---
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted 
    ? items.reduce((total, item) => total + item.quantity, 0) 
    : 0;

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-[#fcf9f4]/80 backdrop-blur-md border-b border-stone-100 transition-all">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          
          <div className="flex items-center gap-4">
            <button className="text-stone-500 hover:text-red-400 transition-colors">
              <Search size={20} />
            </button>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="flex flex-col items-center group">
              <span className="text-2xl font-bold tracking-widest text-stone-800 font-serif">
                SWEET NOTES
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-red-300 group-hover:text-red-400 transition-colors">
                Studio
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <button 
              // --- 修改点：点击图标打开抽屉 ---
              onClick={() => setIsCartOpen(true)}
              className="relative group p-2"
            >
              <ShoppingBag size={22} className="text-stone-700 group-hover:text-red-400 transition" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-400 text-[10px] text-white animate-in zoom-in duration-300 shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </nav>

      {/* --- 把抽屉放在这里 --- */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}