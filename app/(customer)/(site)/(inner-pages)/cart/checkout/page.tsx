"use client"

import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import ShoppingCartTotalPriceCard
    from "@/components/organisms/cards/shopping-cart-total-price-card/ShoppingCartTotalPriceCard";
import React, {useEffect} from "react";
import DesktopCheckoutFirstStep
    from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/first-step/DesktopCheckoutFirstStep";
import DesktopCheckoutSecondStep
    from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/second-step/DesktopCheckoutSecondStep";
import FormStepper from "@/components/mobile/moleculas/form-stepper/FormStepper";
import {useUnit} from "effector-react";
import {$activeStep, setActiveStepEvent} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/model";
import {desktopCheckoutSteps} from "@/data/deskstopCheckoutSteps";
import DesktopCheckoutThirdStep
    from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/third-step/DesktopCheckoutThirdStep";
import {$cart, getCartEvent} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import CheckoutCard from "@/components/organisms/cards/checkout-card/CheckoutCard";

const CheckoutSteps = () => {

    const activeStep = useUnit($activeStep)

    switch (activeStep.value) {
        case 0 :
            return <DesktopCheckoutFirstStep/>
        case 1 :
            return <DesktopCheckoutSecondStep/>
        case 2 :
            return <DesktopCheckoutThirdStep/>
    }

}

const CheckoutPage = () => {

    const [cart, getCart] = useUnit([$cart, getCartEvent])
    const [activeStep, setActiveStep] = useUnit([$activeStep, setActiveStepEvent])

    useEffect(() => {
        if (!cart) getCart()
    }, [])

    if (cart) return (
        <InnerPageWrapper classNames={{desktopWrapper: "grid grid-cols-12 gap-7"}}>
            <HeaderRow header={"Оформление заказа"} className={"w-full"}/>
            <section className={"col-span-9 flex flex-col gap-10"}>
                <FormStepper
                    steps={desktopCheckoutSteps}
                    setActiveStep={setActiveStep}
                    activeStep={activeStep}
                />
                <CheckoutSteps/>
            </section>
            <CheckoutCard cart={cart}/>
        </InnerPageWrapper>
    );

};

export default CheckoutPage;
