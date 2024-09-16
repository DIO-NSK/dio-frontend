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
import useBreakpoint from "@/utlis/hooks/useBreakpoint";

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

    const breakpoint = useBreakpoint();
    const cart = useUnit($cart)
    const [activeStep, setActiveStep] = useUnit([$activeStep, setActiveStepEvent])
    const mobilePopupVisible = useToggle()

    if (cart) return (
        <InnerPageWrapper classNames={{desktopWrapper: "gap-7", mobileWrapper : '-mt-5'}}>
            <HeaderRow header={"Оформление заказа"} className={"hidden md:flex w-full"}/>
            {breakpoint !== 'xl' ? <FormStepper
                steps={desktopCheckoutSteps}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
            /> : null}
            {mobilePopupVisible.state ? (
                <MobilePickAddressPopup onClose={mobilePopupVisible.toggleState}/>
            ) : (
                <section
                    className={"w-full -mt-7 sm:mt-0 md:col-span-full lg:col-span-8 xl:col-span-9 flex flex-col gap-5 xl:gap-10"}>
                    {breakpoint === 'xl' ? <FormStepper
                        steps={desktopCheckoutSteps}
                        setActiveStep={setActiveStep}
                        activeStep={activeStep}
                    /> : null}
                    <CheckoutSteps onOpenMobilePopup={mobilePopupVisible.toggleState}/>
                </section>
            )}
            {breakpoint === 'xl' || breakpoint === 'lg' ? <CheckoutCard cart={cart}/> : null}
        </InnerPageWrapper>
    );

};

export default CheckoutPage;
