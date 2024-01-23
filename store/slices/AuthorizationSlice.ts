import {StateCreator} from "zustand";

type PopupState = "login" | "loginByPhone" | "signup" | "confirmationCode"
    | "forgotPassword" | "changePassword" | "success" | undefined

export type AuthorizationSlice = {

    catalogPopupState : boolean,
    setCatalogPopupState : (isOpen : boolean) => void,

    popupState: PopupState,
    multiselectElements: string[],

    username: string,
    phoneNumber: string,
    password: string,
    confirmationCode: string,

    newPassword : string,
    repeatedPassword : string,

    setUsername: (username: string) => void,
    setPhoneNumber: (phoneNumber: string) => void,
    setPassword: (password: string) => void,
    setConfirmationCode: (confirmationCode: string) => void,
    switchPopupState: (popupState: PopupState) => void,

    setNewPassword : (newPassword : string) => void,
    setRepeatedPassword : (repeatedPassword : string) => void,

}

export const authorizationSlice: StateCreator<AuthorizationSlice, [], [], AuthorizationSlice> = (set) => ({

    catalogPopupState : false,

    popupState: undefined,
    multiselectElements: ["Войти", "Зарегистрироваться"],

    username: "",
    phoneNumber: "",
    password: "",
    confirmationCode: "",

    newPassword : "",
    repeatedPassword : "",

    setUsername: (username: string) => set({username: username}),
    setPhoneNumber: (phoneNumber: string) => set({phoneNumber: phoneNumber}),
    setPassword: (password: string) => set({password: password}),
    switchPopupState: (popupState: PopupState) => set({popupState: popupState}),
    setConfirmationCode: (confirmationCode: string) => set({confirmationCode: confirmationCode}),

    setNewPassword: (newPassword: string) => set({newPassword: newPassword}),
    setRepeatedPassword: (repeatedPassword: string) => set({repeatedPassword: repeatedPassword}),

    setCatalogPopupState : (isOpen : boolean) => set({catalogPopupState : isOpen})

})