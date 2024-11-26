import { $activeStep } from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/model";
import DesktopCheckoutFirstStep from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/Steps/FirstStep/DesktopCheckoutFirstStep";
import DesktopCheckoutSecondStep from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/Steps/SecondStep/DesktopCheckoutSecondStep";
import DesktopCheckoutThirdStep from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/Steps/ThirdStep/DesktopCheckoutThirdStep";
import { useUnit } from "effector-react";
import { ReactNode } from "react";
import { CheckoutSwitcherProps } from "./CheckoutSwitcher.types";

const Builder: Record<number, (props: CheckoutSwitcherProps) => ReactNode> = {
  0: (props: CheckoutSwitcherProps) => <DesktopCheckoutFirstStep {...props} />,
  1: () => <DesktopCheckoutSecondStep />,
  2: () => <DesktopCheckoutThirdStep />,
};

export const CheckoutSwitcher = (props: CheckoutSwitcherProps) => {
  const activeStep = useUnit($activeStep);

  return Builder[activeStep.value](props);
};
