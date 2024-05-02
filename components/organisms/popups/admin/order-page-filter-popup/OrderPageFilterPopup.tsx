import React, {useEffect} from 'react';
import {PopupProps} from "@/types/props/Popup";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import {SelectItem} from "@/types/props/SelectItem";
import ControlledSelectInput
    from "@/components/atoms/inputs/select-input/controlled-select-input/ControlledSelectInput";
import {selectableOrderStatuses} from "@/types/dto/user/order/ResponseProfileOrder";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import Form from "@/components/atoms/form/Form";
import {PaymentMethod} from "@/types/dto/user/order/PaymentMethod";
import {OrderFilterData, OrderFilterSchema} from "@/schemas/admin/OrderFiltersSchema";
import {useUnit} from "effector-react";
import {
    filterOrdersEvent,
    RequestOrderFilters
} from "@/components/organisms/popups/admin/order-page-filter-popup/model";
import RangeInput from "@/components/atoms/inputs/range-input/RangeInput";
import ControlledRangeInput from "@/components/atoms/inputs/range-input/ControlledRangeInput";
import ControlledMultiSelectButton from "@/components/atoms/buttons/multiselect-button/ControlledMultiSelectButton";

const rowWrapperCV: ClassValue = "w-full flex flex-row gap-5 pb-7 border-b-2 border-light-gray"

const dateInputData = [
    {
        labelText: "Дата создания",
        placeholder: "31.12.24",
        inputMask: "99.99.99",
        name: "created"
    }, {
        labelText: "Дата оплаты",
        placeholder: "31.12.24",
        inputMask: "99.99.99",
        name: "deliveryTime"
    }
]

const OrderPageFilterPopup = (props: PopupProps) => {

    const filterOrders = useUnit(filterOrdersEvent)

    const paymentStatusItems: SelectItem<PaymentMethod>[] = [
        {name: "Наличными", value: "CASH"},
        {name: "Онлайн", value: "CARD"},
    ]

    const methods = useForm<OrderFilterData>({
        resolver: zodResolver(OrderFilterSchema),
        mode: "onSubmit"
    })

    const {watch} = methods

    const onSubmit = (fieldValues: FieldValues) => {
        filterOrders(fieldValues as OrderFilterData)
    }

    useEffect(() => {
        watch()
    }, []);

    return (
        <PopupWrapper onClose={props.onClose} placement={"center"}>
            <FormProvider {...methods}>
                <Form className={"w-[900px] flex flex-col gap-7"}>
                    <Text text={"Фильтры"} className={"text-[24px] font-medium"}/>
                    <div className={cn(rowWrapperCV)}>
                        <ControlledSelectInput
                            items={selectableOrderStatuses}
                            placeholder={"Выберите статус заказа"}
                            labelText={"Статус заказа"}
                            name={"status"}
                        />
                        <ControlledMultiSelectButton
                            labelText={"Способ оплаты"}
                            items={paymentStatusItems}
                            name={"paymentType"}
                        />
                        <ControlledRangeInput
                            labelText={"Цена заказа"}
                            maxValue={"10000"}
                            minValue={"0"}
                            name={"cost"}
                        />
                    </div>
                    <div className={cn(rowWrapperCV)}>
                        {dateInputData.map((inputData, key) => (
                            <TextInput {...inputData} key={key}/>)
                        )}
                    </div>
                    <Button
                        text={methods.formState.isSubmitting ? "Отправка.." : "Применить"}
                        onClick={methods.handleSubmit(onSubmit)}
                        disabled={methods.formState.isSubmitting}
                        classNames={{button: "w-[250px]"}}
                    />
                </Form>
            </FormProvider>
        </PopupWrapper>
    );
};

export default OrderPageFilterPopup;
