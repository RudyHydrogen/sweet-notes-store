import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import ContactButton from "@/components/ContactButton"; // <--- 引入刚才写的组件

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-heading",
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Sweet Notes Studio",
  description: "Premium stationery for your creativity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${montserrat.variable} font-sans antialiased`}>
        {children}
        
        {/* 把客服按钮放在这里，它就会出现在所有页面上 */}
        <ContactButton /> 
        
      </body>
    </html>
  );
}