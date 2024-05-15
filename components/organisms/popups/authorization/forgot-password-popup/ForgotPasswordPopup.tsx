"use client"

import React, {useEffect, useState} from 'react';
import Button from "@/components/atoms/buttons/button/Button";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import {PopupProps} from "@/types/props/Popup";
import {FieldValues, Form, FormProvider, useForm} from "react-hook-form";
import {LoginByPhoneData, LoginByPhoneSchema} from "@/schemas/customer/authorization/LoginByPhoneSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {useUnit} from "effector-react";
import {
    sendConfirmationCodePasswordFx,
    setPasswordPhoneNumberEvent
} from "@/components/organisms/popups/authorization/forgot-password-popup/model";
import {useStore} from "@/store/Store";

const message = 'Введите номер телефона, привязанный к вашему аккаунту. Вам придет SMS с кодом для подтверждения'

const ForgotPasswordPopup = (props: PopupProps) => {

    const methods = useForm<LoginByPhoneData>({
        resolver: zodResolver(LoginByPhoneSchema),
        mode: "onSubmit"
    })

    const setPasswordPhoneNumber = useUnit(setPasswordPhoneNumberEvent)
    const switchPopupState = useStore(state => state.switchPopupState)
    const sendConfirmationCode = useUnit(sendConfirmationCodePasswordFx)
    const {handleSubmit, formState: {isSubmitting}} = methods

    const [error, setError] = useState<string>('')

    const onSubmit = (fieldValues: FieldValues) => {
        sendConfirmationCode(fieldValues as LoginByPhoneData)
            .then(_ => {
                setPasswordPhoneNumber((fieldValues as LoginByPhoneData).phoneNumber)
                switchPopupState('changePassword')
            })
            .catch(message => setError(message))
    }

    useEffect(() => {
        setPasswordPhoneNumber(null)
    }, []);

    return (
        <FormProvider {...methods}>
            <PopupWrapper onClose={props.onClose}>
                <Form className={"w-[450px] rounded-xl bg-white flex flex-col gap-5"}>
                    <Text
                        text={"Забыли пароль?"}
                        className={"text-[20px] font-medium"}
                    />
                    <Text
                        className={"text-text-gray"}
                        text={message}
                    />
                    <ControlledTextInput
                        labelText={"Номер телефона"}
                        placeholder={"+_ (___) ___-__-__"}
                        inputMask={"+7 (999) 999-99-99"}
                        name={"phoneNumber"}
                    />
                    {error.length !== 0 && <Text className={"text-red-500"} text={error}/>}
                    <Button
                        text={isSubmitting ? "Отправка.." : "Отправить код"}
                        onClick={handleSubmit(onSubmit)}
                    />
                </Form>
            </PopupWrapper>
        </FormProvider>
    );
};

export default ForgotPasswordPopup;
