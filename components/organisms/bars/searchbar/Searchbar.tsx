"use client"

import Image from "next/image";

import DIOLogo from "@/public/images/dio-logo.png"
import Button from "@/components/atoms/buttons/button/Button";
import {FiMenu} from "react-icons/fi";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import SearchbarIconButtonList from "@/components/moleculas/lists/searchbar-icon-button-list/SearchbarIconButtonList";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import AuthorizationPopup from "@/components/organisms/popups/authorization-popup/AuthorizationPopup";
import {useSearchbar} from "@/components/organisms/bars/searchbar/Searchbar.hooks";
import {useStore} from "@/store/Store";
import {useShallow} from "zustand/react/shallow";

const Searchbar = () => {

    const {...searchbarContext} = useSearchbar()

    const [isAuthPopupVisible, setAuthPopupVisible] = useStore(
        useShallow(state => [state.isAuthPopupVisible, state.setAuthPopupVisible])
    )

    const wrapperCV: ClassValue[] = [
        "w-full px-[100px] py-[20px] bg-white flex flex-row items-center gap-[30px]",
        "sticky top-[0px] z-30"
    ]

    return (
        <>
            {
                isAuthPopupVisible && <AuthorizationPopup
                    onClose={setAuthPopupVisible}
                />
            }
            <div className={cn(wrapperCV)}>
                <Image
                    src={DIOLogo.src}
                    width={50} height={50}
                    quality={100} alt={'/'}
                    className={"pointer"}
                    onClick={searchbarContext.handleLogoClick}
                />
                <div className={"w-full flex flex-row gap-[20px] items-center"}>
                    <Button
                        text={"Каталог"}
                        onClick={() => console.log("CATALOG OPEN")}
                        icon={
                            <FiMenu
                                size={"20px"}
                                className={"stroke-white"}
                            />
                        }
                    />
                    <SearchInput
                        placeholder={"Поиск товаров"}
                        value={searchbarContext.searchbar.searchbarValue}
                        onChange={searchbarContext.searchbar.setSearchbarValue}
                    />
                </div>
                <SearchbarIconButtonList/>
            </div>
        </>
    )
}

export default Searchbar
