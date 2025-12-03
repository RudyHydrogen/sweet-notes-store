export const products = [
  {
    id: 1,
    name: "Sakura Bloom Journal",
    price: 24.00,
    category: "A5 • Dot Grid",
    image: "/images/product1.jpg", // ⚠️ 请确保这里是你现在的图片路径
    tag: "Best Seller",
    // 👇 这些就是之前报错说缺少的字段，必须补上！
    description: "Inspired by the cherry blossom season in Kyoto. This journal features our signature 160gsm ultra-thick paper, perfect for watercolors and markers with zero ghosting.",
    details: ["160gsm bamboo paper", "5.75″ x 8.25″ (A5)", "Dot Grid (5mm)", "Back pocket & Elastic band"]
  },
  {
    id: 2,
    name: "Midnight Starry Sky",
    price: 28.00,
    category: "B6 • Blank",
    image: "/images/product2.jpg",
    tag: "New",
    description: "Capture your brightest ideas in the darkest nights. The deep navy vegan leather cover feels soft to the touch, guarding your precious thoughts.",
    details: ["160gsm white paper", "5″ x 7″ (B6)", "Blank pages", "Silver foil edges"]
  },
  {
    id: 3,
    name: "Vintage Olive Garden",
    price: 22.00,
    category: "A5 • Lined",
    image: "/images/product3.jpg",
    tag: null,
    description: "A classic look for the modern writer. The olive green tone brings a sense of calm and nature to your daily planning routine.",
    details: ["100gsm cream paper", "5.75″ x 8.25″ (A5)", "Lined (7mm)", "Lay-flat binding"]
  },
  {
    id: 4,
    name: "Rose Gold Minimalist",
    price: 30.00,
    category: "A5 • 160gsm",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    tag: "Limited",
    description: "Less is more. A stunning rose gold emblem on a pristine white cover. Designed for the minimalist who loves clean lines and luxury textures.",
    details: ["160gsm bright white paper", "5.75″ x 8.25″ (A5)", "Dot Grid", "Vegan leather cover"]
  }
];