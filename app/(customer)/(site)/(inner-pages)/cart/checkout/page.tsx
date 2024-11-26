"use client";

import { $cart } from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import { $activeStep, setActiveStepEvent } from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/model";
import MobilePickAddressPopup from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/Steps/FirstStep/MobilePickAddressPopup";
import FormStepper from "@/components/mobile/moleculas/form-stepper/FormStepper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import CheckoutCard from "@/components/organisms/cards/checkout-card/CheckoutCard";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import { desktopCheckoutSteps } from "@/data/deskstopCheckoutSteps";
import { useOldBreakpoint } from "@/utlis/hooks/useBreakpoint";
import { useToggle } from "@/utlis/hooks/useToggle";
import { VStack } from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { CheckoutSwitcher } from "./CheckoutSwitcher/CheckoutSwitcher";

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
      {!isLaptopOrLarger ? (
        <FormStepper steps={desktopCheckoutSteps} setActiveStep={setActiveStep} activeStep={activeStep} />
      ) : null}
      {mobilePopupVisible.state ? (
        <MobilePickAddressPopup onClose={mobilePopupVisible.toggleState} />
      ) : (
        <VStack
          gridColumn={["1 / -1", "1 / -1", "1 / -1", "span 8 / span 8", "span 9 / span 9"]}
          gap={{ base: "20px", xl: "40px" }}
          alignItems="start"
          w="full"
        >
          {isLaptopOrLarger ? (
            <FormStepper steps={desktopCheckoutSteps} setActiveStep={setActiveStep} activeStep={activeStep} />
          ) : null}
          <CheckoutSwitcher onOpenMobilePopup={mobilePopupVisible.toggleState} />
        </VStack>
      )}
      {isTabletOrLarger ? <CheckoutCard cart={cart} /> : null}
    </InnerPageWrapper>
  );
};

export default CheckoutPage;
