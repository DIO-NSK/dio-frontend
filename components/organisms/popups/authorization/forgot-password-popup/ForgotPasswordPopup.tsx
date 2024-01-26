import React from 'react';
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import {useAuthorizationPopup} from "@/components/organisms/popups/authorization/useAuthorizationPopup";
import {useStore} from "@/store/Store";
import {PopupProps} from "@/types/props/Popup";

const ForgotPasswordPopup = (props : PopupProps) => {

    const {...authContext} = useAuthorizationPopup()

    const switchPopupState = useStore(state => state.switchPopupState)
    const handleConfirmCode = () => switchPopupState("changePassword")

    return (
        <PopupWrapper onClose={props.onClose}>
            <div className={"w-[450px] rounded-xl bg-white flex flex-col gap-5"}>

                <Text
                    text={"Забыли пароль?"}
                    className={"text-[20px] font-medium"}
                />
                <Text
                    text={"Вам на телефон поступит звонок. Введите 4 последних цирфы номера для сброса пароля"}
                    className={"text-text-gray"}
                />

                <TextInput
                    labelText={"Код подтверждения"}
                    placeholder={"0000"}
                    inputMask={"9999"}
                    onChange={authContext.confirmationCodeInput.setConfirmationCode}
                    value={authContext.confirmationCodeInput.confirmationCode}
                />

                <Button text={"Сбросить парль"} onClick={handleConfirmCode}/>

            </div>
        </PopupWrapper>
    );
};

export default ForgotPasswordPopup;
