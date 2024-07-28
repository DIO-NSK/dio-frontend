"use client"

import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";
import {useUnit} from "effector-react";
import {$userCredentials} from "@/app/(customer)/model";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import Form from "@/components/atoms/form/Form";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import ControlledTextArea from "@/components/atoms/inputs/controlled-text-area/ControlledTextArea";
import Button from "@/components/atoms/buttons/button/Button";
import {sendCallRequestFx} from "@/components/organisms/popups/call-request/model";
import {CallRequestData, CallRequestSchema} from "@/schemas/customer/CallRequestSchema";
import {InputPrefilledData} from "@/types/props/inputs/InputPrefilledData";

const inputData: InputPrefilledData[] = [
    {
        labelText: "ФИО",
        placeholder: "Иванов Иван Иванович",
        name: "fullName"
    }, {
        labelText: "Номер телефона",
        inputMask: "+7 (999) 999-99-99",
        placeholder: "+7 (___) ___-__-__",
        name: "phoneNumber"
    }
]

const MobileOrderCallRequestPage = () => {

    const router = useRouter()

    const [userCredentials, senCallRequest]
        = useUnit([$userCredentials, sendCallRequestFx])

    const methods = useForm<CallRequestData>({
        resolver: zodResolver(CallRequestSchema)
    })

    const {
        handleSubmit,
        formState: {isSubmitting},
        reset
    } = methods

    const onSubmit = (formData: FieldValues) => {
        senCallRequest(formData as CallRequestData)
            .then(_ => router.back())
    }

    useEffect(() => {
        if (userCredentials) {
            reset({
                fullName: userCredentials.fullName,
                phoneNumber: userCredentials.phoneNumber
            })
        }
    }, [userCredentials])

    return (
        <InnerPageWrapper>
            <HeaderRow
                theme={"bordered"}
                rightContent={<FiX onClick={router.back}/>}
                header={"Заказать на звонок"}
            />
            <FormProvider {...methods}>
                <Form className={"gap-4"}>
                    {inputData.map((input, key) => (
                        <ControlledTextInput disabled={isSubmitting} {...input} key={key}/>
                    ))}
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
        </InnerPageWrapper>
    );

};

export default MobileOrderCallRequestPage;