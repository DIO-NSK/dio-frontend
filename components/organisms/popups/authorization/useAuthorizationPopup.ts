import {useStore} from "@/store/Store";

export const useAuthorizationPopup = () => {

    const switchPopupState = useStore(state => state.switchPopupState)
    const multiselectElements = useStore(state => state.multiselectElements)

    const handleSelectElement = (element : string) => {
        element === "Зарегистрироваться" ? switchPopupState("signup") :
            element === "Войти" && switchPopupState("login")
    }

    return {
        switchPopupState,
        handleSelectElement,
        multiselectElements
    }

}