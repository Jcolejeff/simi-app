import { StateCreator } from "zustand";

export type FeaturesStateType = {
   categories: any;
   setCategories: (arg: any) => void;
   subcategories: any;
   setSubcategories: (arg: any) => void;
   isLoading: boolean;
   setLoading: (arg: boolean) => void;
   selectedCategory: any;
   setSelectedCategory: (arg: any) => void;
   showFarmOffTakesForAll: boolean;
   setShowFarmOffTakesForAll: (arg: boolean) => void;
   showFlashSalesForAll: boolean;
   setShowFlashSalesForAll: (arg: boolean) => void;
};

const featuresSlice: StateCreator<FeaturesStateType, [["zustand/devtools", never]], []> = (
   set,
) => ({
   categories: [],
   subcategories: [],
   isLoading: false,
   selectedCategory: null,
   showFarmOffTakesForAll: false,
   showFlashSalesForAll: false,
   setShowFarmOffTakesForAll: (arg) => {
      set({ showFarmOffTakesForAll: arg });
   },
   setShowFlashSalesForAll: (arg) => {
      set({ showFlashSalesForAll: arg });
   },
   setSelectedCategory: (arg) => {
      set({ selectedCategory: arg });
   },
   setLoading: (arg) => {
      set({ isLoading: arg });
   },
   setSubcategories: (arg) => {
      set({ subcategories: arg });
   },
   setCategories: (arg) => {
      set({ categories: arg });
   },
});

export default featuresSlice;
