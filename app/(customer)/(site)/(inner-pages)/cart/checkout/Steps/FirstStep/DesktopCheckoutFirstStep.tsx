import { $activeStep, setActiveStepEvent } from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/model";
import {
  $activeUserAddress,
  $checkoutFirstStepData,
  createOrderDraftFx,
  setCheckoutFirstStepDataEvent,
} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/Steps/FirstStep/model";
import { getDeliveryDateEvent } from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/Steps/SecondStep/model";
import { $userCredentials } from "@/app/(customer)/model";
import { $orderToRepeat } from "@/app/(customer)/profile/orders/model";
import Button from "@/components/atoms/buttons/button/Button";
import Form from "@/components/atoms/form/Form";
import { getCoordsByLocation } from "@/components/organisms/address-block/AddressBlock.api";
import { desktopCheckoutSteps } from "@/data/deskstopCheckoutSteps";
import { CreateOrderDraftData, CreateOrderDraftSchema } from "@/schemas/customer/checkout/CreateOrderDraftSchema";
import { useLocation } from "@/utlis/hooks/useLocation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { AddressDeliveryBlock } from "./AddressDeliveryBlock/AddressDeliveryBlock";
import { CommentBlock } from "./CommentBlock/CommentBlock";
import { UserDataBlock } from "./UserDataBlock/UserDataBlock";

const DesktopCheckoutFirstStep = (props: { onOpenMobilePopup: () => void }) => {
  const location = useLocation();
  const [pickedUserAddress, orderToRepeat] = useUnit([$activeUserAddress, $orderToRepeat]);
  const [formData, setFormData] = useUnit([$checkoutFirstStepData, setCheckoutFirstStepDataEvent]);
  const [activeStep, setActiveStep] = useUnit([$activeStep, setActiveStepEvent]);
  const [userCredentials, createOrderDraft, getDeliveryDate] = useUnit([
    $userCredentials,
    createOrderDraftFx,
    getDeliveryDateEvent,
  ]);

  const methods = useForm<CreateOrderDraftData>({
    resolver: zodResolver(CreateOrderDraftSchema),
    criteriaMode: "firstError",
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    watch,
    setValue,
  } = methods;

  const onSubmit = (formData: FieldValues) => {
    createOrderDraft(formData as CreateOrderDraftData)
      .then((orderId) => getDeliveryDate(orderId))
      .then((_) => setActiveStep(desktopCheckoutSteps[activeStep.value + 1]));
    setFormData(formData as CreateOrderDraftData);
  };

  useEffect(() => {
    const { address, email, firstName, surname, phoneNumber } = formData;

    reset({
      ...formData,
      address: address?.address
        ? address
        : { address: "", house: "", city: "", latitude: location[0], longitude: location[1] },
      email: Boolean(email) ? email : userCredentials?.email,
      firstName: Boolean(firstName) ? firstName : userCredentials?.fullName.split(" ")[0],
      surname: Boolean(surname) ? surname : userCredentials?.fullName.split(" ")[1],
      phoneNumber: Boolean(phoneNumber) ? phoneNumber : userCredentials?.phoneNumber,
    });
  }, [formData, userCredentials]);

  useEffect(() => {
    if (orderToRepeat?.address) {
      getCoordsByLocation(orderToRepeat.address).then((suggestions) => {
        reset({
          address: {
            address: suggestions[0].address,
            latitude: suggestions[0].lat,
            longitude: suggestions[0].lng,
          },
        });
      });
    }
  }, [orderToRepeat]);

  return (
    <FormProvider {...methods}>
      <Form>
        <UserDataBlock />
        <AddressDeliveryBlock {...props} />
        <CommentBlock />
        <Button
          classNames={{ button: "w-full md:w-[200px] xl:w-1/4" }}
          text={isSubmitting ? "Отправка.." : "Далее"}
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />
      </Form>
    </FormProvider>
  );
};

export default DesktopCheckoutFirstStep;
