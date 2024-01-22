import React from 'react';
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {useAuthorizationPopup} from "@/components/organisms/popups/authorization/useAuthorizationPopup";
import {useSignUpPopup} from "@/components/organisms/popups/authorization/signup-popup/SignUpPopup.hooks";

const SignUpPopup = () => {

    const {...authContext} = useAuthorizationPopup()
    const {...signUpContext} = useSignUpPopup()

    return (
        <PopupWrapper>
            <div className={"w-[450px] rounded-xl bg-white flex flex-col gap-5"}>
                <MultiselectButton
                    activeElement={authContext.multiselectElements[1]}
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
                    labelText={"Имя пользователя"}
                    placeholder={"Иванов Иван Иванович"}
                    onChange={authContext.usernameInput.setUsername}
                    value={authContext.usernameInput.username}
                />
                <TextInput
                    labelText={"Пароль"}
                    placeholder={"Введите пароль"}
                    onChange={authContext.passwordInput.setPassword}
                    value={authContext.passwordInput.password}
                    isPassword
                />
                <div className={"w-full flex flex-col items-center gap-5"}>
                    <Button
                        classNames={{button : "w-full"}}
                        text={"Подтвердить номер телефона"}
                        onClick={signUpContext.handleConfirmPhoneNumberClick}
                    />
                    <TextButton
                        onClick={signUpContext.handleRegisterLegalEntityClick}
                        text={"Регистрация юридического лица"}
                    />
                </div>
            </div>
        </PopupWrapper>
    )
};

export default SignUpPopup;
