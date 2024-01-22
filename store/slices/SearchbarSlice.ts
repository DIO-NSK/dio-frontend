import {StateCreator} from "zustand";

export type SearchbarSlice = {
    isAuthPopupVisible : boolean,
    setAuthPopupVisible : () => void
}

export const searchbarSlice : StateCreator<SearchbarSlice, [], [], SearchbarSlice> = (set) => ({

    isAuthPopupVisible : false,
    setAuthPopupVisible : () => set((state) => ({
        isAuthPopupVisible : !state.isAuthPopupVisible
    }))

})