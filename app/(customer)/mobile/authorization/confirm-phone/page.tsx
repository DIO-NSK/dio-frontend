"use client"

import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import {useNavigation} from "@/utlis/hooks/useNavigation";
import {useState} from "react";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";

const MobileConfirmNumberPage = () => {

    const navigation = useNavigation()
    const [code, setCode] = useState<string>("")
    const handleConfirmCode = () => navigation.push("/mobile/authorization/registration-success")
    const handleSendCode = () => console.log("Code was sent!")

    return (
        <InnerPageWrapper>
            <HeaderRow
                rightContent={<FiX onClick={navigation.back}/>}
                header={"Подтверждение номера"}
                theme={"bordered"}
            />
            <TextInput
                placeholder={"Введите код подтверждения"}
                labelText={"Код подтверждения"}
                onChange={setCode}
                value={code}
            />
            <Button
                classNames={{button : "w-full"}}
                onClick={handleConfirmCode}
                text={"Зарегистрироваться"}
            />
        </InnerPageWrapper>
    );
};

export default MobileConfirmNumberPage;
