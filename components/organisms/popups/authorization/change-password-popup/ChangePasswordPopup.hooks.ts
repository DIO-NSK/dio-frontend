import {useStore} from "@/store/Store";
import {useShallow} from "zustand/react/shallow";

export const useChangePasswordPopup = () => {

    const switchPopupState = useStore(state => state.switchPopupState)

    // new password input
    const [newPassword, setNewPassword] = useStore(
        useShallow(state => [state.newPassword, state.setNewPassword])
    )

    // repeated password input
    const [repeatedPassword, setRepeatedPassword] = useStore(
        useShallow(state => [state.repeatedPassword, state.setRepeatedPassword])
    )

    const handleConfirmChangePassword = () => console.log("Some request")
    const handleLogin = () => switchPopupState("login")

    return {
        newPasswordInput : {newPassword, setNewPassword},
        repeatedPassword : {repeatedPassword, setRepeatedPassword},
        handleConfirmChangePassword, handleLogin
    }

}