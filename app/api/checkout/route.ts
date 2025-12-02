import { NextResponse } from "next/server";
import Stripe from "stripe";

// 初始化 Stripe (不指定版本号，使用默认，防止报错)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body;

    console.log("1. 收到后端请求，商品数量:", items.length); // 调试日志

    // 转换商品格式
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // 创建 Stripe 订单
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`, // 简化回调地址
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    console.log("2. Stripe 会话创建成功:", session.url); // 调试日志

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error("3. 后端报错:", error); // 关键！如果有错会在终端显示
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}