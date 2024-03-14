import React, {useEffect} from 'react';
import {FieldValues, Form, FormProvider, useForm} from "react-hook-form";
import {CallRequestData, CallRequestSchema} from "@/schemas/customer/CallRequestSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import {useUnit} from "effector-react";
import {
    $isCallRequestOpen,
    sendCallRequestEvent,
    toggleCallRequestOpenEvent, UserCallRequest
} from "@/components/organisms/popups/call-request/model";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import ControlledTextArea from "@/components/atoms/inputs/controlled-text-area/ControlledTextArea";
import Button from "@/components/atoms/buttons/button/Button";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {$userCredentials, getUserCredentialsFx} from "@/app/(customer)/model";

const CallRequestPopup = () => {

    const [getUser, userCredentials] = useUnit([getUserCredentialsFx, $userCredentials])
    const [popupState, togglePopupState] = useUnit([$isCallRequestOpen, toggleCallRequestOpenEvent])
    const sendCallRequest = useUnit(sendCallRequestEvent)

    const methods = useForm<CallRequestData>({
        resolver: zodResolver(CallRequestSchema),
        mode: "onBlur"
    })

    const {
        handleSubmit,
        formState: {isSubmitting}, reset
    } = methods

    const onSubmit = (fieldValues: FieldValues) => {
        sendCallRequest(fieldValues as UserCallRequest)
    }

    useEffect(() => {
        reset({
            phoneNumber: userCredentials?.phoneNumber,
            fullName: userCredentials?.fullName
        })
    }, [userCredentials])

    useEffect(() => {
        const userId = localStorage.getItem("userId")
        if (userId) getUser(+userId)
    }, [])

    if (popupState) return (
        <PopupWrapper onClose={togglePopupState}>
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