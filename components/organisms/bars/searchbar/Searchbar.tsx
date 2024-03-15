"use client"

import Image from "next/image";

import DIOLogo from "@/public/images/dio-logo.png"
import Button from "@/components/atoms/buttons/button/Button";
import {FiMenu} from "react-icons/fi";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import SearchbarIconButtonList from "@/components/moleculas/lists/searchbar-icon-button-list/SearchbarIconButtonList";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import LoginPopup from "@/components/organisms/popups/authorization/login-popup/LoginPopup";
import {useSearchbar} from "@/components/organisms/bars/searchbar/Searchbar.hooks";
import SignUpPopup from "@/components/organisms/popups/authorization/signup-popup/SignUpPopup";
import ForgotPasswordPopup from "@/components/organisms/popups/authorization/forgot-password-popup/ForgotPasswordPopup";
import ConfirmationCodePopup
    from "@/components/organisms/popups/authorization/confirmation-code-popup/ConfirmationCodePopup";
import LoginByPhonePopup from "@/components/organisms/popups/authorization/login-by-phone-popup/LoginByPhonePopup";
import ChangePasswordPopup from "@/components/organisms/popups/authorization/change-password-popup/ChangePasswordPopup";
import SuccessPopup from "@/components/organisms/popups/authorization/success-popup/SuccessPopup";
import React from "react";
import CatalogPopup from "@/components/organisms/popups/catalog/CatalogPopup";
import {useUnit} from "effector-react";
import {
    $searchValue,
    searchCatalogByNameEvent,
    toggleCatalogPopupEvent
} from "@/components/organisms/bars/searchbar/model";

const ActivePopup = () => {

    const {popupState} = useSearchbar()

    switch (popupState) {
        case "login" :
            return <LoginPopup/>
        case "signup" :
            return <SignUpPopup/>
        case "forgotPassword" :
            return <ForgotPasswordPopup/>
        case "confirmationCode" :
            return <ConfirmationCodePopup/>
        case "loginByPhone" :
            return <LoginByPhonePopup/>
        case "changePassword" :
            return <ChangePasswordPopup/>
        case "success" :
            return <SuccessPopup/>
    }

}

const Searchbar = () => {

    const [name, setName, toggleCatalogPopup]
        = useUnit([$searchValue, searchCatalogByNameEvent, toggleCatalogPopupEvent])

    const searchbarContext = useSearchbar()

    const wrapperCV: ClassValue[] = [
        "hidden w-full px-[100px] py-4 bg-white sm:flex flex-row items-center gap-[30px]",
        "sticky top-[0px] z-30"
    ]

    return (
        <>
            <CatalogPopup/>
            <ActivePopup/>
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
                        onClick={toggleCatalogPopup}
                        icon={<FiMenu className={"stroke-white size-5"}/>}
                    />
                    <SearchInput
                        hasPopover
                        placeholder={"Поиск товаров"}
                        onChange={setName}
                        value={name}
                    />
                </div>
                <SearchbarIconButtonList/>
            </div>
        </>
    )
}

export default Searchbar
