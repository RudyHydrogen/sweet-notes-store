"use client";

import { MessageCircle, Mail, Instagram, X } from "lucide-react";
import { useState } from "react";

export default function ContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-4">
      
      {/* 弹出的菜单 (点击后显示) */}
      <div className={`flex flex-col gap-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        
        {/* 1. Instagram 按钮 */}
        <a 
          href="https://instagram.com" 
          target="_blank" 
          className="flex items-center gap-2 bg-white px-4 py-3 rounded-full shadow-lg text-pink-500 hover:scale-110 transition hover:bg-pink-50"
        >
          <span className="text-sm font-bold">DM us</span>
          <Instagram size={20} />
        </a>

        {/* 2. Email 按钮 */}
        <a 
          href="mailto:hi@sweetnotes.com" 
          className="flex items-center gap-2 bg-white px-4 py-3 rounded-full shadow-lg text-stone-700 hover:scale-110 transition hover:bg-stone-50"
        >
          <span className="text-sm font-bold">Email</span>
          <Mail size={20} />
        </a>
      </div>

      {/* 主按钮 (圆圆的图标) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen ? 'bg-red-400 rotate-90' : 'bg-stone-800'
        } text-white`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </button>

    </div>
  );
}