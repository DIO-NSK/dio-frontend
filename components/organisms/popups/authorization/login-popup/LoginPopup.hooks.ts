import {useStore} from "@/store/Store";

export const useLoginPopup = () => {

    const switchPopupState = useStore(state => state.switchPopupState)

    const handleLoginClick = () => switchPopupState("success")
    const handleForgotPasswordClick = () => switchPopupState("forgotPassword")
    const handleLoginByPhoneClick = () => switchPopupState("loginByPhone")

    return {
        handleForgotPasswordClick, handleLoginByPhoneClick,
        handleLoginClick
    }

}