import {useStore} from "@/store/Store";

export const useSignUpPopup = () => {

    const switchPopupState = useStore(state => state.switchPopupState)

    const handleConfirmPhoneNumberClick = () => switchPopupState("confirmationCode")
    const handleRegisterLegalEntityClick = () => console.log("Legal entity")

    return {
        handleConfirmPhoneNumberClick, handleRegisterLegalEntityClick
    }

}