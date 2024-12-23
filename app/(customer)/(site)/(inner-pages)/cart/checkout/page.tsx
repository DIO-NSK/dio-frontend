"use client";

import { $cart } from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import { $activeStep, setActiveStepEvent } from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/model";
import MobilePickAddressPopup from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/ui/Steps/FirstStep/MobilePickAddressPopup";
import FormStepper from "@/components/mobile/moleculas/form-stepper/FormStepper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import CheckoutCard from "@/components/organisms/cards/checkout-card/CheckoutCard";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import InnerPageWrapper from "@/components/wrappers/InnerPageWrapper/InnerPageWrapper";
import { desktopCheckoutSteps } from "@/data/deskstopCheckoutSteps";
import { useOldBreakpoint } from "@/utlis/hooks/useBreakpoint";
import { useToggle } from "@/utlis/hooks/useToggle";
import { useUnit } from "effector-react";
import { CheckoutSwitcher } from "./ui/CheckoutSwitcher/CheckoutSwitcher";
import { Column } from "./ui/Column";

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useUnit([$activeStep, setActiveStepEvent]);
  const mobilePopupVisible = useToggle();
  const breakpoint = useOldBreakpoint();
  const cart = useUnit($cart);

  const isLaptopOrLarger = ["xl", "2xl"].includes(breakpoint);
  const isTabletOrLarger = isLaptopOrLarger || breakpoint === "lg";

  if (!cart) {
    return null;
  }

  return (
    <InnerPageWrapper classNames={{ desktopWrapper: "gap-7", mobileWrapper: "-mt-5" }}>
      <HeaderRow header="Оформление заказа" className="hidden md:flex w-full" />
      <IfRenderBlock condition={!isLaptopOrLarger}>
        <FormStepper steps={desktopCheckoutSteps} setActiveStep={setActiveStep} activeStep={activeStep} />
      </IfRenderBlock>
      {mobilePopupVisible.state ? (
        <MobilePickAddressPopup onClose={mobilePopupVisible.toggleState} />
      ) : (
        <Column>
          <IfRenderBlock condition={isLaptopOrLarger}>
            <FormStepper steps={desktopCheckoutSteps} setActiveStep={setActiveStep} activeStep={activeStep} />
          </IfRenderBlock>
          <CheckoutSwitcher onOpenMobilePopup={mobilePopupVisible.toggleState} />
        </Column>
      )}
      <IfRenderBlock condition={isTabletOrLarger}>
        <CheckoutCard cart={cart} />
      </IfRenderBlock>
    </InnerPageWrapper>
  );
};

export default CheckoutPage;
