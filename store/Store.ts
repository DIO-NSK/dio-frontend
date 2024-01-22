import {create} from "zustand";
import {authorizationSlice, AuthorizationSlice} from "@/store/slices/AuthorizationSlice";

type StoreSlices = AuthorizationSlice

export const useStore = create<StoreSlices>()((...config) => ({
    ...authorizationSlice(...config)
}))