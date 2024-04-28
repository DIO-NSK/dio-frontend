import React, {useState} from 'react';
import {PopupProps} from "@/types/props/Popup";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import RangeInput from "@/components/atoms/inputs/range-input/RangeInput";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import {SelectItem} from "@/types/props/SelectItem";
import ControlledSelectInput
    from "@/components/atoms/inputs/select-input/controlled-select-input/ControlledSelectInput";
import {OrderStatus} from "@/types/dto/user/order/ResponseProfileOrder";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {FilterOrdersData, FilterOrdersSchema} from "@/schemas/admin/FilterOrdersSchema";
import {zodResolver} from '@hookform/resolvers/zod';
import Form from "@/components/atoms/form/Form";

const rowWrapperCV: ClassValue = "w-full flex flex-row gap-5 pb-7 border-b-2 border-light-gray"

const dateInputData = [
    {
        labelText: "Дата создания",
        placeholder: "31.12.24",
        inputMask: "99.99.99",
        name: "creationDate"
    }, {
        labelText: "Дата оплаты",
        placeholder: "31.12.24",
        inputMask: "99.99.99",
        name: "paymentDate"
    }
]

const OrderPageFilterPopup = (props: PopupProps) => {

    const [fromValue, changeFromValue] = useState<string>("0")
    const [toValue, changeToValue] = useState<string>("100000")

    const orderStatusItems: SelectItem<OrderStatus>[] = [
        {name: "Новый", value: "new"}
    ]

    const paymentStatusItems: SelectItem<string>[] = [
        {name: "Оффлайн", value: "offline"},
        {name: "Онлайн", value: "online"},
    ]

    const methods = useForm<FilterOrdersData>({
        resolver: zodResolver(FilterOrdersSchema),
        mode: "onSubmit"
    })

    const selectInputData = [
        {
            label: "Статус заказа",
            placeholder: "Выберите статус заказа",
            items: orderStatusItems,
            name: "orderStatus"
        }, {
            label: "Статус оплаты",
            placeholder: "Выберите статус оплаты",
            items: paymentStatusItems,
            name: "paymentStatus"
        }
    ]

    const onSubmit = (fieldValues : FieldValues) => {
        console.log(fieldValues)
    }

    return (
        <PopupWrapper onClose={props.onClose} placement={"center"}>
            <FormProvider {...methods}>
                <Form className={"w-[900px] flex flex-col gap-7"}>
                    <Text text={"Фильтры"} className={"text-[24px] font-medium"}/>
                    <div className={cn(rowWrapperCV)}>
                        {selectInputData.map((inputData, key) =>
                            <ControlledSelectInput
                                name={"selectItems"}
                                labelText={inputData.label}
                                placeholder={inputData.placeholder}
                                items={inputData.items as SelectItem<OrderStatus>[]}
                                key={key}
                            />
                        )}
                        <RangeInput
                            labelText={"Стоимость заказа"}
                            fromValue={fromValue} toValue={toValue}
                            maxValue={"100000"} minValue={"0"} unit={"руб"}
                            onChangeFromValue={changeFromValue}
                            onChangeToValue={changeToValue}
                        />
                    </div>
                    <div className={cn(rowWrapperCV)}>
                        {dateInputData.map((inputData, key) => (
                                <TextInput {...inputData} key={key}/>
                            )
                        )}
                    </div>
                    <Button
                        text={"Сохранить"}
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
