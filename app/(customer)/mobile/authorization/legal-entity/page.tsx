"use client"

import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {LegalEntityData, LegalEntitySchema} from "@/schemas/customer/authorization/LegalEntitySchema";
import {useNavigation} from "@/utlis/hooks/useNavigation";
import {FieldName, FormProvider, Path, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Form from "@/components/atoms/form/Form";
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
import ControlledCaptcha from "@/components/atoms/inputs/controlled-captcha/ControlledCaptcha";
import {useSmartCaptcha} from "@/utlis/hooks/useSmartCaptcha";

const MobileLegalEntityPage = () => {

    const methods = useForm<LegalEntityData>({
        resolver: zodResolver(LegalEntitySchema),
        mode: "onSubmit"
    })

    const navigation = useNavigation()

    const schemaKeys = Object.keys(LegalEntitySchema).filter(key => key !== 'captchaToken') as Path<LegalEntityData>[];
    const [submitFirstStepData, registerLegalEntity] = useUnit([submitFirstStepEvent, registerLegalEntityFx])
    const [captchaVisible, toggleCaptchaVisible, handleValidateForm, key, resetKey] = useSmartCaptcha<LegalEntityData>(schemaKeys, methods.trigger, methods.formState.errors);

    const setErrorFromAPI = (message: string) => {
        const fieldErrors = message.split('\n')
        return fieldErrors.forEach((error: string) => {
            const [fieldName, ...message] = error.split(':')
            methods.setError(fieldName as FieldName<LegalEntityData>, {
                type: '404', message: message.join(':')
            })
        })
    }

    const onSubmit = () => {
        const formData : LegalEntityData = methods.getValues();

        submitFirstStepData(formData as Partial<LegalEntityData>)
        registerLegalEntity(formData as LegalEntityData)
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
                        onClick={async () => {
                            resetKey();
                            await handleValidateForm();
                        }}
                        text={"Зарегистироваться"}
                    />
                    <ControlledCaptcha
                        key={key}
                        visible={captchaVisible}
                        onChallengeHidden={toggleCaptchaVisible}
                        onSuccess={onSubmit}
                    />
                </Form>
            </FormProvider>
        </InnerPageWrapper>
    );

};

export default MobileLegalEntityPage;
