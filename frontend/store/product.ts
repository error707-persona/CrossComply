import { create } from "zustand";

export type ProductStore = {
  product?: {
    category: string;
    region: string[];
  };
  setProduct: (category: string, region: string[]) => void;
};

export const useProduct = create<ProductStore>()((set) => ({
  product: undefined,
  setProduct: (category: string, region: string[]) =>
    set(() => ({ product: { category, region } })),
  removeProduct: () => set(() => ({ product: undefined })),
}));
