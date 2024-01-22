import React from 'react';
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import {useAuthorizationPopup} from "@/components/organisms/popups/authorization/useAuthorizationPopup";
import {useLoginByPhonePopup} from "@/components/organisms/popups/authorization/login-by-phone-popup/LoginByPhonePopup.hooks";

const LoginByPhonePopup = () => {

    const {...authContext} = useAuthorizationPopup()
    const {...loginContext} = useLoginByPhonePopup()

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
                <div className={"w-full flex flex-col gap-3"}>
                    <Button
                        text={"Подтвердить номер телефона"}
                        onClick={loginContext.handleConfirmPhoneNumber}
                    />
                    <Button
                        buttonType={"SECONDARY"}
                        text={"Войти с помощью пароля"}
                        onClick={loginContext.handleLoginByPassword}
                    />
                </div>
            </div>
        </PopupWrapper>
    );

};

export default LoginByPhonePopup;
