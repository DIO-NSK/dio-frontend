"use client"

import React, {useState} from 'react';
import UserProfileWrapper from "@/components/wrappers/user-profile-wrapper/UserProfileWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import ForgotPasswordPopup from "@/components/organisms/popups/authorization/forgot-password-popup/ForgotPasswordPopup";
import MobileForgotPasswordPopup from "@/components/mobile/popups/forgot-password-popup/MobileForgotPasswordPopup";
import axios from "axios";
import {Auth} from "@/types/AuthContextType";

const UserProfileChangePasswordPage = () => {

    const [isPopupOpen, setPopupOpen] = useState<boolean>(false)
    const [oldPassword, setOldPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")

    const handleSaveChanges = async () => {
        const response = await axios.put<Auth>(
            `https://diowater.ru/api/user/refresh`, null, {withCredentials : true})
        localStorage.setItem("ACCESS_TOKEN", response.data.accessToken)
    }
    const handleSwitchPopupState = () => setPopupOpen(!isPopupOpen)

    return (
        <UserProfileWrapper>
            {
                isPopupOpen && <>
                    <ForgotPasswordPopup
                        onClose={handleSwitchPopupState}
                    />
                    <MobileForgotPasswordPopup
                        onClose={handleSwitchPopupState}
                    />
                </>
            }
            <HeaderRow
                hasBackIcon
                header={"Изменение пароля"}
                rightContent={
                    <TextButton
                        className={"hidden sm:flex"}
                        onClick={handleSwitchPopupState}
                        text={"Забыли пароль?"}
                    />
                }
            />
            <BackgroundBlockWrapper>
                <TextInput
                    labelText={"Старый пароль"} placeholder={"Введите старый пароль"}
                    value={oldPassword} onChange={setOldPassword}
                    isPassword theme={"filled"}
                />
                <TextInput
                    labelText={"Новый пароль"} placeholder={"Введите новый пароль"}
                    value={newPassword} onChange={setNewPassword}
                    isPassword theme={"filled"}
                />
            </BackgroundBlockWrapper>
            <div className={"w-full flex flex-col sm:items-start items-center gap-3"}>
                <Button
                    classNames={{button: "sm:w-[250px] w-full"}}
                    text={"Сохранить изменения"}
                    onClick={handleSaveChanges}
                />
                <TextButton
                    className={"text-base sm:hidden"}
                    onClick={handleSwitchPopupState}
                    text={"Забыли пароль?"}
                />
            </div>
        </UserProfileWrapper>
    );

};

export default UserProfileChangePasswordPage;
