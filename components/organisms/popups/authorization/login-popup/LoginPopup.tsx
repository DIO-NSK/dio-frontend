"use client"

import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import {useLoginPopup} from "@/components/organisms/popups/authorization/login-popup/LoginPopup.hooks";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {useAuthorizationPopup} from "@/components/organisms/popups/authorization/useAuthorizationPopup";

const LoginPopup = () => {

    const {...loginContext} = useLoginPopup()
    const {...authContext} = useAuthorizationPopup()

    return (
        <PopupWrapper>
            <div className={"w-[450px] rounded-xl bg-white flex flex-col gap-5"}>
                <MultiselectButton
                    activeElement={authContext.multiselectElements[0]}
                    elements={authContext.multiselectElements}
                    selectElement={authContext.handleSelectElement}
                />
                <TextInput
                    labelText={"Телефон"}
                    placeholder={"+7 (___) ___-__-__"}
                    inputMask={"+7 (999) 999-99-99"}
                    onChange={authContext.phoneNumberInput.setPhoneNumber}
                    value={authContext.phoneNumberInput.phoneNumber}
                />
                <TextInput
                    labelText={"Пароль"}
                    placeholder={"Введите пароль"}
                    onChange={authContext.passwordInput.setPassword}
                    value={authContext.passwordInput.password}
                    isPassword
                />
                <div className={"w-full flex flex-col items-center gap-5"}>
                    <div className={"w-full flex flex-col gap-3"}>
                        <Button text={"Войти"} onClick={loginContext.handleLoginClick}/>
                        <Button
                            buttonType={"SECONDARY"}
                            text={"Войти с помощью номера телефона"}
                            onClick={loginContext.handleLoginByPhoneClick}
                        />
                    </div>
                    <TextButton
                        onClick={loginContext.handleForgotPasswordClick}
                        text={"Забыли пароль?"}
                    />
                </div>
            </div>
        </PopupWrapper>
    );

};

export default LoginPopup;
