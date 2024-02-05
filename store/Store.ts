import {create} from "zustand";
import {authorizationSlice, AuthorizationSlice} from "@/store/slices/AuthorizationSlice";
import {AdminPanelPromoSlice, adminPanelPromoSlice} from "@/store/slices/AdminPanelPromoSlice";

type StoreSlices = AuthorizationSlice & AdminPanelPromoSlice

export const useStore = create<StoreSlices>()((...config) => ({
    ...authorizationSlice(...config),
    ...adminPanelPromoSlice(...config)
}))