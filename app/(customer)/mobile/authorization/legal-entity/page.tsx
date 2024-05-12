"use client"

import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {InputPrefilledData} from "@/types/props/inputs/InputPrefilledData";
import {
    LegalEntityData,
    LegalEntitySchema
} from "@/schemas/customer/authorization/LegalEntitySchema";
import {useNavigation} from "@/utlis/hooks/useNavigation";
import {FieldName, FieldValues, FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Form from "@/components/atoms/form/Form";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import {FiX} from "react-icons/fi";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import React from "react";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import {firstStepData, secondStepData} from "@/data/forms/legalEntityData";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {useUnit} from "effector-react";
import {
    registerLegalEntityFx,
    submitFirstStepEvent
} from "@/app/(customer)/(site)/(inner-pages)/register/legal-entity/model";
import {useToggle} from "@/utlis/hooks/useToggle";

const MobileLegalEntityPage = () => {

    const navigation = useNavigation()

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
            .then(_ => navigation.pushDeep('/confirm'))
            .catch(error => setErrorFromAPI(error.message))
    }

    return (
        <InnerPageWrapper>
            <HeaderRow
                rightContent={<FiX onClick={navigation.back}/>}
                header={"Регистрация для юрлиц"}
                theme={"bordered"}
            />
            <FormProvider {...methods}>
                <Form>
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
                        classNames={{button: "w-full"}}
                        onClick={methods.handleSubmit(onSubmit)}
                        text={"Зарегистироваться"}
                    />
                </Form>
            </FormProvider>
        </InnerPageWrapper>
    );

};

export default MobileLegalEntityPage;
