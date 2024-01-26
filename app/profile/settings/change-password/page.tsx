"use client"

import React, {useState} from 'react';
import UserProfileWrapper from "@/components/wrappers/user-profile-wrapper/UserProfileWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import ForgotPasswordPopup from "@/components/organisms/popups/authorization/forgot-password-popup/ForgotPasswordPopup";

const UserProfileChangePasswordPage = () => {

    const [isPopupOpen, setPopupOpen] = useState<boolean>(false)
    const [oldPassword, setOldPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")

    const handleSaveChanges = () => console.log("Change password")
    const handleSwitchPopupState = () => setPopupOpen(!isPopupOpen)

    return (
        <UserProfileWrapper>
            {
                isPopupOpen && <ForgotPasswordPopup
                    onClose={handleSwitchPopupState}
                />
            }
            <HeaderRow
                hasBackIcon
                header={"Изменение пароля"}
                rightContent={
                    <TextButton
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
            <Button
                classNames={{button : "w-[250px]"}}
                text={"Сохранить изменения"}
                onClick={handleSaveChanges}
            />
        </UserProfileWrapper>
    );

};

export default UserProfileChangePasswordPage;
