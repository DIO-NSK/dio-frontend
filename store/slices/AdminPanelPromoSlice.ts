import {StateCreator} from "zustand";
import {PromoCard} from "@/types/dto/PromoCard";

export type AdminPanelPromoSlice = {
    promoCards : PromoCard[],
    setPromoCards : (promoCards : PromoCard[]) => void
}

export const adminPanelPromoSlice: StateCreator<AdminPanelPromoSlice, [], [], AdminPanelPromoSlice> = (set) => ({

    promoCards : [],
    setPromoCards : (promoCards : PromoCard[]) => set({promoCards : promoCards})

})