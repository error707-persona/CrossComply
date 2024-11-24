import { create } from "zustand";

export type ResponseStore = {
    compliance?: string | JSON |undefined
    customs?: string | JSON |undefined
    incentives?: string | JSON | undefined
    setCompliance: (compliance: string | JSON |undefined) => void;
    setCustoms: (customs: string | JSON |undefined) => void;
    setIncentives: (incentives: string | JSON |undefined) => void;
    removeCompliance : () => void;
    removeCustoms : () => void;
    removeIncentives : () => void;
};

export const useRegion = create<ResponseStore>()((set) => ({
    compliance: undefined,
    customs:undefined,
    incentives:undefined,
    setCompliance: (complianceRes: string | JSON |undefined) =>
        set({ compliance: complianceRes }),
    setCustoms: (customsRes: string | JSON |undefined) =>
        set({ customs: customsRes }),
    setIncentives: (incentivesRes: string | JSON |undefined) =>
        set({ incentives: incentivesRes }),
    removeCompliance: () => set(() => ({ compliance: undefined })),
    removeCustoms: () => set(() => ({ customs: undefined })),
    removeIncentives: () => set(() => ({ incentives: undefined })),
}));
