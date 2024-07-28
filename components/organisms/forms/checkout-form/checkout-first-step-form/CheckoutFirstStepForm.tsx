import React from 'react';
import InputListWrapper from "@/components/wrappers/form/input-list-wrapper/InputListWrapper";
import Button from "@/components/atoms/buttons/button/Button";
import {FieldName, useFormContext} from "react-hook-form";
import {CheckoutFormData} from "@/schemas/customer/checkout/CheckoutFormSchema";
import {SelectItem} from "@/types/props/SelectItem";

const formData = [{
    labelText: "Имя",
    placeholder: "Введите имя",
    name: "name",
}, {
    labelText: "Фамилия",
    placeholder: "Введите фамилию",
    name: "surname",
}, {
    labelText: "Телефон",
    placeholder: "+7 (000) 000-00-00",
    inputMask: "+9 (999) 999-99-99",
    name: "phoneNumber",
}, {
    labelText: "Электронная почта",
    placeholder: "example@gmail.com",
    name: "email",
}]

const CheckoutFirstStepForm = ({activeStep, onSubmit}: {
    activeStep: SelectItem<number>,
    onSubmit: () => void
}) => {

    if (activeStep.value !== 0) return

    const {trigger} = useFormContext()

    const handleSubmit = async () => {
        const fieldNames: FieldName<CheckoutFormData>[] = ["name", "surname", "phoneNumber", "email"]
        if (await trigger(fieldNames)) onSubmit()
    }

    return (
        <React.Fragment>
            <InputListWrapper inputs={formData}/>
            <Button onClick={handleSubmit} text={"Далее"}/>
        </React.Fragment>
    )
}

export default CheckoutFirstStepForm;
