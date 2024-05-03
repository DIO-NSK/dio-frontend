import React, {useEffect} from 'react';
import Form from "@/components/atoms/form/Form";
import Button from "@/components/atoms/buttons/button/Button";
import {DefaultValues, FieldValues, FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LegalEntityData, LegalEntitySchema} from "@/schemas/customer/authorization/LegalEntitySchema";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {useUnit} from "effector-react";
import {
    $firstStepData,
    setActiveStepEvent,
    submitFirstStepEvent
} from "@/app/(customer)/(site)/(inner-pages)/register/legal-entity/model";
import {legalEntityCheckoutSteps} from "@/data/deskstopCheckoutSteps";

const inputData = [
    {
        name: "fullName",
        placeholder: "Иванов Иван Иванович",
        labelText: "ФИО"
    }, {
        name: "phoneNumber",
        placeholder: "+7 (000) 000-00-00",
        inputMask: "+7 (999) 999-99-99",
        labelText: "Телефон"
    }, {
        name: "password",
        placeholder: "Введите пароль",
        isPassword: true,
        labelText: "ФИО"
    },
]

const DesktopRegisterSecondStep = () => {

    const setActiveStep = useUnit(setActiveStepEvent)
    const [firstStepData, submitFirstStepData] = useUnit([$firstStepData, submitFirstStepEvent])

    const methods = useForm<LegalEntityData>({
        resolver: zodResolver(LegalEntitySchema),
        mode: "onSubmit"
    })

    const onSubmit = (fieldValues: FieldValues) => {
        submitFirstStepData(fieldValues as Partial<LegalEntityData>)
        setActiveStep(legalEntityCheckoutSteps[1])
    }

    useEffect(() => {
        methods.reset({
            ...firstStepData as DefaultValues<LegalEntityData>
        })
    }, [firstStepData]);

    return (
        <FormProvider {...methods}>
            <Form className={"grid grid-cols-2 gap-5"}>
                {inputData.map((input, key) => (
                    <ControlledTextInput
                        classNames={{wrapper: "col-span-2"}}
                        {...input} key={key}
                    />
                ))}
                <Button
                    disabled={methods.formState.isSubmitting}
                    text={methods.formState.isSubmitting ? "Отправка.." : "Далее"}
                    onClick={methods.handleSubmit(onSubmit)}
                    classNames={{button: "sm:w-1/4 w-full"}}
                />
            </Form>
        </FormProvider>
    );

};

export default DesktopRegisterSecondStep;