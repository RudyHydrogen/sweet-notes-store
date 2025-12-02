"use client";

import { X, Plus, Minus, Trash2, Loader2 } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useState } from "react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, addToCart, getTotalPrice } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  // --- 结账逻辑 ---
  const handleCheckout = async () => {
    console.log("点击了 Checkout 按钮"); // 1. 调试日志：确认按钮被点了
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();
      console.log("收到后端返回:", data); // 2. 调试日志：看后端回了什么

      if (data.url) {
        window.location.href = data.url; // 跳转
      } else {
        alert("出错啦：" + JSON.stringify(data)); // 如果没URL，弹窗显示错误
        setIsLoading(false);
      }
    } catch (error) {
      console.error("前端请求失败:", error);
      alert("网络请求失败，请检查控制台");
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* 遮罩 */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* 抽屉主体 */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-2xl font-serif text-stone-800">Your Bag ({items.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition">
            <X size={24} className="text-stone-500" />
          </button>
        </div>

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
                <div className="w-20 h-24 bg-stone-100 rounded-md overflow-hidden flex-shrink-0 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-stone-800 text-lg leading-tight">{item.name}</h3>
                    <p className="text-sm text-stone-500 mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-stone-50 rounded-full px-3 py-1">
                      <button onClick={() => removeFromCart(item.id)} className="text-stone-400 hover:text-red-500">
                         {item.quantity === 1 ? <Trash2 size={14}/> : <Minus size={14} />} 
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="text-stone-800 hover:text-red-400">
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

        {items.length > 0 && (
          <div className="p-6 border-t border-stone-100 bg-stone-50/50 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold text-stone-800">
              <span>Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            
            {/* 这里的 onClick 绑定了 handleCheckout */}
            <button 
              onClick={handleCheckout} 
              disabled={isLoading}
              className="w-full bg-stone-800 text-white py-4 rounded-full uppercase tracking-widest font-bold hover:bg-red-400 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" /> Processing...
                </>
              ) : (
                "Checkout"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}