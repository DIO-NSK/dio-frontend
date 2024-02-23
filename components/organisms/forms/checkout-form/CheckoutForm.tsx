import React from 'react';
import Form from "@/components/atoms/form/Form";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {CheckoutFormData, CheckoutFormSchema} from "@/schemas/CheckoutFormSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {SelectItem} from "@/types/props/SelectItem";
import MobileFormStepper from "@/components/mobile/moleculas/MobileFormStepper/MobileFormStepper";
import useFormPersist from "react-hook-form-persist";
import {getFormDataFromStorage} from "@/utlis/getFormDataFromStorage";
import CheckoutFirstStepForm
    from "@/components/organisms/forms/checkout-form/checkout-first-step-form/CheckoutFirstStepForm";
import CheckoutSecondStepForm
    from "@/components/organisms/forms/checkout-form/checkout-second-step-form/CheckoutSecondStepForm";
import CheckoutThirdStepForm
    from "@/components/organisms/forms/checkout-form/checkout-third-step-form/CheckoutThirdStepForm";

type CheckoutFormProps = {
    steps: SelectItem<number>[],
    activeStep: SelectItem<number>,
    setActiveStep: (step: SelectItem<number>) => void
}

const CheckoutForm = (props: CheckoutFormProps) => {

    const methods = useForm<CheckoutFormData>({
        mode: "onBlur",
        resolver: zodResolver(CheckoutFormSchema),
        defaultValues: getFormDataFromStorage("checkoutForm"),
    })

    const {
        handleSubmit,
        setValue,
        watch
    } = methods

    useFormPersist("checkoutForm", {
        setValue, watch, storage: window.localStorage
    })

    const onSubmit = async (data: FieldValues) => {
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log("Final Data", data)
    }

    const handleNextClick = () => {
        const nextActiveStep = props.steps[props.activeStep.value + 1]
        props.setActiveStep(nextActiveStep)
    }

    return (
        <FormProvider {...methods}>
            <MobileFormStepper {...props}/>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <CheckoutFirstStepForm onSubmit={handleNextClick} {...props}/>
                <CheckoutSecondStepForm onSubmit={handleNextClick} {...props}/>
                <CheckoutThirdStepForm onSubmit={onSubmit} {...props}/>
            </Form>
        </FormProvider>
    );

};

export default CheckoutForm;
