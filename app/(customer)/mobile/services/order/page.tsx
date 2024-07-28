"use client"

import React, {useEffect, useState} from 'react';
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import Form from "@/components/atoms/form/Form";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Button from "@/components/atoms/buttons/button/Button";
import {useRouter} from "next/navigation";
import {ServiceData, ServiceSchema} from "@/schemas/customer/ServiceSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUnit} from "effector-react";
import {$userCredentials} from "@/app/(customer)/model";
import {$serviceName, sendServiceFx} from "@/app/(customer)/(site)/(inner-pages)/services/model";
import ControlledTextArea from "@/components/atoms/inputs/controlled-text-area/ControlledTextArea";
import ControlledSelectInput
    from "@/components/atoms/inputs/select-input/controlled-select-input/ControlledSelectInput";
import {InputPrefilledData} from "@/types/props/inputs/InputPrefilledData";
import {ServiceForm} from "@/types/dto/user/ServiceForm";
import {selectableServiceTypes} from "@/types/dto/admin/service/AdminService";
import Snackbar from "@/components/organisms/snackbar/Snackbar";

const inputData: InputPrefilledData[] = [
    {
        labelText: "ФИО",
        placeholder: "Иванов Иван Иванович",
        name: "name"
    }, {
        labelText: "Номер телефона",
        inputMask: "+7 (999) 999-99-99",
        placeholder: "+7 (___) ___-__-__",
        name: "phoneNumber"
    }
]

const MobileOrderServicePage = () => {

    const serviceName = useUnit($serviceName)
    const selectedServiceType = selectableServiceTypes.find(s => s.name === serviceName)!!

    const [requestSuccess, setRequestSuccess] = useState<boolean | undefined>(undefined)
    const headerSnackbar = requestSuccess ? "Заявка на услугу отправлена!" : "Произошла ошибка"
    const messageSnackbar = requestSuccess ? "В скором времени с вами свяжется специалист" : "Заполните данные заново и попробуйте снова"

    const router = useRouter()

    const [userCredentials, sendService] = useUnit([$userCredentials, sendServiceFx])

    const methods = useForm<ServiceData>({
        resolver: zodResolver(ServiceSchema),
        mode: "onSubmit"
    })

    const {
        handleSubmit,
        formState: {isSubmitting},
        reset
    } = methods

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

    return (
        <InnerPageWrapper>
            <Snackbar
                success={requestSuccess === true}
                header={headerSnackbar}
                message={messageSnackbar}
                action={() => router.push('/services')}
                open={requestSuccess !== undefined}
                onClose={() => setRequestSuccess(undefined)}
            />
            <HeaderRow
                theme={"bordered"}
                rightContent={<FiX onClick={router.back}/>}
                header={"Заказать услугу"}
            />
            <FormProvider {...methods}>
                <Form className={"gap-4"}>
                    {inputData.map((input, key) => (
                        <ControlledTextInput disabled={isSubmitting} {...input} key={key}/>
                    ))}
                    <ControlledTextArea
                        labelText={"Комментарий"}
                        placeholder={"Введите здесь"}
                        name={"message"}
                    />
                    <ControlledSelectInput
                        items={selectableServiceTypes}
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
        </InnerPageWrapper>
    );

};

export default MobileOrderServicePage;