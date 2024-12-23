import Button from "@/components/atoms/buttons/button/Button";
import ControlledTextArea from "@/components/atoms/inputs/controlled-text-area/ControlledTextArea";
import ControlledSelectInput from "@/components/atoms/inputs/select-input/controlled-select-input/ControlledSelectInput";
import RadioGroup from "@/components/moleculas/radio-group/RadioGroup";
import InputListWrapper from "@/components/wrappers/form/input-list-wrapper/InputListWrapper";
import { useFormContext } from "react-hook-form";
import { CheckoutSubmitStepProps } from "../CheckoutForm.types";
import { fieldNames, formData, radioGroupItems, selectItems } from "./CheckoutThirdStepForm.data";

const CheckoutThirdStepForm = ({ activeStep, onSubmit }: CheckoutSubmitStepProps) => {
  const {
    trigger,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext();

  const buttonText = isSubmitting ? "Отправка.." : "Отправить";

  const handleProcess = async () => {
    if (!(await trigger(fieldNames))) {
      return;
    }

    await handleSubmit(onSubmit)();
  };

  if (activeStep.value !== 2) {
    return null;
  }

  return (
    <>
      <InputListWrapper inputs={formData} />
      <ControlledSelectInput
        placeholder="Выберите время доставки"
        labelText="Время доставки"
        name="deliveryTime"
        items={selectItems}
      />
      <RadioGroup items={radioGroupItems} name="paymentType" />
      <ControlledTextArea placeholder="Уточните детали заказа в комментарии" name="additional" />
      <Button onClick={handleProcess} text={buttonText} disabled={isSubmitting} />
    </>
  );
};

export default CheckoutThirdStepForm;
