import React, {useEffect, useState} from 'react';
import {useUnit} from "effector-react";
import {$userCredentials} from "@/app/(customer)/model";
import {LegalPartnerSettings as LegalPartnerSettingsProps, updateLegalSettingsFx} from "@/app/(customer)/profile/settings/model";
import {usePathname, useRouter} from "next/navigation";
import {FieldValues, Form, FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Snackbar from "@/components/organisms/snackbar/Snackbar";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Button from "@/components/atoms/buttons/button/Button";
import {userInputsGrid} from "@/app/(customer)/profile/settings/roles/UserSettings";
import {secondStepData} from "@/data/forms/legalEntityData";
import {LegalSettingsData, LegalSettingsSchema} from "@/schemas/customer/profile/LegalSettingsData";
import {FiPlus} from "react-icons/fi";

const LegalPartnerSettings = () => {

    const [userCredentials, updateUserSettings] = useUnit([$userCredentials, updateLegalSettingsFx])

    const router = useRouter()
    const pathname = usePathname()

    const methods = useForm<LegalSettingsData>({
        resolver: zodResolver(LegalSettingsSchema),
        mode: "onSubmit"
    })

    useEffect(() => {
        console.log(methods.formState.errors)
    }, [methods.formState.errors]);

    const onSubmit = (formData: FieldValues) => {

        const {
            firstName,
            lastName,
            phoneNumber,
            email,
            ...data
        } = formData as LegalSettingsData

        const req = {
            legalPartnerDto: data,
            changeUserDataDto: {firstName, lastName, phoneNumber, email}
        }

        updateUserSettings(req as LegalPartnerSettingsProps)
            .then(_ => setRequestSuccess(true))
            .catch(_ => setRequestSuccess(false))

    }

    const [requestSuccess, setRequestSuccess] = useState<boolean | undefined>(undefined)
    const headerSnackbar = requestSuccess ? "Изменения сохранены!" : "Возникла ошибка при сохранении изменений"

    const handleChangePassword = () => router.push(pathname.concat("/change-password"))

    useEffect(() => {
        methods.reset({
            ...userCredentials?.legalPartner,
            firstName: userCredentials?.fullName.split(" ")[0],
            lastName: userCredentials?.fullName.split(" ")[1],
            email: userCredentials?.email,
            phoneNumber: userCredentials?.phoneNumber
        })
    }, [userCredentials])

    return (
        <FormProvider {...methods}>
            <Snackbar
                onClose={() => setRequestSuccess(undefined)}
                open={requestSuccess !== undefined}
                success={requestSuccess === true}
                header={headerSnackbar}
            />
            <Form className={"w-full sm:col-span-9 flex flex-col gap-5"}>
                <BackgroundBlockWrapper
                    header={'Основная информация'}
                    rightContent={
                        <Button
                            onClick={handleChangePassword}
                            icon={<FiPlus size={"18px"}/>}
                            buttonType={"SECONDARY"}
                            text={"Изменить пароль"}
                            size={"sm"}
                        />
                    }
                >
                    {userInputsGrid.map((input, key) => (
                        <ControlledTextInput {...input} theme={"filled"} key={key}/>
                    ))}
                </BackgroundBlockWrapper>
                <BackgroundBlockWrapper header={'Дополнительная информация'}>
                    {secondStepData.map((input, key) => (
                        <ControlledTextInput
                            classNames={{wrapper: "col-span-1"}}
                            theme={"filled"} {...input} key={key}
                        />
                    ))}
                </BackgroundBlockWrapper>
                <Button
                    disabled={methods.formState.isSubmitting}
                    text={methods.formState.isSubmitting ? "Отправка.." : "Сохранить изменения"}
                    onClick={methods.handleSubmit(onSubmit)}
                    classNames={{button: "sm:w-1/4 w-full"}}
                />
            </Form>
        </FormProvider>
    );

};

export default LegalPartnerSettings;