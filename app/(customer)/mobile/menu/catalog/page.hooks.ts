import {useState} from "react";

export const useMobileMenuCatalogPage = () => {

    const [searchbarValue, setSearchbarValue] = useState<string>("")

    return {
        searchbar : { value : searchbarValue, onChange : setSearchbarValue}
    }

}