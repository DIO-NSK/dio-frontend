import { $activeStep } from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/model";
import { useUnit } from "effector-react";
import { ReactNode } from "react";
import DesktopCheckoutFirstStep from "../Steps/FirstStep/DesktopCheckoutFirstStep";
import DesktopCheckoutSecondStep from "../Steps/SecondStep/DesktopCheckoutSecondStep";
import DesktopCheckoutThirdStep from "../Steps/ThirdStep/DesktopCheckoutThirdStep";
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
