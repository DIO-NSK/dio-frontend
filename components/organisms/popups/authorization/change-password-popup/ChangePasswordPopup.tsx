import React from 'react';
import Text from "@/components/atoms/text/text-base/Text";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import {
    useChangePasswordPopup
} from "@/components/organisms/popups/authorization/change-password-popup/ChangePasswordPopup.hooks";

const ChangePasswordPopup = () => {

    const {...context} = useChangePasswordPopup()

    return (
        <PopupWrapper>
            <div className={"w-[450px] rounded-xl bg-white flex flex-col gap-5"}>

                <Text
                    text={"Новый пароль"}
                    className={"text-[20px] font-medium"}
                />

                <TextInput
                    labelText={"Новый пароль"}
                    placeholder={"Придумайте новый пароль"}
                    onChange={context.newPasswordInput.setNewPassword}
                    value={context.newPasswordInput.newPassword}
                    isPassword
                />

                <TextInput
                    labelText={"Повторите пароль"}
                    placeholder={"Наберите пароль заново"}
                    onChange={context.repeatedPassword.setRepeatedPassword}
                    value={context.repeatedPassword.repeatedPassword}
                    isPassword
                />

                <div className={"w-full flex flex-col gap-3"}>
                    <Button text={"Сменить пароль"} onClick={context.handleConfirmChangePassword}/>
                    <Button
                        buttonType={"SECONDARY"}
                        text={"Войти заново"}
                        onClick={context.handleLogin}
                    />
                </div>

            </div>
        </PopupWrapper>
    );
};

export default ChangePasswordPopup;
