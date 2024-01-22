import {useState} from "react";
import {useRouter} from "next/navigation";
import {useStore} from "@/store/Store";

export const useSearchbar = () => {

    const router = useRouter()
    const popupState = useStore(state => state.popupState)

    // searchbar
    const [searchbarValue, setSearchbarValue] = useState<string>("")

    const handleLogoClick = () => router.push("/")

    return {
        searchbar: {searchbarValue, setSearchbarValue},
        popupState, handleLogoClick
    }

}