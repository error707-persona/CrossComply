import { create } from "zustand";

export type RegionStore = {
    region?: string
    setRegion: (region: string) => void;
    removeRegion : () => void;
};

export const useRegion = create<RegionStore>()((set) => ({
    region: undefined,
    setRegion: (country: string) =>
        set({ region: country }),
    removeRegion: () => set(() => ({ region: undefined })),
}));
