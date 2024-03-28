import React from 'react';
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import Button from "@/components/atoms/buttons/button/Button";
import {useUnit} from "effector-react";
import {$checkoutFirstStepData} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/first-step/model";
import {$checkoutSecondStepData} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/second-step/model";
import {HeaderDescription} from "@/types/dto/text";
import Text from "@/components/atoms/text/text-base/Text";
import {
    $createOrderPending,
    createOrderEvent
} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/third-step/model";

const CheckoutDataBlock = ({header, items}: { header: string, items: HeaderDescription[] }) => {
    return (
        <BackgroundBlockWrapper header={header}>
            {items.map((item, index) => (
                <section
                    className={"col-span-1 border-b-2 border-light-gray pb-5 flex flex-row items-baseline justify-between"}
                    key={index}
                >
                    <Text text={item.header} className={"text-text-gray"}/>
                    <Text text={item.description}/>
                </section>
            ))}
        </BackgroundBlockWrapper>
    )
}

const DesktopCheckoutThirdStep = () => {

    const [pending, createOrder, firstFormData, secondFormData]
        = useUnit([$createOrderPending, createOrderEvent, $checkoutFirstStepData, $checkoutSecondStepData])

    const firstBlockData: HeaderDescription[] = [
        {header: "Имя", description: firstFormData.firstName},
        {header: "Фамилия", description: firstFormData.surname},
        {header: "Телефон", description: firstFormData.phoneNumber},
        {header: "Почта", description: firstFormData.email},
    ]

    const secondBlockData: HeaderDescription[] = [
        {header: "Город", description: firstFormData.city},
        {header: "Улица", description: firstFormData.street},
        {header: "Дом / Корпус", description: firstFormData.houseNumber},
        {header: "Квартира / Офис", description: firstFormData.flatNumber},
        {header: "Подъезд", description: firstFormData.entranceNumber},
        {header: "Этаж", description: firstFormData.floor},
    ]

    const thirdBlockData: HeaderDescription[] = [
        {header: "Дата доставки", description: secondFormData.deliveryDate.name},
        {header: "Время доставки", description: secondFormData.deliveryTime.name},
        {
            header: "Способ оплаты",
            description: secondFormData.paymentMethod !== "CARD"
                ? "Банковской картой онлайн"
                : "Наличными или картой при получении"
        },
    ]

    return (
        <section className={"flex flex-col gap-7"}>
            <CheckoutDataBlock header={"Данные получателя"} items={firstBlockData}/>
            <CheckoutDataBlock header={"Адрес доставки"} items={secondBlockData}/>
            <CheckoutDataBlock header={"Дата и время доставки"} items={thirdBlockData}/>
            <Button
                text={pending ? "Отправка.." : "Оформить заказ"}
                classNames={{button: "sm:w-1/4 w-full"}}
                onClick={createOrder}
                disabled={pending}
            />
        </section>
    );
};

export default DesktopCheckoutThirdStep;