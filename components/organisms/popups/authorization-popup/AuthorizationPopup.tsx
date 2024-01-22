"use client"

import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import {useAuthorizationPopup} from "@/components/organisms/popups/authorization-popup/AuthorizationPopup.hooks";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {PopupProps} from "@/types/props/Popup";

const AuthorizationPopup = (props : PopupProps) => {

    const {...authContext} = useAuthorizationPopup()

    return (
        <PopupWrapper {...props}>
            <div className={"w-[500px] rounded-xl bg-white flex flex-col gap-5"}>
                <MultiselectButton
                    activeElement={authContext.activeElement}
                    elements={authContext.multiselectElements}
                    selectElement={authContext.setActive}
                />
                <TextInput
                    labelText={"Телефон"}
                    placeholder={"+7 (___) ___-__-__"}
                    inputMask={"+7 (999) 999-99-99"}
                    onChange={authContext.setPhone}
                    value={authContext.phone}
                />
                <TextInput
                    labelText={"Пароль"}
                    placeholder={"Введите пароль"}
                    onChange={authContext.setPassword}
                    value={authContext.password}
                    isPassword
                />
                <div className={"w-full flex flex-col items-center gap-5"}>
                    <div className={"w-full flex flex-col gap-3"}>
                        <Button text={"Войти"} onClick={authContext.handleLoginClick}/>
                        <Button
                            buttonType={"SECONDARY"}
                            text={"Войти по номеру телефона"}
                            onClick={authContext.handleLoginByPhoneClick}
                        />
                    </div>
                    <TextButton
                        onClick={authContext.handleForgotPasswordClick}
                        text={"Забыли пароль?"}
                    />
                </div>

            </div>
        </PopupWrapper>
    );

};

export default AuthorizationPopup;
