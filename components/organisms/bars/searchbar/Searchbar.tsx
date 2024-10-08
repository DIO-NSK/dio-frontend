'use client';

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
    from "@/components/organisms/popups/authorization/confirmation-code-popup/user/ConfirmationCodePopup";
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
import ConfirmationCodeByPhonePopup
    from "@/components/organisms/popups/authorization/confirmation-code-popup/by-phone/ConfirmationCodeByPhonePopup";
import {createPortal} from "react-dom";

const wrapperCV: ClassValue[] = [
    "hidden w-full px-[90px] xl:px-[100px] py-4 bg-white lg:flex flex-row",
    "items-center lg:gap-6 xl:gap-[30px] sticky top-[0px] z-30"
]

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
        case 'confirmationCodeByPhone' :
            return <ConfirmationCodeByPhonePopup/>
        case "loginByPhone" :
            return <LoginByPhonePopup/>
        case "changePassword" :
            return <ChangePasswordPopup/>
        case "success" :
            return <SuccessPopup/>
    }

}

const Searchbar = () => {

    const [name, setName, toggleCatalogPopup] = useUnit([$searchValue, searchCatalogByNameEvent, toggleCatalogPopupEvent])
    const {isLaptop, ...searchbarContext} = useSearchbar()

    return (
        <React.Fragment>
            {typeof window !== "undefined" ? createPortal(<CatalogPopup/>, document.body) : null}
            {typeof window !== "undefined" ? createPortal(<ActivePopup/>, document.body) : null}
            <div className={cn(wrapperCV)}>
                <img
                    src={DIOLogo.src} alt={'Логотип DIO'} className={"size-[50px] aspect-square pointer"}
                    onClick={searchbarContext.handleLogoClick}
                />
                <div className={"w-full flex flex-row lg:gap-3 xl:gap-[20px] items-center"}>
                    <Button
                        classNames={{button : "lg:p-0 lg:size-[52px] xl:px-[50px] xl:h-[60px] xl:w-fit rounded-lg xl:rounded-xl"}}
                        icon={<FiMenu className={"stroke-white size-5"}/>}
                        text={isLaptop ? "Каталог" : undefined}
                        onClick={toggleCatalogPopup}
                    />
                    <SearchInput
                        hasPopover hasLink
                        placeholder={"Поиск товаров"}
                        onChange={setName}
                        value={name}
                    />
                </div>
                <SearchbarIconButtonList/>
            </div>
        </React.Fragment>
    )
}

export default Searchbar
