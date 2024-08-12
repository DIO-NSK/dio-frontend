import React, {useEffect, useState} from 'react';
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import Button from "@/components/atoms/buttons/button/Button";
import {useUnit} from "effector-react";
import {$checkoutFirstStepData} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/first-step/model";
import {$checkoutSecondStepData} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/second-step/model";
import {HeaderDescription} from "@/types/dto/text";
import Text from "@/components/atoms/text/text-base/Text";
import {
    $createOrderPending,
    $createOrderStatus,
    createOrderFx,
    CreateOrderRequest,
    thirdStepDidMountEvent
} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/third-step/model";
import Snackbar from "@/components/organisms/snackbar/Snackbar";
import {useRouter} from "next/navigation";
import {convertPhoneNumber} from "@/utlis/convertPhoneNumber";
import {CreateOrderData} from "@/schemas/customer/checkout/CreateOrderSchema";
import {cn} from "@/utlis/cn";

const convertFormDataToRequest = (data: CreateOrderData): CreateOrderRequest => {
    return ({
        orderId: data.orderId,
        pickedProducts: data.pickedProducts,
        pickedPromos: data.pickedPromos,
        paymentMethod: data.paymentMethod.value,
        deliveryTime: data.deliveryTime.name,
        deliveryDate: data.deliveryDate.value,
        routeCode: +data.deliveryTime.value
    }) as CreateOrderRequest
}

const CheckoutDataBlock = ({header, items, className}: {
    header: string,
    items: HeaderDescription[],
    className?: string
}) => {
    return (
        <BackgroundBlockWrapper header={header}>
            {items.map((item, index) => (
                <section
                    className={cn("col-span-1 border-b-2 border-light-gray pb-5 flex flex-row items-baseline justify-between", className)}
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

    const router = useRouter()

    const orderData = useUnit($checkoutSecondStepData)
    const [resetRequestStatus, requestStatus, pending] = useUnit([thirdStepDidMountEvent, $createOrderStatus, $createOrderPending])
    const [createOrder, firstFormData, secondFormData] = useUnit([createOrderFx, $checkoutFirstStepData, $checkoutSecondStepData])

    const firstBlockData: HeaderDescription[] = [
        {header: "Имя", description: firstFormData.firstName},
        {header: "Фамилия", description: firstFormData.surname},
        {header: "Телефон", description: convertPhoneNumber(firstFormData.phoneNumber)},
        {header: "Почта", description: firstFormData.email},
    ]

    const secondBlockData: HeaderDescription[] = [
        {header: "Адрес", description: firstFormData.address.address},
    ]

    const thirdBlockData: HeaderDescription[] = [
        {header: "Дата доставки", description: secondFormData.deliveryDate.name},
        {header: "Время доставки", description: secondFormData.deliveryTime.name},
        {
            header: "Способ оплаты",
            description: secondFormData.paymentMethod.value === "ONLINE"
                ? "Банковской картой онлайн"
                : "Наличными или картой при получении"
        },
    ]

    const additionalBlockData : HeaderDescription[] = [
        {header : "Комментарий к заказу", description : firstFormData?.comment as string}
    ]

    const headerSnackbar = requestStatus === true ? "Заказ успешно создан!" : "Произошла ошибка"
    const messageSnackbar = requestStatus === true ? "Перенаправляем Вас на страницу оплаты" : "Заполните данные заново и попробуйте снова"

    const [errorMessage, setErrorMessage] = useState<string>('')

    const handleCreateOrder = () => {
        createOrder(convertFormDataToRequest(orderData))
            .then(link => {
                if (secondFormData.paymentMethod.value === "ONLINE") {
                    router.push(link);
                } else {
                    router.push('/profile/orders');
                }
            })
            .catch(error => setErrorMessage(error))
    }

    useEffect(() => {
        resetRequestStatus()
    }, []);

    return (
        <section className={"flex flex-col gap-7"}>
            <Snackbar
                autoHide={false}
                success={requestStatus === true}
                header={headerSnackbar}
                message={requestStatus ? messageSnackbar : errorMessage}
                open={requestStatus !== null}
                onClose={resetRequestStatus}
                action={() => {
                    resetRequestStatus()
                    router.back()
                }}
            />
            <CheckoutDataBlock header={"Данные получателя"} items={firstBlockData}/>
            <CheckoutDataBlock header={"Адрес доставки"} items={secondBlockData} className={'col-span-full border-b-0 pb-0'}/>
            <CheckoutDataBlock header={"Дата и время доставки"} items={thirdBlockData}/>
            {
                firstFormData?.comment ?
                    <CheckoutDataBlock
                        header={"Дополнительно"}
                        items={additionalBlockData}
                        className={'col-span-full flex-col gap-2 border-b-0 pb-0'}
                    />
                    : null
            }
            <Button
                text={pending ? "Отправка.." : "Оформить заказ"}
                classNames={{button: "sm:w-1/4 w-full"}}
                onClick={handleCreateOrder}
                disabled={pending}
            />
        </section>
    );
};

export default DesktopCheckoutThirdStep;