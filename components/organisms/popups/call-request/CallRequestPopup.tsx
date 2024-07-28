"use client"

import React, {useEffect, useState} from 'react';
import {FieldValues, Form, FormProvider, useForm} from "react-hook-form";
import {CallRequestData, CallRequestSchema} from "@/schemas/customer/CallRequestSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import {useUnit} from "effector-react";
import {
    $isCallRequestOpen,
    sendCallRequestFx,
    toggleCallRequestOpenEvent,
    UserCallRequest
} from "@/components/organisms/popups/call-request/model";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import ControlledTextArea from "@/components/atoms/inputs/controlled-text-area/ControlledTextArea";
import Button from "@/components/atoms/buttons/button/Button";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {$userCredentials, getUserCredentialsEvent} from "@/app/(customer)/model";
import Snackbar from "@/components/organisms/snackbar/Snackbar";

const CallRequestPopup = () => {

    const [getUserCredentials, userCredentials] = useUnit([getUserCredentialsEvent, $userCredentials])
    const [popupState, togglePopupState] = useUnit([$isCallRequestOpen, toggleCallRequestOpenEvent])
    const sendCallRequest = useUnit(sendCallRequestFx)

    const [requestSuccess, setRequestSuccess] = useState<boolean | undefined>(undefined)
    const headerSnackbar = requestSuccess ? "Заявка на звонок отправлена!" : "Произошла ошибка"
    const messageSnackbar = requestSuccess ? "В скором времени с вами свяжется специалист" : "Заполните данные заново и попробуйте снова"

    const methods = useForm<CallRequestData>({
        resolver: zodResolver(CallRequestSchema),
        mode: "onSubmit"
    })

    const {
        handleSubmit,
        formState: {isSubmitting}, reset
    } = methods

    const onSubmit = (fieldValues: FieldValues) => {
        sendCallRequest(fieldValues as UserCallRequest)
            .then(_ => setRequestSuccess(true))
            .catch(_ => setRequestSuccess(false))
    }

    useEffect(() => {
        reset({
            phoneNumber: userCredentials?.phoneNumber,
            fullName: userCredentials?.fullName
        })
    }, [userCredentials])

    useEffect(() => {
        getUserCredentials()
    }, [])

    if (popupState) return (
        <PopupWrapper onClose={togglePopupState}>
            <Snackbar
                success={requestSuccess === true}
                header={headerSnackbar}
                message={messageSnackbar}
                action={togglePopupState}
                open={requestSuccess !== undefined}
                onClose={() => setRequestSuccess(undefined)}
            />
            <HeaderRow header={"Заказать звонок"}/>
            <FormProvider {...methods}>
                <Form className={"w-[500px] rounded-xl bg-white flex flex-col gap-5"}>
                    <ControlledTextInput
                        disabled={isSubmitting}
                        labelText={"ФИО"}
                        placeholder={"Иванов Иван Иванович"}
                        name={"fullName"}
                    />
                    <ControlledTextInput
                        disabled={isSubmitting}
                        inputMask={"+7 (999) 999-99-99"}
                        labelText={"Номер телефона"}
                        placeholder={"+7 (___) ___-__-__"}
                        name={"phoneNumber"}
                    />
                    <ControlledTextArea
                        labelText={"Комментарий"}
                        placeholder={"Введите здесь"}
                        name={"comment"}
                    />
                    <Button
                        text={isSubmitting ? "Отправка.." : "Отправить"}
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                    />
                </Form>
            </FormProvider>
        </PopupWrapper>
    );

};

export default CallRequestPopup;