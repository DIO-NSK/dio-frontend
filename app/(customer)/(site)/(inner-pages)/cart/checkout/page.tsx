"use client"

import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import React from "react";
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
import {$cart} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import CheckoutCard from "@/components/organisms/cards/checkout-card/CheckoutCard";
import {useToggle} from "@/utlis/hooks/useToggle";
import MobilePickAddressPopup
    from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/first-step/MobilePickAddressPopup";

const CheckoutSteps = (props: { onOpenMobilePopup: () => void }) => {

    const activeStep = useUnit($activeStep)

    switch (activeStep.value) {
        case 0 :
            return <DesktopCheckoutFirstStep {...props}/>
        case 1 :
            return <DesktopCheckoutSecondStep/>
        case 2 :
            return <DesktopCheckoutThirdStep/>
    }

}

const CheckoutPage = () => {

    const cart = useUnit($cart)
    const [activeStep, setActiveStep] = useUnit([$activeStep, setActiveStepEvent])
    const mobilePopupVisible = useToggle()

    if (cart) return (
        <InnerPageWrapper classNames={{desktopWrapper: "sm:grid sm:grid-cols-12 gap-7"}}>
            <HeaderRow header={"Оформление заказа"} className={"hidden sm:flex w-full"}/>
            {
                mobilePopupVisible.state ? (
                    <MobilePickAddressPopup onClose={mobilePopupVisible.toggleState}/>
                ) : (
                    <section className={"w-full -mt-7 sm:mt-0 sm:col-span-9 flex flex-col gap-5 sm:gap-10"}>
                        <FormStepper
                            steps={desktopCheckoutSteps}
                            setActiveStep={setActiveStep}
                            activeStep={activeStep}
                        />
                        <CheckoutSteps onOpenMobilePopup={mobilePopupVisible.toggleState}/>
                    </section>
                )
            }
            <CheckoutCard cart={cart}/>
        </InnerPageWrapper>
    );

};

export default CheckoutPage;
