import React from 'react';
import {SelectItem} from "@/types/props/SelectItem";
import ControlledSelectInput
    from "@/components/atoms/inputs/select-input/controlled-select-input/ControlledSelectInput";
import {RadioButtonItem} from "@/types/props/RadioButtonItem";
import {CheckoutFormData, CheckoutPaymentType} from "@/schemas/CheckoutFormSchema";
import RadioGroup from "@/components/moleculas/radio-group/RadioGroup";
import InputListWrapper from "@/components/wrappers/form/input-list-wrapper/InputListWrapper";
import Button from "@/components/atoms/buttons/button/Button";
import {FieldName, FieldValues, useFormContext} from "react-hook-form";
import TextArea from "@/components/atoms/inputs/text-area/TextArea";

const radioGroupItems: RadioButtonItem[] = [
    {
        value: CheckoutPaymentType.Online,
        label: "Банковской картой онлайн",
        groupName: "paymentType"
    }, {
        value: CheckoutPaymentType.Offline,
        label: "Наличными при получении",
        groupName: "paymentType"
    }
]

const selectItems: SelectItem<string>[] = [
    {name: "12:00 — 13:00", value: "12-13"},
    {name: "13:00 — 14:00", value: "13-14"},
    {name: "14:00 — 15:00", value: "14-15"},
    {name: "15:00 — 16:00", value: "15-16"},
]

const formData = [{
    labelText: "Дата доставки",
    placeholder: "дд/мм/гггг",
    inputMask: "99/99/9999",
    name: "deliveryDate",
}]

const CheckoutThirdStepForm = ({activeStep, onSubmit}: {
    activeStep: SelectItem<number>,
    onSubmit: (data: FieldValues) => void
}) => {

    if (activeStep.value !== 2) return

    const {
        trigger,
        handleSubmit,
        formState: {isSubmitting},
        reset
    } = useFormContext()

    const handleProcess = async () => {
        const fieldNames: FieldName<CheckoutFormData>[] = ["paymentType", "deliveryDate", "deliveryTime", "additional"]
        if (!await trigger(fieldNames)) return
        await handleSubmit(onSubmit)()
    }

    return (
        <React.Fragment>
            <InputListWrapper inputs={formData}/>
            <ControlledSelectInput
                items={selectItems} name={"deliveryTime"}
                placeholder={"Выберите время доставки"}
                labelText={"Время доставки"}
            />
            <RadioGroup
                items={radioGroupItems}
                name={"paymentType"}
            />
            <TextArea
                placeholder={"Уточните детали заказа в комментарии"}
                name={"additional"}
            />
            <Button
                onClick={handleProcess}
                text={isSubmitting ? "Отправка.." : "Отправить"}
                disabled={isSubmitting}
            />
        </React.Fragment>
    );
};

export default CheckoutThirdStepForm;
