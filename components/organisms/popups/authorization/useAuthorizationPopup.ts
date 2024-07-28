import {useStore} from "@/store/Store";
import {SelectItem} from "@/types/props/SelectItem";

export const useAuthorizationPopup = () => {

    const switchPopupState = useStore(state => state.switchPopupState)

    const multiselectElements: SelectItem<number>[] = [
        {name: "Войти", value: 0},
        {name: "Зарегистрироваться", value: 1}
    ]

    const handleSelectElement = (element: SelectItem<number>) => {
        element.name === "Зарегистрироваться" ? switchPopupState("signup") :
            element.name === "Войти" && switchPopupState("login")
    }

    return {
        switchPopupState,
        handleSelectElement,
        multiselectElements
    }

}