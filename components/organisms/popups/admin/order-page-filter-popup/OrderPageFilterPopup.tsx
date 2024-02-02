import React from 'react';
import {PopupProps} from "@/types/props/Popup";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {
    useOrderPageFilterPopup
} from "@/components/organisms/popups/admin/order-page-filter-popup/OrderPageFilterPopup.hooks";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import RangeInput from "@/components/atoms/inputs/range-input/RangeInput";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";

const OrderPageFilterPopup = (props: PopupProps) => {

    const {...context} = useOrderPageFilterPopup()
    const rowWrapperCV: ClassValue = "w-full flex flex-row gap-5 pb-7 border-b-2 border-light-gray"

    const selectInputData = [
        {
            label: "Статус заказа",
            items: context.orderInput.selectItems,
            selectedItem: context.orderInput.activeOrder,
            onSelect: context.orderInput.setActiveOrder
        }, {
            label: "Статус оплаты",
            items: context.paymentInput.selectPaymentItems,
            selectedItem: context.paymentInput.activePayment,
            onSelect: context.paymentInput.setActivePayment
        }
    ]

    const dateInputData = [
        {
            labelText: "Дата создания",
            placeholder: "31.12.24",
            inputMask: "99.99.99",
            onChange: context.creationDateInput.setCreationDate,
            value: context.creationDateInput.creationDate
        }, {
            labelText: "Дата оплаты",
            placeholder: "31.12.24",
            inputMask: "99.99.99",
            onChange: context.paymentDateInput.setPaymentDate,
            value: context.paymentDateInput.paymentDate
        }
    ]

    return (
        <PopupWrapper onClose={props.onClose} placement={"center"}>

            <div className={"w-[900px] flex flex-col gap-7"}>
                <Text text={"Фильтры"} className={"text-[24px] font-medium"}/>
                <div className={cn(rowWrapperCV)}>
                    {
                        selectInputData.map((inputData, key) =>
                            <SelectInput {...inputData} key={key}/>
                        )
                    }
                    <RangeInput
                        labelText={"Стоимость заказа"}
                        fromValue={context.rangeInput.fromValue}
                        toValue={context.rangeInput.toValue}
                        fromPlaceholder={"от 100 ₽"}
                        toPlaceholder={"до 100 000 ₽"}
                        onChangeFromValue={context.rangeInput.setFromValue}
                        onChangeToValue={context.rangeInput.setToValue}
                    />
                </div>
                <div className={cn(rowWrapperCV)}>
                    {
                        dateInputData.map((inputData, key) =>
                            <TextInput {...inputData} key={key}/>
                        )
                    }
                </div>
                <Button
                    text={"Сохранить"}
                    onClick={context.handleSaveChanges}
                    classNames={{button: "w-[250px]"}}
                />
            </div>
        </PopupWrapper>
    );
};

export default OrderPageFilterPopup;
