import React, {useEffect} from 'react';
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FieldValues, Form, FormProvider, useForm} from "react-hook-form";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import ControlledTextArea from "@/components/atoms/inputs/controlled-text-area/ControlledTextArea";
import Button from "@/components/atoms/buttons/button/Button";
import {useUnit} from "effector-react";
import {
    $isServicePopupOpen,
    sendServiceEvent,
    toggleServicePopupEvent
} from "@/app/(customer)/(site)/(inner-pages)/services/model";
import {ServiceData, ServiceSchema} from "@/schemas/customer/ServiceSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import ControlledSelectInput
    from "@/components/atoms/inputs/select-input/controlled-select-input/ControlledSelectInput";
import {SelectItem} from "@/types/props/SelectItem";
import {$userCredentials} from "@/app/(customer)/model";

const serviceTypes: SelectItem<string>[] = [
    {name: "Другое", value: "OTHER"}
]

const ServicePopup = () => {

    const methods = useForm<ServiceData>({
        resolver: zodResolver(ServiceSchema),
        mode: "onBlur"
    })

    const {
        handleSubmit,
        formState: {isSubmitting},
        reset
    } = methods

    const [userCredentials, sendService] = useUnit([$userCredentials, sendServiceEvent])
    const [popupState, togglePopupState] = useUnit([$isServicePopupOpen, toggleServicePopupEvent])

    const onSubmit = (formData: FieldValues) => sendService(formData as ServiceData)

    useEffect(() => {
        if (userCredentials) {
            reset({
                name: userCredentials.fullName,
                phoneNumber: userCredentials.phoneNumber
            })
        }
    }, [userCredentials]);

    if (popupState) return (
        <PopupWrapper onClose={togglePopupState}>
            <HeaderRow header={"Заявка на услугу"}/>
            <FormProvider {...methods}>
                <Form className={"w-[500px] rounded-xl bg-white flex flex-col gap-5"}>
                    <ControlledTextInput
                        disabled={isSubmitting}
                        labelText={"ФИО"}
                        placeholder={"Иванов Иван Иванович"}
                        name={"name"}
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
                    <ControlledSelectInput
                        items={serviceTypes}
                        name={"nameServiceType"}
                        placeholder={"Выберите вид услуги"}
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

export default ServicePopup;