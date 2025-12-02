"use client";

import { products } from "@/lib/products";
import Navbar from "@/components/Navbar";
import { useCartStore } from "@/lib/store";
import { ArrowLeft, Check, Star } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation"; // 用来获取网址上的 id
import { useState } from "react";

export default function ProductPage() {
  const params = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  
  // 1. 获取网址上的 id (比如 /product/1，id 就是 "1")
  const id = Number(params.id);

  // 2. 去仓库里找这个 id 对应的商品
  const product = products.find((p) => p.id === id);

  // 如果找不到（比如用户瞎输了一个 /product/999），就显示 404
  if (!product) return <div className="p-20 text-center">Product not found</div>;

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        {/* 返回按钮 */}
        <Link href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-800 mb-8 transition">
          <ArrowLeft size={18} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* 左侧：大图展示 */}
          <div className="relative aspect-[3/4] bg-stone-100 rounded-lg overflow-hidden shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* 右侧：购买信息 */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <p className="text-stone-400 uppercase tracking-widest text-sm mb-2">{product.category}</p>
              <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-4">{product.name}</h1>
              <div className="flex items-center gap-4">
                <p className="text-2xl font-medium text-stone-900">${product.price.toFixed(2)}</p>
                {/* 假的好评星星，增加信任感 */}
                <div className="flex text-yellow-400">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <span className="text-stone-400 text-xs ml-2 text-black">(42 reviews)</span>
                </div>
              </div>
            </div>

            <hr className="border-stone-200" />

            <p className="text-stone-600 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* 参数列表 */}
            <ul className="space-y-3">
              {product.details?.map((detail, index) => (
                <li key={index} className="flex items-center gap-3 text-stone-600">
                  <span className="bg-green-100 text-green-600 p-1 rounded-full"><Check size={12} /></span>
                  {detail}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => {
                addToCart(product);
                alert("Added to cart!"); // 简单提示，回头我们可以改成不用弹窗
              }}
              className="w-full bg-stone-800 text-white py-5 rounded-full uppercase tracking-widest font-bold hover:bg-red-400 hover:scale-[1.02] transition-all shadow-xl mt-4"
            >
              Add to Cart - ${product.price.toFixed(2)}
            </button>
            
            <p className="text-xs text-center text-stone-400">
              Free shipping on orders over $50 • 30-day returns
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}