import { useFormContext } from "react-hook-form";
import { CheckoutStepFromProps } from "../CheckoutForm.types";
import { fieldNames, formData } from "./CheckoutFirstStepForm.data";
import InputListWrapper from "@/components/wrappers/form/input-list-wrapper/InputListWrapper";
import Button from "@/components/atoms/buttons/button/Button";

const CheckoutFirstStepForm = ({ activeStep, onSubmit }: CheckoutStepFromProps) => {
  const { trigger } = useFormContext();

  const handleSubmit = async () => {
    if (await trigger(fieldNames)) {
      onSubmit();
    }
  };

  if (activeStep.value !== 0) {
    return null;
  }

  return (
    <>
      <InputListWrapper inputs={formData} />
      <Button onClick={handleSubmit}>Далее</Button>
    </>
  );
};

export default CheckoutFirstStepForm;
