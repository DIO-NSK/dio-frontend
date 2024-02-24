"use client"

import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import {useNavigation} from "@/utlis/hooks/useNavigation";
import {useState} from "react";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";

const MobileLoginByNumberPage = () => {

    const navigation = useNavigation()
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const handleLogin = () => console.log("Logged in!")

    return (
        <InnerPageWrapper classNames={{mobileWrapper : "gap-5"}}>
            <HeaderRow
                rightContent={<FiX onClick={navigation.back}/>}
                leftContent={"По номеру"}
                theme={"bordered"}
                header={"Войти"}
            />
            <TextInput
                labelText={"Номер телефона"}
                placeholder={"+7 (000) 000-00-00"}
                inputMask={"+7 (999) 999-99-99"}
                onChange={setPhoneNumber}
                value={phoneNumber}
            />
            <Button
                onClick={handleLogin}
                text={"Войти"}
            />
        </InnerPageWrapper>
    );
};

export default MobileLoginByNumberPage;
