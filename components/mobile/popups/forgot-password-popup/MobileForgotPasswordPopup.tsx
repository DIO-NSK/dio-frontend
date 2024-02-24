import React, {useState} from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import Text from "@/components/atoms/text/text-base/Text";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";

const message =
    `Вам на телефон поступит звонок.
     Введите 4 последних цирфы
     номера для сброса пароля`

const MobileForgotPasswordPopup = ({onClose}: { onClose: () => void }) => {

    const [code, setCode] = useState<string>("")
    const handleChangePassword = () => console.log("Password changed")
    const handleSendCode = () => console.log("Code was sent!")

    return (
        <InnerPageWrapper classNames={{mobileWrapper: "fixed z-40 left-0 top-0 gap-5"}}>
            <HeaderRow
                rightContent={<FiX onClick={onClose}/>}
                theme={"bordered"}
                header={"Забыли пароль?"}
            />
            <Text text={message} className={"text-text-gray"}/>
            <TextInput
                labelText={"Код подтверждения"}
                placeholder={"Введите код подтверждения"}
                value={code} onChange={setCode}
            />
            <section className={"w-full flex flex-col gap-3"}>
                <Button
                    text={"Подтвердить"}
                    onClick={handleChangePassword}
                />
                <Button
                    text={"Отправить код заново — 0:43"}
                    onClick={handleSendCode}
                    buttonType={"SECONDARY"}
                />
            </section>
        </InnerPageWrapper>
    );
};

export default MobileForgotPasswordPopup;
