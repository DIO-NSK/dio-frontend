"use client"

import MobilePageWrapper from "@/components/mobile/wrappers/mobile-page-wrapper/MobilePageWrapper";
import CheckoutForm from "@/components/organisms/forms/checkout-form/CheckoutForm";
import {useState} from "react";
import {SelectItem} from "@/types/props/SelectItem";

const Page = () => {

    const DEFAULT_STEP_INDEX = 0

    const steps : SelectItem<number>[] = [
        {name : "Данные получателя", value : 0},
        {name : "Адрес доставки", value : 1},
        {name : "Дополнительно", value : 2},
    ]

    const [
        activeStep,
        setActiveStep
    ] = useState<SelectItem<number>>(steps[DEFAULT_STEP_INDEX])

    return (
        <MobilePageWrapper>
            <CheckoutForm
                setActiveStep={setActiveStep}
                activeStep={activeStep}
                steps={steps}
            />
        </MobilePageWrapper>
    )

}

const MobileCheckoutFirstStepPage = () => {
    return <></>
};

export default MobileCheckoutFirstStepPage;
