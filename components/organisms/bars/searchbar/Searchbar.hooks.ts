import {useState} from "react";
import {useRouter} from "next/navigation";

export const useSearchbar = () => {

    const router = useRouter()

    // searchbar
    const [searchbarValue, setSearchbarValue] = useState<string>("")

    const handleLogoClick = () => router.push("/")

    return {
        searchbar: {searchbarValue, setSearchbarValue},
        handleLogoClick,
    }

}