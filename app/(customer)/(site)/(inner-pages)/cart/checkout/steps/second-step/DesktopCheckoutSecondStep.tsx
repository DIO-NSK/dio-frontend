import React, {useEffect, useState} from 'react';
import {useUnit} from "effector-react";
import {DefaultValues, FieldValues, FormProvider, useForm, useFormContext} from "react-hook-form";
import {CreateOrderData, CreateOrderSchema} from "@/schemas/customer/checkout/CreateOrderSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import Form from "@/components/atoms/form/Form";
import Button from "@/components/atoms/buttons/button/Button";
import {SelectItem} from "@/types/props/SelectItem";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import ControlledSelectInput
    from "@/components/atoms/inputs/select-input/controlled-select-input/ControlledSelectInput";
import Text from "@/components/atoms/text/text-base/Text";
import ControlledTextArea from "@/components/atoms/inputs/controlled-text-area/ControlledTextArea";
import {$orderId} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/first-step/model";
import {
    $checkoutSecondStepData,
    $deliveryDates,
    $deliveryTimes,
    getDeliveryTimeEvent,
    setCheckoutSecondStepDataEvent
} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/second-step/model";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import {PaymentMethod} from "@/types/dto/user/order/PaymentMethod";
import {$activeStep, setActiveStepEvent} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/model";
import {desktopCheckoutSteps} from "@/data/deskstopCheckoutSteps";
import {$cart} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import ControlledMultiSelectButton from "@/components/atoms/buttons/multiselect-button/ControlledMultiSelectButton";
import {$orderToRepeat} from "@/app/(customer)/profile/orders/model";

const CheckoutTimeBlock = () => {

    const {watch, getValues} = useFormContext<CreateOrderData>()

    const [orderId, deliveryTimes, deliveryDates, getDeliveryTimes]
        = useUnit([$orderId, $deliveryTimes, $deliveryDates, getDeliveryTimeEvent])

    const selectedTimeItems: SelectItem<string>[] = deliveryTimes.map(item => ({
        name: `с ${item.deliveryTime.split('-')[0]}:00 по ${item.deliveryTime.split('-')[1]}:00`,
        value: item.routeCode.toString()
    }))

    const selectedDateItems: SelectItem<string>[] = deliveryDates.map(item => ({
        name: dayjs(item).locale("ru").format("DD MMMM YYYY"),
        value: item
    }))

    useEffect(() => {
        const localDate = getValues("deliveryDate.value")
        if (localDate) getDeliveryTimes({orderId, localDate})
    }, [watch("deliveryDate")])

    return (
        <BackgroundBlockWrapper header={"Дата и время доставки"}>
            <ControlledSelectInput
                width={"col-span-1"}
                items={selectedDateItems}
                name={"deliveryDate"}
                className={"bg-white border-2 border-light-gray"}
                placeholder={"Выберите дату доставки"}
                labelText={"Дата доставки"}
            />
            <ControlledSelectInput
                width={"col-span-1"}
                items={selectedTimeItems}
                name={"deliveryTime"}
                className={"bg-white border-2 border-light-gray"}
                placeholder={"Выберите время доставки"}
                labelText={"Время доставки"}
            />
        </BackgroundBlockWrapper>
    )

}

const CheckoutPaymentBlock = () => {

    const multiselectElements: SelectItem<PaymentMethod>[] = [
        {name: window.screen.width < 640 ? "Картой" : "Банковской картой онлайн", value: "ONLINE"},
        {name: window.screen.width < 640 ? "Наличными" : "Наличными или картой при получении", value: "CASH"}
    ]

    return (
        <div className={"w-full flex flex-col gap-3"}>
            <Text text={"Способ оплаты"} className={"text-lg font-medium"}/>
            <ControlledMultiSelectButton
                className={"h-[70px]"}
                items={multiselectElements}
                name={"paymentMethod"}
            />
        </div>
    )

}

const CheckoutAdditionalBlock = () => {

    const [comment, setComment] = useState<string>("")
    const hintMessage = "Если выбранное Вами время доставки не будет совпадать с графиком доставки" +
        "вашего района, с вами обязательно свяжется менеджер для уточнения информации"

    return (
        <BackgroundBlockWrapper header={"Дополнительно"}>
            <ControlledTextArea
                name={"textArea"}
                classNames={{wrapper: "col-span-full", input: "min-h-[150px] max-h-[300px]"}}
                labelText={"Пожелания к заказу"}
                placeholder={"Уточните детали заказа в комментарии"}
                hintText={{type: "neutral", hintMessage: hintMessage}}
                theme={"filled"}
            />
        </BackgroundBlockWrapper>
    )
}

const DesktopCheckoutSecondStep = () => {

    const orderToRepeat = useUnit($orderToRepeat)
    const [activeStep, setActiveStep] = useUnit([$activeStep, setActiveStepEvent])

    const [cart, orderId, formData, setFormData]
        = useUnit([$cart, $orderId, $checkoutSecondStepData, setCheckoutSecondStepDataEvent])

    const methods = useForm<CreateOrderData>({
        resolver: zodResolver(CreateOrderSchema),
        mode: "onSubmit"
    })

    const {
        handleSubmit,
        formState: {isSubmitting}, reset
    } = methods

    const onSubmit = (formData: FieldValues) => {
        setFormData(formData as CreateOrderData)
        setActiveStep(desktopCheckoutSteps[activeStep.value + 1])
    }

    useEffect(() => {

        console.log('>order', orderToRepeat);

        const pickedProducts = orderToRepeat
            ? orderToRepeat.items.map(i => i.productItemId)
            : cart?.products.map(i => i.productItemId)

        const pickedPromos = orderToRepeat
            ? orderToRepeat.items.map(i => i.promoItemId)
            : cart?.promos.map(i => i.promoItemId)

        console.log('>pickedItems', pickedPromos, pickedProducts)

        reset({
            ...formData,
            pickedProducts: pickedProducts,
            pickedPromos: pickedPromos,
            orderId
        } as DefaultValues<CreateOrderData>)

    }, [formData, orderId, cart, orderToRepeat])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    useEffect(() => {
        console.log(methods.formState.errors);
    }, [methods.formState.errors]);

    if (orderId !== 0) return (
        <FormProvider {...methods}>
            <Form>
                <CheckoutTimeBlock/>
                <CheckoutPaymentBlock/>
                <Button
                    text={isSubmitting ? "Отправка.." : "К подтверждению"}
                    onClick={handleSubmit(onSubmit)}
                    classNames={{button: "sm:w-1/4 w-full"}}
                />
            </Form>
        </FormProvider>
    )

};

export default DesktopCheckoutSecondStep;