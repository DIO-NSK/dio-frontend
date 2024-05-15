"use client"

import {useState} from 'react';
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import {useNavigation} from "@/utlis/hooks/useNavigation";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";

const message =
    `Вам на телефон придет СМС-уведомление.
     Введите код для сброса пароля`

const MobileForgotPasswordPage = () => {

    const navigation = useNavigation()
    const [code, setCode] = useState<string>("")

    const handleSendCode = () => console.log("Code was sent")

    return (
        <InnerPageWrapper classNames={{mobileWrapper : "gap-5"}}>
            <HeaderRow
                rightContent={<FiX onClick={navigation.back}/>}
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
                    text={"Войти"}
                    onClick={() => navigation.push("/mobile/authorization/new-password")}
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

export default MobileForgotPasswordPage;
