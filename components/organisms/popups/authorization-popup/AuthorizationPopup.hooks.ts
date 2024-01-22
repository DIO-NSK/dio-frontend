import {useState} from "react";

export const useAuthorizationPopup = () => {

    // multiselect button
    const multiselectElements: string[] = ["Войти", "Зарегистрироваться"]
    const [activeElement, setActive] = useState<string>(multiselectElements[0])

    // password input
    const [password, setPassword] = useState<string>()

    // phone input
    const [phone, setPhone] = useState<string>()

    const handleLoginClick = () => console.log("Login")
    const handleLoginByPhoneClick = () => console.log("Login by phone")
    const handleForgotPasswordClick = () => console.log("Forgot password")

    return {
        multiselectElements, activeElement, setActive,
        password, setPassword, phone, setPhone,
        handleLoginClick, handleLoginByPhoneClick,
        handleForgotPasswordClick
    }

}