"use client"

import React from "react";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {FieldName, FieldValues, FormProvider, useForm} from "react-hook-form";
import Form from "@/components/atoms/form/Form";
import Button from "@/components/atoms/buttons/button/Button";
import {useToggle} from "@/utlis/hooks/useToggle";
import {LegalEntityData, LegalEntitySchema} from "@/schemas/customer/authorization/LegalEntitySchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUnit} from "effector-react";
import {
    registerLegalEntityFx,
    submitFirstStepEvent
} from "@/app/(customer)/(site)/(inner-pages)/register/legal-entity/model";
import LegalConfirmationCodePopup
    from "@/components/organisms/popups/authorization/confirmation-code-popup/legal/LegalConfirmationCodePopup";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import {firstStepData, secondStepData} from "@/data/forms/legalEntityData";

const RegisterForm = () => {

    const [submitFirstStepData, registerLegalEntity] = useUnit([submitFirstStepEvent, registerLegalEntityFx])
    const confirmationPopupToggle = useToggle()

    const methods = useForm<LegalEntityData>({
        resolver: zodResolver(LegalEntitySchema),
        mode: "onSubmit"
    })

    const setErrorFromAPI = (message: string) => {
        const fieldErrors = message.split('\n')
        return fieldErrors.forEach((error: string) => {
            const [fieldName, ...message] = error.split(':')
            methods.setError(fieldName as FieldName<LegalEntityData>, {
                type: '404', message: message.join(':')
            })
        })
    }

    const onSubmit = (fieldValues: FieldValues) => {
        submitFirstStepData(fieldValues as Partial<LegalEntityData>)
        registerLegalEntity(fieldValues as LegalEntityData)
            .then(confirmationPopupToggle.toggleState)
            .catch(error => setErrorFromAPI(error.message))
    }

    return (
        <section className={"w-full -mt-7 sm:mt-0 sm:col-span-full flex flex-col gap-5 sm:gap-10"}>
            {confirmationPopupToggle.state && <LegalConfirmationCodePopup
                onClose={confirmationPopupToggle.toggleState}
            />}
            <FormProvider {...methods}>
                <Form className={"col-span-full flex flex-col gap-5"}>
                    <BackgroundBlockWrapper header={'Основная информация'}>
                        {firstStepData.map((input, key) => (
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
                        text={methods.formState.isSubmitting ? "Отправка.." : "Далее"}
                        onClick={methods.handleSubmit(onSubmit)}
                        classNames={{button: "sm:w-1/5 w-full"}}
                    />
                </Form>
            </FormProvider>
        </section>
    )

}


const RegisterLegalEntityPage = () => {
    return (
        <InnerPageWrapper classNames={{desktopWrapper: "sm:grid sm:grid-cols-12 gap-7"}}>
            <HeaderRow
                className={"hidden sm:flex w-full pb-7 border-b-2 border-light-gray"}
                header={"Регистрация для юридических лиц"}
            />
            <RegisterForm/>
        </InnerPageWrapper>
    )
}

export default RegisterLegalEntityPage