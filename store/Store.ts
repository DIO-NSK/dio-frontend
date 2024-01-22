import {create} from "zustand";
import {searchbarSlice, SearchbarSlice} from "@/store/slices/SearchbarSlice";

type StoreSlices = SearchbarSlice

export const useStore = create<StoreSlices>()((...config) => ({
    ...searchbarSlice(...config)
}))