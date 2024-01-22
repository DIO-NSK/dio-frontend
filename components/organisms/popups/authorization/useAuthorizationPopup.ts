import {useStore} from "@/store/Store";
import {useShallow} from "zustand/react/shallow";

export const useAuthorizationPopup = () => {

    const switchPopupState = useStore(state => state.switchPopupState)
    const multiselectElements = useStore(state => state.multiselectElements)

    // username input
    const [username, setUsername] = useStore(
        useShallow(state => [state.username, state.setUsername])
    )

    // phone number input
    const [phoneNumber, setPhoneNumber] = useStore(
        useShallow(state => [state.phoneNumber, state.setPhoneNumber])
    )

    // password input
    const [password, setPassword] = useStore(
        useShallow(state => [state.password, state.setPassword])
    )

    // confirmation code input
    const [confirmationCode, setConfirmationCode] = useStore(
        useShallow(state => [state.confirmationCode, state.setConfirmationCode])
    )

    const handleSelectElement = (element : string) => {
        element === "Зарегистрироваться" ? switchPopupState("signup") :
            element === "Войти" && switchPopupState("login")
    }

    return {
        handleSelectElement, multiselectElements,
        usernameInput : {username, setUsername},
        passwordInput : {password, setPassword},
        phoneNumberInput : {phoneNumber, setPhoneNumber},
        confirmationCodeInput : {confirmationCode, setConfirmationCode}
    }

}