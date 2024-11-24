import { PopupState } from "@/store/slices/AuthorizationSlice";
import { useStore } from "@/store/Store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useShallow } from "zustand/react/shallow";

export interface UseSearchbarReturn {
    searchbar: {
        searchbarValue: string;
        setSearchbarValue: (value: string) => void;
    };
    catalogPopup: {
        catalogPopupState: boolean;
        handleChangeCatalogPopupVisibility: () => void;
    },
    popupState: PopupState;
    handleLogoClick: () => void;
    isLaptop: boolean;
}

export const useSearchbar = (): UseSearchbarReturn => {

    const router = useRouter()
    const popupState = useStore(state => state.popupState)
    const isLaptop = useMediaQuery('(min-width: 1440px)');

    // catalog popup
    const [catalogPopupState, setCatalogPopupState] = useStore(
        useShallow(state => [state.catalogPopupState, state.setCatalogPopupState])
    )

    // searchbar
    const [searchbarValue, setSearchbarValue] = useState<string>("")

    const handleLogoClick = () => router.push("/")
    const handleChangeCatalogPopupVisibility = () => setCatalogPopupState(!catalogPopupState)

    return {
        searchbar: { searchbarValue, setSearchbarValue },
        catalogPopup: { catalogPopupState, handleChangeCatalogPopupVisibility },
        popupState, handleLogoClick, isLaptop
    }
}