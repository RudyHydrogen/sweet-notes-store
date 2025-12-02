import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import ContactButton from "@/components/ContactButton";
import Footer from "@/components/Footer"; // <--- 1. 引入 Footer

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-heading",
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    template: '%s | Sweet Notes Studio', // 这里的 %s 会被子页面的标题替换
    default: 'Sweet Notes Studio - Premium Stationery', // 默认标题
  },
  description: "Handcrafted notebooks, journals, and stationery for your biggest dreams. Free shipping on orders over $50.",
  // 这是为了让搜索引擎知道你的图标在哪里
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${montserrat.variable} font-sans antialiased flex flex-col min-h-screen`}>
        {/* flex-col 和 min-h-screen 确保内容少的时候 Footer 也在最底下 */}
        
        <div className="flex-1">
          {children}
        </div>

        <Footer /> {/* <--- 2. 放在这里，所有页面底部都会有它 */}
        
        <ContactButton />
      </body>
    </html>
  );
}