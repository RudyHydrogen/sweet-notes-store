import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // 这个中间件可以让购物车数据保存在本地，刷新页面还在！

// 定义一种商品在购物车里的样子
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// 定义大脑里有什么功能
interface CartStore {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number; // 算出总共有几个本子
  getTotalPrice: () => number; // 算出总价
}

// 创建大脑
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // 添加商品逻辑
      addToCart: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);

        if (existingItem) {
          // 如果已经在购物车里了，数量 +1
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // 如果是新的，加进去
          set({ items: [...currentItems, { ...product, quantity: 1 }] });
        }
      },

      // 删除商品逻辑
      removeFromCart: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      // 清空购物车
      clearCart: () => set({ items: [] }),

      // 计算总数量
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // 计算总价
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'shopping-cart-storage', // 存在浏览器里的名字
    }
  )
);