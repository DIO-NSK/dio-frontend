"use client"

import {useUnit} from "effector-react";
import React from "react";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import FormStepper from "@/components/mobile/moleculas/form-stepper/FormStepper";
import {legalEntityCheckoutSteps} from "@/data/deskstopCheckoutSteps";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {$activeStep, setActiveStepEvent} from "@/app/(customer)/(site)/(inner-pages)/register/legal-entity/model";
import DesktopRegisterFirstStep
    from "@/app/(customer)/(site)/(inner-pages)/register/legal-entity/steps/DesktopRegisterFirstStep";
import DesktopRegisterSecondStep
    from "@/app/(customer)/(site)/(inner-pages)/register/legal-entity/steps/DesktopRegisterSecondStep";

const RegisterSteps = () => {

    const activeStep = useUnit($activeStep)

    switch (activeStep.value) {
        case 0 :
            return <DesktopRegisterFirstStep/>
        case 1 :
            return <DesktopRegisterSecondStep/>
    }

}


const RegisterLegalEntityPage = () => {

    const [activeStep, setActiveStep] = useUnit([$activeStep, setActiveStepEvent])

    return (
        <InnerPageWrapper classNames={{desktopWrapper: "sm:grid sm:grid-cols-12 gap-7"}}>
            <HeaderRow header={"Регистраци для юридических лиц"} className={"hidden sm:flex w-full"}/>
            <section className={"w-full -mt-7 sm:mt-0 sm:col-span-full flex flex-col gap-5 sm:gap-10"}>
                <FormStepper
                    steps={legalEntityCheckoutSteps}
                    setActiveStep={setActiveStep}
                    activeStep={activeStep}
                />
                <RegisterSteps/>
            </section>
        </InnerPageWrapper>
    )

}

export default RegisterLegalEntityPage