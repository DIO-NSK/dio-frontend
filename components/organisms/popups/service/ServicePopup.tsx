import React, {useEffect, useState} from 'react';
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FieldValues, Form, FormProvider, useForm} from "react-hook-form";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import ControlledTextArea from "@/components/atoms/inputs/controlled-text-area/ControlledTextArea";
import Button from "@/components/atoms/buttons/button/Button";
import {useUnit} from "effector-react";
import {
    $isServicePopupOpen, $serviceName,
    sendServiceFx,
    toggleServicePopupEvent
} from "@/app/(customer)/(site)/(inner-pages)/services/model";
import {ServiceData, ServiceSchema} from "@/schemas/customer/ServiceSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import ControlledSelectInput
    from "@/components/atoms/inputs/select-input/controlled-select-input/ControlledSelectInput";
import {$userCredentials} from "@/app/(customer)/model";
import {ServiceForm} from "@/types/dto/user/ServiceForm";
import Snackbar from "@/components/organisms/snackbar/Snackbar";
import {selectableServiceTypes} from "@/types/dto/admin/service/AdminService";

const ServicePopup = () => {

    const methods = useForm<ServiceData>({
        resolver: zodResolver(ServiceSchema),
        mode: "onSubmit"
    })

    const {
        handleSubmit,
        formState: {isSubmitting},
        reset
    } = methods

    const serviceName = useUnit($serviceName)
    const selectedServiceType = selectableServiceTypes.find(s => s.name === serviceName)!!

    const [userCredentials, sendService] = useUnit([$userCredentials, sendServiceFx])
    const [popupState, togglePopupState] = useUnit([$isServicePopupOpen, toggleServicePopupEvent])

    const [requestSuccess, setRequestSuccess] = useState<boolean | undefined>(undefined)
    const headerSnackbar = requestSuccess ? "Заявка на услугу отправлена!" : "Произошла ошибка"
    const messageSnackbar = requestSuccess ? "В скором времени с вами свяжется специалист" : "Заполните данные заново и попробуйте снова"

    const onSubmit = (formData: FieldValues) => {
        const req = {
            ...formData,
            nameServiceType: formData.nameServiceType.value
        } as ServiceForm
        sendService(req as ServiceForm)
            .then(_ => setRequestSuccess(true))
            .catch(_ => setRequestSuccess(false))
    }

    useEffect(() => {
        reset({
            name: userCredentials?.fullName,
            phoneNumber: userCredentials?.phoneNumber,
            nameServiceType: selectedServiceType
        })
    }, [selectedServiceType]);

    if (popupState) return (
        <PopupWrapper placement={'center'} onClose={togglePopupState}>
            <Snackbar
                success={requestSuccess === true}
                header={headerSnackbar}
                message={messageSnackbar}
                action={togglePopupState}
                open={requestSuccess !== undefined}
                onClose={() => setRequestSuccess(undefined)}
            />
            <HeaderRow header={"Заявка на услугу"}/>
            <FormProvider {...methods}>
                <Form className={"w-[700px] rounded-xl bg-white flex flex-col gap-5"}>
                    <div className={"w-full flex flex-row gap-5"}>
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
                    </div>
                    <ControlledTextArea
                        labelText={"Комментарий"}
                        placeholder={"Введите здесь"}
                        name={"message"}
                    />
                    <div className={"flex flex-row gap-5"}>
                        <ControlledSelectInput
                            items={selectableServiceTypes}
                            name={"nameServiceType"}
                            placeholder={"Выберите вид услуги"}
                        />
                        <Button
                            classNames={{button: "w-[200px]"}}
                            text={isSubmitting ? "Отправка.." : "Отправить"}
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                        />
                    </div>
                </Form>
            </FormProvider>
        </PopupWrapper>
    );
};

export default ServicePopup;