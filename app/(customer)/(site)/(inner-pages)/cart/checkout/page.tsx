"use client"

import { $cart } from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import { $activeStep, setActiveStepEvent } from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/model";
import DesktopCheckoutFirstStep from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/first-step/DesktopCheckoutFirstStep";
import MobilePickAddressPopup from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/first-step/MobilePickAddressPopup";
import DesktopCheckoutSecondStep from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/second-step/DesktopCheckoutSecondStep";
import DesktopCheckoutThirdStep from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/third-step/DesktopCheckoutThirdStep";
import FormStepper from "@/components/mobile/moleculas/form-stepper/FormStepper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import CheckoutCard from "@/components/organisms/cards/checkout-card/CheckoutCard";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import { desktopCheckoutSteps } from "@/data/deskstopCheckoutSteps";
import useBreakpoint from "@/utlis/hooks/useBreakpoint";
import { useToggle } from "@/utlis/hooks/useToggle";
import { useUnit } from "effector-react";

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
            {breakpoint !== 'xl' && breakpoint !== '2xl' ? <FormStepper
                steps={desktopCheckoutSteps}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
            /> : null}
            {mobilePopupVisible.state ? (
                <MobilePickAddressPopup onClose={mobilePopupVisible.toggleState}/>
            ) : (
                <section
                    className={"w-full -mt-7 sm:mt-0 md:col-span-full lg:col-span-8 xl:col-span-9 flex flex-col gap-5 xl:gap-10"}>
                    {breakpoint === 'xl' || breakpoint === '2xl'  ? <FormStepper
                        steps={desktopCheckoutSteps}
                        setActiveStep={setActiveStep}
                        activeStep={activeStep}
                    /> : null}
                    <CheckoutSteps onOpenMobilePopup={mobilePopupVisible.toggleState}/>
                </section>
            )}
            {breakpoint === 'xl' || breakpoint === 'lg' || breakpoint === '2xl' ? <CheckoutCard cart={cart}/> : null}
        </InnerPageWrapper>
    );

};

export default CheckoutPage;
