"use client";

import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store";
import Image from "next/image";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, addToCart, getTotalPrice } = useCartStore();

  // 如果 items 为空，显示空状态
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* 1. 黑色半透明遮罩 (点击空白处关闭) */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* 2. 白色抽屉主体 */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* 标题栏 */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-2xl font-serif text-stone-800">Your Bag ({items.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition">
            <X size={24} className="text-stone-500" />
          </button>
        </div>

        {/* 商品列表区 (可滚动) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
              <p>Your bag is empty.</p>
              <button onClick={onClose} className="text-red-400 underline hover:text-red-500">
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                {/* 小图 */}
                <div className="w-20 h-24 bg-stone-100 rounded-md overflow-hidden flex-shrink-0 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                {/* 信息 */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-stone-800 text-lg leading-tight">{item.name}</h3>
                    <p className="text-sm text-stone-500 mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  
                  {/* 加减数量控制器 */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-stone-50 rounded-full px-3 py-1">
                      <button 
                        onClick={() => removeFromCart(item.id)} // 这里的逻辑其实可以优化为减1，暂时先直接删
                        className="text-stone-400 hover:text-red-500"
                      >
                         {/* 如果数量是1，显示垃圾桶，否则显示减号 */}
                         {item.quantity === 1 ? <Trash2 size={14}/> : <Minus size={14} />} 
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => addToCart(item)} 
                        className="text-stone-800 hover:text-red-400"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-bold text-stone-800">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 底部结算区 */}
        {items.length > 0 && (
          <div className="p-6 border-t border-stone-100 bg-stone-50/50 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold text-stone-800">
              <span>Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <p className="text-xs text-stone-400 text-center">Shipping & taxes calculated at checkout</p>
            <button className="w-full bg-stone-800 text-white py-4 rounded-full uppercase tracking-widest font-bold hover:bg-red-400 transition-colors shadow-lg">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}