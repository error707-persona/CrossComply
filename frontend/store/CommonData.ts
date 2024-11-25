import { create } from "zustand";

// Define the store type
export type CommonDataStore = {
  dutiesTariffs: object[] | null;
  potentialCostSavings: object[] | null;
  estimatedCosts: object[] | null;
  complianceData: any[];
  selectList: string[];
  incentives: {incentiveList:string[]|[], cost:string|undefined}
  setDutiesTariffs: (data: object[]) => void;
  setComplianceData: (data: any[]) => void;
  setPotentialCostSavings: (data: object[]) => void;
  setEstimatedCosts: (data: object[]) => void;
  setSelectList: (data: string[]) => void;
  setIncentives: (incentiveList:string[]|[], cost:string|undefined) => void;
};

// Create the Zustand store
export const useCommonDataStore = create<CommonDataStore>()((set) => ({
  dutiesTariffs: [],
  potentialCostSavings: [],
  estimatedCosts: [],
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
