import { $cart } from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import { $activeStep, setActiveStepEvent } from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/model";
import { $orderId } from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/first-step/model";
import {
    $checkoutSecondStepData,
    $deliveryDates,
    $deliveryTimes,
    getDeliveryTimeEvent,
    setCheckoutSecondStepDataEvent
} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/second-step/model";
import { $orderToRepeat } from "@/app/(customer)/profile/orders/model";
import Button from "@/components/atoms/buttons/button/Button";
import ControlledMultiSelectButton from "@/components/atoms/buttons/multiselect-button/ControlledMultiSelectButton";
import Form from "@/components/atoms/form/Form";
import ControlledSelectInput from "@/components/atoms/inputs/select-input/controlled-select-input/ControlledSelectInput";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Text from "@/components/atoms/text/text-base/Text";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import { BREAKPOINT_MOBILE } from "@/constants";
import { desktopCheckoutSteps } from "@/data/deskstopCheckoutSteps";
import { CreateOrderData, CreateOrderSchema } from "@/schemas/customer/checkout/CreateOrderSchema";
import { PaymentMethod } from "@/types/dto/user/order/PaymentMethod";
import { SelectItem } from "@/types/props/SelectItem";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useUnit } from "effector-react";
import { useEffect, useState } from 'react';
import { DefaultValues, FieldError, FieldValues, FormProvider, useForm, useFormContext } from "react-hook-form";
import { useOrderPrice } from "../../page.hooks";

const CheckoutTimeBlock = () => {

    const { watch, getValues } = useFormContext<CreateOrderData>()

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
        if (localDate) getDeliveryTimes({ orderId, localDate })
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
    const { totalActualPrice } = useOrderPrice();
    const maxBonuses = Math.ceil(totalActualPrice * 0.7);
    const { getValues } = useFormContext();

    const [bonusesError, setBonusesError] = useState<{ message: string } | undefined>(undefined);

    const multiselectElements: SelectItem<PaymentMethod>[] = [
        { name: window.screen.width < BREAKPOINT_MOBILE ? "Картой" : "Банковской картой онлайн", value: "ONLINE" },
        { name: "Наличными", value: "CASH" }
    ]

    useEffect(() => {
        const bonuses = getValues('bonuses');

        if (!isNaN(Number(bonuses)) && Number(bonuses) > maxBonuses) {
            setBonusesError({ message: 'Количество бонусов не может быть больше 70% от суммы заказа.' });
        } else {
            setBonusesError(undefined);
        }
    }, [getValues('bonuses')])

    return (
        <section className={'w-full grid grid-cols-2 gap-5'}>
            <div className={"w-full col-span-1 flex flex-col gap-3"}>
                <Text text={"Способ оплаты"} className={"text-lg font-medium"} />
                <ControlledMultiSelectButton
                    className={"h-[70px]"}
                    items={multiselectElements}
                    name={"paymentMethod"}
                />
            </div>
            <div className={"w-full col-span-1 flex flex-col gap-3"}>
                <Text text={"Бонусы"} className={"text-lg font-medium"} />
                <ControlledTextInput
                    placeholder={'Количество бонусов для списания'}
                    errors={bonusesError as FieldError}
                    endDecorator={`макс. ${maxBonuses}`}
                    name={'bonuses'}
                    theme="filled"
                />
            </div>
        </section>
    )
}

const DesktopCheckoutSecondStep = () => {
    const orderToRepeat = useUnit($orderToRepeat)
    const [activeStep, setActiveStep] = useUnit([$activeStep, setActiveStepEvent])
    const [cart, orderId, formData, setFormData] = useUnit([$cart, $orderId, $checkoutSecondStepData, setCheckoutSecondStepDataEvent])

    const { totalActualPrice } = useOrderPrice();
    const maxBonuses = Math.ceil(totalActualPrice * 0.7);

    const methods = useForm<CreateOrderData>({
        resolver: zodResolver(CreateOrderSchema),
        mode: "onSubmit"
    })

    const {
        handleSubmit, getValues,
        formState: { isSubmitting }, reset
    } = methods

    const onSubmit = (formData: FieldValues) => {
        const bonuses = getValues('bonuses');

        if (!isNaN(Number(bonuses)) && Number(bonuses) <= maxBonuses) {
            setFormData(formData as CreateOrderData)
            setActiveStep(desktopCheckoutSteps[activeStep.value + 1])
        }
    }

    useEffect(() => {

        const pickedProducts = orderToRepeat
            ? orderToRepeat.items.map(i => i.productItemId)
            : cart?.products.map(i => i.productItemId)

        const pickedPromos = orderToRepeat
            ? orderToRepeat.items.map(i => i.promoItemId)
            : cart?.promos.map(i => i.promoItemId)

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

    if (orderId !== 0) return (
        <FormProvider {...methods}>
            <Form>
                <CheckoutTimeBlock />
                <CheckoutPaymentBlock />
                <Button
                    text={isSubmitting ? "Отправка.." : "К подтверждению"}
                    onClick={handleSubmit(onSubmit)}
                    classNames={{ button: "w-full md:w-[200px] xl:w-1/4" }}
                />
            </Form>
        </FormProvider>
    )

};

export default DesktopCheckoutSecondStep;