import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google"; // 引入谷歌字体
import "./globals.css";

// 1. 配置标题字体：优雅、轻奢、衬线体
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-heading",
});

// 2. 配置正文字体：清晰、现代、无衬线
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
      {/* 把字体变量注入到 body 中 */}
      <body className={`${playfair.variable} ${montserrat.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}