import { create } from "zustand";

// Define the store type
export type CommonDataStore = {
  dutiesTariffs: string | null;
  potentialCostSavings: string | null;
  estimatedCosts: string | null;
  complianceData: string | null;
  selectList: string[] | null;
  setDutiesTariffs: (data: string) => void;
  setComplianceData: (data: string) => void;
  setPotentialCostSavings: (data: string) => void;
  setEstimatedCosts: (data: string) => void;
  setSelectList: (data: string[]) => void;
};

// Create the Zustand store
export const useCommonDataStore = create<CommonDataStore>()((set) => ({
  dutiesTariffs: null,
  potentialCostSavings: null,
  estimatedCosts: null,
  complianceData: null,
  selectList: null,

  // Setters for each field
  setDutiesTariffs: (data) => set({ dutiesTariffs: data }),
  setComplianceData: (data) => set({ complianceData: data }),
  setPotentialCostSavings: (data) => set({ potentialCostSavings: data }),
  setEstimatedCosts: (data) => set({ estimatedCosts: data }),
  setSelectList: (data) => set({ selectList: data}),
}));
