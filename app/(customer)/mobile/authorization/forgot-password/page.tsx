"use client"

import React, {useEffect, useState} from 'react';
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {LoginByPhoneData, LoginByPhoneSchema} from "@/schemas/customer/authorization/LoginByPhoneSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUnit} from "effector-react";
import {
    sendConfirmationCodePasswordFx,
    setPasswordPhoneNumberEvent
} from "@/components/organisms/popups/authorization/forgot-password-popup/model";
import {useRouter} from "next/navigation";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";

const message =
    `Вам на телефон придет СМС-уведомление.
     Введите код для сброса пароля`

const MobileForgotPasswordPage = () => {

    const router = useRouter()

    const methods = useForm<LoginByPhoneData>({
        resolver: zodResolver(LoginByPhoneSchema),
        mode: "onSubmit"
    })

    const setPasswordPhoneNumber = useUnit(setPasswordPhoneNumberEvent)
    const sendConfirmationCode = useUnit(sendConfirmationCodePasswordFx)
    const {handleSubmit, formState: {isSubmitting}} = methods

    const [error, setError] = useState<string>('')

    const onSubmit = (fieldValues: FieldValues) => {
        sendConfirmationCode(fieldValues as LoginByPhoneData)
            .then(_ => {
                setPasswordPhoneNumber((fieldValues as LoginByPhoneData).phoneNumber)
                router.push('/mobile/authorization/confirm-phone/forgot-password')
            })
            .catch(message => setError(message))
    }

    useEffect(() => {
        setPasswordPhoneNumber(null)
    }, []);


    return (
        <InnerPageWrapper classNames={{mobileWrapper: "gap-5"}}>
            <FormProvider {...methods}>
                <HeaderRow
                    rightContent={<FiX onClick={router.back}/>}
                    theme={"bordered"} header={"Забыли пароль?"}
                />
                <Text text={message} className={"text-text-gray"}/>
                <div className={'flex flex-col gap-2'}>
                    <ControlledTextInput
                        labelText={"Номер телефона"}
                        placeholder={"+7 (000)-000-00-00"}
                        inputMask={"+7 (999) 999-99-99"}
                        name={"phoneNumber"}
                    />
                    {error.length !== 0 && <Text
                        className={"text-sm text-red-500"}
                        text={error}
                    />}
                </div>
                <Button
                    text={isSubmitting ? "Отправка.." : "Отправить код"}
                    onClick={handleSubmit(onSubmit)}
                />
            </FormProvider>
        </InnerPageWrapper>
    );

};

export default MobileForgotPasswordPage;
