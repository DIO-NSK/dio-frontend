import React from 'react';
import InputListWrapper from "@/components/wrappers/form/input-list-wrapper/InputListWrapper";
import {FieldName, useFormContext} from "react-hook-form";
import {CheckoutFormData} from "@/schemas/customer/checkout/CheckoutFormSchema";
import Button from "@/components/atoms/buttons/button/Button";
import {SelectItem} from "@/types/props/SelectItem";
import SelectAddressPopup from "@/components/mobile/popups/select-address-popup/SelectAddressPopup";
import {useToggle} from "@/utlis/hooks/useToggle";

const formData = [{
    labelText: "Город",
    placeholder: "Введите город проживания",
    name: "city",
}, {
    labelText: "Улица",
    placeholder: "Введите название улицы",
    name: "street",
}, {
    labelText: "Дом / Корпус",
    placeholder: "Введите номер дома",
    name: "houseNumber",
}, {
    labelText: "Квартира / Офис",
    placeholder: "Введите номер квартиры",
    name: "apartmentNumber",
}, {
    labelText: "Подъезд",
    placeholder: "Введите номер подъезда",
    name: "doorway",
}, {
    labelText: "Этаж",
    placeholder: "Введите этаж",
    name: "floor",
}]

const CheckoutSecondStepFrom = ({activeStep, onSubmit}: {
    activeStep: SelectItem<number>,
    onSubmit: () => void
}) => {

    if (activeStep.value !== 1) return

    const {trigger} = useFormContext()

    const handleSubmit = async () => {
        const fieldNames: FieldName<CheckoutFormData>[] = [
            "city", "street", "houseNumber",
            "apartmentNumber", "doorway", "floor"
        ]
        if (await trigger(fieldNames)) onSubmit()
    }

    const popupToggle = useToggle()

    return (
        <React.Fragment>
            {
                popupToggle.state && <SelectAddressPopup
                    onClose={popupToggle.toggleState}
                />
            }
            <Button
                onClick={popupToggle.toggleState}
                text={"Выбрать существующий адрес"}
                buttonType={"SECONDARY"}
            />
            <InputListWrapper inputs={formData}/>
            <Button onClick={handleSubmit} text={"Далее"}/>
        </React.Fragment>
    )

}

export default CheckoutSecondStepFrom;
