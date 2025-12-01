"use client"; // <--- 重点！因为要交互了，所以必须加这一行，变成客户端组件

import Navbar from "@/components/Navbar";
import { products } from "@/lib/products";
import { useCartStore } from "@/lib/store"; // 引入大脑
import { ShoppingBag } from "lucide-react"; // 确保引入图标

export default function Home() {
  // 从大脑里拿出“addToCart”这个功能
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full py-32 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl md:text-7xl text-stone-800 tracking-tight">
            Capture Life, <br />
            <span className="italic text-red-400">Beautifully.</span>
          </h1>
          <p className="text-lg text-stone-500 max-w-lg mx-auto leading-relaxed font-light">
            Handcrafted notebooks for your biggest dreams and tiniest thoughts.
            160gsm paper. Zero bleed-through.
          </p>
          <button className="mt-8 bg-stone-800 text-white px-10 py-4 rounded-full uppercase tracking-widest text-xs hover:bg-red-400 hover:scale-105 transition-all duration-300 shadow-xl">
            Shop New Arrivals
          </button>
        </div>
      </section>

      {/* Product List */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-serif text-stone-800">Latest Collection</h2>
          <span className="text-stone-400 text-sm">4 items</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm bg-stone-100 mb-4">
                {product.tag && (
                  <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur px-2 py-1 text-[10px] uppercase tracking-widest font-bold text-stone-800">
                    {product.tag}
                  </div>
                )}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
                  <button 
                    // --- 这里的 onClick 是关键 ---
                    onClick={() => {
                      addToCart(product);
                      alert(`Added ${product.name} to cart!`); // 暂时用个弹窗提示
                    }}
                    className="bg-white text-stone-800 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-400 hover:text-white transition-colors shadow-lg translate-y-4 group-hover:translate-y-0 duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="text-center space-y-1">
                <p className="text-xs text-stone-400 uppercase tracking-widest">{product.category}</p>
                <h3 className="text-lg font-serif text-stone-800 group-hover:text-red-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-stone-900 font-medium">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}