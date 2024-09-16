import {useState} from "react";
import {useRouter} from "next/navigation";
import {useStore} from "@/store/Store";
import {useShallow} from "zustand/react/shallow";
import {useMediaQuery} from "usehooks-ts";

export const useSearchbar = () => {

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
        searchbar: {searchbarValue, setSearchbarValue},
        catalogPopup : {catalogPopupState, handleChangeCatalogPopupVisibility},
        popupState, handleLogoClick, isLaptop
    }

}