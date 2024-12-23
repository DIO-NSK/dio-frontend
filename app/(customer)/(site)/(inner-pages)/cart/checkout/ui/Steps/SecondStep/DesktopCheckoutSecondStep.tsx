import { $cart } from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import { $activeStep, setActiveStepEvent } from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/model";
import { $orderId } from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/ui/Steps/FirstStep/model";
import {
  $checkoutSecondStepData,
  setCheckoutSecondStepDataEvent,
} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/ui/Steps/SecondStep/model";
import { $orderToRepeat } from "@/app/(customer)/profile/orders/model";
import Button from "@/components/atoms/buttons/button/Button";
import Form from "@/components/atoms/form/Form";
import { desktopCheckoutSteps } from "@/data/deskstopCheckoutSteps";
import { CreateOrderData, CreateOrderSchema } from "@/schemas/customer/checkout/CreateOrderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { DefaultValues, FieldValues, FormProvider, useForm } from "react-hook-form";
import { useOrderPrice } from "../../../page.hooks";
import { CheckoutPaymentBlock } from "./PaymentBlock/PaymentBlock";
import { TimeBlock } from "./TimeBlock/TimeBlock";

import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import "dayjs/locale/ru";

const DesktopCheckoutSecondStep = () => {
  const orderToRepeat = useUnit($orderToRepeat);
  const [activeStep, setActiveStep] = useUnit([$activeStep, setActiveStepEvent]);
  const [cart, orderId, formData, setFormData] = useUnit([
    $cart,
    $orderId,
    $checkoutSecondStepData,
    setCheckoutSecondStepDataEvent,
  ]);

  const { totalActualPrice } = useOrderPrice();
  const maxBonuses = Math.ceil(totalActualPrice * 0.7);

  const methods = useForm<CreateOrderData>({
    resolver: zodResolver(CreateOrderSchema),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting },
    reset,
  } = methods;

  const buttonText = isSubmitting ? "Отправка.." : "К подтверждению";

  const onSubmit = (formData: FieldValues) => {
    const bonuses = getValues("bonuses");

    if (!isNaN(Number(bonuses)) && Number(bonuses) <= maxBonuses) {
      setFormData(formData as CreateOrderData);
      setActiveStep(desktopCheckoutSteps[activeStep.value + 1]);
    }
  };

  useEffect(() => {
    const pickedProducts = orderToRepeat
      ? orderToRepeat.items.map((i) => i.productItemId)
      : cart?.products.map((i) => i.productItemId);

    const pickedPromos = orderToRepeat
      ? orderToRepeat.items.map((i) => i.promoItemId)
      : cart?.promos.map((i) => i.promoItemId);

    reset({
      ...formData,
      pickedProducts: pickedProducts,
      pickedPromos: pickedPromos,
      orderId,
    } as DefaultValues<CreateOrderData>);
  }, [formData, orderId, cart, orderToRepeat]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <IfRenderBlock condition={orderId !== 0}>
      <FormProvider {...methods}>
        <Form>
          <TimeBlock />
          <CheckoutPaymentBlock />
          <Button onClick={handleSubmit(onSubmit)} classNames={{ button: "w-full md:w-[200px] xl:w-1/4" }}>
            {buttonText}
          </Button>
        </Form>
      </FormProvider>
    </IfRenderBlock>
  );
};

export default DesktopCheckoutSecondStep;
