import { create } from "zustand";

// Define the store type
export type CommonDataStore = {
  dutiesTariffs: string | null;
  potentialCostSavings: string | null;
  estimatedCosts: string | null;
  complianceData: any[];
  selectList: string[];
  incentives: {incentiveList:string[]|[], cost:string|undefined}
  setDutiesTariffs: (data: string) => void;
  setComplianceData: (data: any[]) => void;
  setPotentialCostSavings: (data: string) => void;
  setEstimatedCosts: (data: string) => void;
  setSelectList: (data: string[]) => void;
  setIncentives: (incentiveList:string[]|[], cost:string|undefined) => void;
};

// Create the Zustand store
export const useCommonDataStore = create<CommonDataStore>()((set) => ({
  dutiesTariffs: null,
  potentialCostSavings: null,
  estimatedCosts: null,
  complianceData: [],
  selectList: [],
  incentives:{incentiveList:[], cost:undefined},

  // Setters for each field
  setDutiesTariffs: (data) => set({ dutiesTariffs: data }),
  setComplianceData: (data) => set({ complianceData: data }),
  setPotentialCostSavings: (data) => set({ potentialCostSavings: data }),
  setEstimatedCosts: (data) => set({ estimatedCosts: data }),
  setSelectList: (data) => set({ selectList: data}),
  setIncentives: (incentiveList:string[]|[], cost:string|undefined) => set({incentives:{incentiveList, cost}})
}));
