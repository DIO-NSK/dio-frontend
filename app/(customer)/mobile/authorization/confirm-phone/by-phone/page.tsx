'use client'

import React, {useState} from 'react';
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import Button from "@/components/atoms/buttons/button/Button";
import {useUnit} from "effector-react";
import {
    $loginByPhoneNumber,
    loginByPhonePopupDidMountEvent
} from "@/components/organisms/popups/authorization/login-by-phone-popup/model";
import {
    sendConfirmationCodeByPhoneFx
} from "@/components/organisms/popups/authorization/confirmation-code-popup/by-phone/model";
import {FormProvider, useForm} from "react-hook-form";
import {UserConfirmCodeData, UserConfirmCodeSchema} from "@/schemas/customer/authorization/UserConfirmCodeSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import Text from "@/components/atoms/text/text-base/Text";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";

const MobileConfirmationCodeByPhone = () => {

    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string>('')

    const [loginByPhoneNumber, reset, sendCode]
        = useUnit([$loginByPhoneNumber, loginByPhonePopupDidMountEvent, sendConfirmationCodeByPhoneFx])

    const methods = useForm<UserConfirmCodeData>({
        defaultValues: {
            phoneNumber: loginByPhoneNumber!!,
            code: "",
        },
        resolver: zodResolver(UserConfirmCodeSchema),
        mode: "onSubmit"
    })

    const {handleSubmit, formState: {isSubmitting}} = methods

    const onSubmit = (formData: UserConfirmCodeData) => {
        sendCode(formData)
            .then(_ => {
                router.push('/')
                reset()
            })
            .catch(err => setErrorMessage(err.response.data.message))
    }

    return (
        <InnerPageWrapper>
            <FormProvider {...methods}>
                <HeaderRow
                    rightContent={<FiX onClick={router.back}/>}
                    header={"Подтверждение номера"}
                    theme={"bordered"}
                />
                <div className={'flex flex-col gap-2'}>
                    <Text
                        text={"Подтверждение номера телефона"}
                        className={"text-md font-medium"}
                    />
                    <Text
                        text={"Вам на телефон придет СМС-уведомление. Введите код для входа"}
                        className={"text-text-gray"}
                    />
                </div>
                <div className={'flex flex-col gap-2'}>
                    <ControlledTextInput
                        disabled={isSubmitting}
                        labelText={"Код подтверждения"}
                        placeholder={"0000"}
                        inputMask={"9999"}
                        name={"code"}
                    />
                    {errorMessage.length !== 0 && <Text
                        className={'text-sm text-red-500'}
                        text={errorMessage}
                    />}
                </div>
                <Button
                    text={isSubmitting ? "Отправка.." : "Войти"}
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                />
            </FormProvider>
        </InnerPageWrapper>
    );

};

export default MobileConfirmationCodeByPhone;