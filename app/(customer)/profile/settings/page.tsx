"use client"

import React, {useEffect, useState} from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import Button from "@/components/atoms/buttons/button/Button";
import {usePathname, useRouter} from "next/navigation";
import {FiX} from "react-icons/fi";
import {useNavigation} from "@/utlis/hooks/useNavigation";
import {FieldValues, Form, FormProvider, useForm} from "react-hook-form";
import {UserSettingsData, UserSettingsSchema} from "@/schemas/customer/profile/UserSettingsSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {InputPrefilledData} from "@/types/props/inputs/InputPrefilledData";
import {useUnit} from "effector-react";
import {$userCredentials} from "@/app/(customer)/model";
import {updateUserCredentialsEvent, updateUserSettingsFx} from "@/app/(customer)/profile/settings/model";
import {UserCredentials} from "@/types/dto/user/credentials/UserCredentials";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Snackbar from "@/components/organisms/snackbar/Snackbar";

const userInputsGrid: InputPrefilledData[] = [
    {
        labelText: "Имя",
        placeholder: "Введите имя",
        name: "firstName"
    }, {
        labelText: "Фамилия",
        placeholder: "Введите фамилию",
        name: "lastName"
    }, {
        labelText: "Электронная почта",
        placeholder: "Введите почту",
        name: "email"
    }, {
        labelText: "Номер телефона",
        placeholder: "+7 (___) ___-__-__",
        inputMask: "+9 (999) 999-99-99",
        name: "phoneNumber"
    }
]

const UserProfileSettingsPage = () => {

    const [userCredentials, updateUserSettings]
        = useUnit([$userCredentials, updateUserSettingsFx])

    const navigation = useNavigation()
    const router = useRouter()
    const pathname = usePathname()

    const methods = useForm<UserSettingsData>({
        resolver: zodResolver(UserSettingsSchema),
        mode: "onSubmit"
    })

    const {
        handleSubmit,
        formState: {isSubmitting},
        reset
    } = methods

    const onSubmit = (formData: FieldValues) => updateUserSettings(formData as UserCredentials)
        .then(_ => setRequestSuccess(true))
        .catch(_ => setRequestSuccess(false))

    const [requestSuccess, setRequestSuccess] = useState<boolean | undefined>(undefined)
    const headerSnackbar = requestSuccess ? "Изменения сохранены!" : "Возникла ошибка при сохранении изменений"

    const handleChangePassword = () => router.push(pathname.concat("/change-password"))

    useEffect(() => {
        reset({
            firstName: userCredentials?.fullName.split(" ")[0],
            lastName: userCredentials?.fullName.split(" ")[1],
            email: userCredentials?.email,
            phoneNumber: userCredentials?.phoneNumber
        })
    }, [userCredentials])

    return (
        <FormProvider {...methods}>
            <Snackbar
                success={requestSuccess === true}
                header={headerSnackbar}
                open={requestSuccess !== undefined}
                onClose={() => setRequestSuccess(undefined)}
            />
            <Form className={"w-full sm:col-span-9 flex flex-col gap-5"}>
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
                        <ControlledTextInput key={key} theme={"filled"} {...input} />
                    )}
                </BackgroundBlockWrapper>
                <div className={"col-span-full flex flex-col gap-3 sm:flex-row sm:gap-5"}>
                    <Button
                        disabled={isSubmitting}
                        text={"Сохранить изменения"}
                        onClick={handleSubmit(onSubmit)}
                    />
                    <Button
                        buttonType={"SECONDARY"}
                        text={"Изменить пароль"}
                        onClick={handleChangePassword}
                    />
                </div>
            </Form>
        </FormProvider>

    );
};

export default UserProfileSettingsPage;
