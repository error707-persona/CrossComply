import { create } from "zustand";

export type ProductStore = {
  product?: string
  setProduct: (category: string) => void;
  removeProduct: () => void;
};

export const useProduct = create<ProductStore>()((set) => ({
  product: undefined,
  setProduct: (category: string) =>
    set({product:category}),
  removeProduct: () => set(() => ({ product: undefined })),
}));
