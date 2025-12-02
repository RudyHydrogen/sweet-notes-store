import Link from "next/link";
import { Instagram, Mail, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* 第一列：Logo 和 简介 */}
        <div className="space-y-4">
          <h3 className="text-2xl font-serif text-white tracking-widest">
            SWEET NOTES
          </h3>
          <p className="text-sm leading-relaxed max-w-xs">
            Premium stationery designed to spark joy and creativity. 
            Handcrafted with love for journal enthusiasts worldwide.
          </p>
        </div>

        {/* 第二列：快速链接 */}
        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition">All Products</Link></li>
            <li><Link href="#" className="hover:text-white transition">New Arrivals</Link></li>
            <li><Link href="#" className="hover:text-white transition">Accessories</Link></li>
            <li><Link href="#" className="hover:text-white transition">Gift Cards</Link></li>
          </ul>
        </div>

        {/* 第三列：社交媒体 & 版权 */}
        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Stay Connected</h4>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/hydrogendd798" target="_blank" className="hover:text-white transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-white transition">
              <Facebook size={20} />
            </a>
            <a href="mailto:hydrogendd798@gmail.com" className="hover:text-white transition">
              <Mail size={20} />
            </a>
          </div>
          <p className="text-xs pt-8 opacity-50">
            © 2025 Sweet Notes Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}