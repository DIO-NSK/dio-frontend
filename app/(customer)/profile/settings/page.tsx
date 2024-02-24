"use client"

import React, {useState} from 'react';
import UserProfileWrapper from "@/components/wrappers/user-profile-wrapper/UserProfileWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import {usePathname, useRouter} from "next/navigation";
import {FiX} from "react-icons/fi";
import {useNavigation} from "@/utlis/hooks/useNavigation";

const UserProfileSettingsPage = () => {

    const navigation = useNavigation()

    const router = useRouter()
    const pathname = usePathname()

    const [username, setUsername] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const handleSaveChanges = () => console.log("Saved Changes")
    const handleChangePassword = () => router.push(pathname.concat("/change-password"))

    const userInputsGrid = [
        {
            labelText: "Имя",
            placeholder: "Введите имя",
            value: username,
            onChange: setUsername
        }, {
            labelText: "Фамилия",
            placeholder: "Введите фамилию",
            value: surname,
            onChange: setSurname
        }, {
            labelText: "Номер телефона",
            placeholder: "+7 (___) ___-__-__",
            inputMask: "+9 (999) 999-99-99",
            value: phoneNumber,
            onChange: setPhoneNumber
        }, {
            labelText: "Электронная почта",
            placeholder: "example@gmail.com",
            value: email,
            onChange: setEmail
        },
    ]

    return (
        <UserProfileWrapper>
            <HeaderRow
                header={"Настройки аккаунта"}
                rightContent={
                    <FiX
                        size={"20px"}
                        className={"sm:hidden flex"}
                        onClick={navigation.back}
                    />
                }
            />
            <BackgroundBlockWrapper>
                {userInputsGrid.map((input, key) =>
                    <TextInput key={key} theme={"filled"} {...input} />
                )}
            </BackgroundBlockWrapper>
            <div className={"col-span-full flex flex-col gap-3 sm:flex-row sm:gap-5"}>
                <Button text={"Сохранить изменения"} onClick={handleSaveChanges}/>
                <Button buttonType={"SECONDARY"} text={"Изменить пароль"} onClick={handleChangePassword}/>
            </div>
        </UserProfileWrapper>
    );
};

export default UserProfileSettingsPage;
