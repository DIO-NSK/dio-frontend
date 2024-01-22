import {useStore} from "@/store/Store";

export const useLoginByPhonePopup = () => {

    const switchPopupState = useStore(state => state.switchPopupState)
    const handleConfirmPhoneNumber = () => switchPopupState("confirmationCode")
    const handleLoginByPassword = () => switchPopupState("login")

    return {
        handleConfirmPhoneNumber, handleLoginByPassword
    }

}