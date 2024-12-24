import Button from "@/components/atoms/buttons/button/Button";
import SelectAddressPopup from "@/components/mobile/popups/select-address-popup/SelectAddressPopup";
import InputListWrapper from "@/components/wrappers/form/input-list-wrapper/InputListWrapper";
import { useFormContext } from "react-hook-form";
import { CheckoutStepFromProps } from "../CheckoutForm.types";
import { fieldNames, formData } from "./CheckoutSecondStepForm.data";
import { useToggle } from "@/utlis/hooks/useToggle";

const CheckoutSecondStepFrom = ({ activeStep, onSubmit }: CheckoutStepFromProps) => {
  const { trigger } = useFormContext();

  const handleSubmit = async () => {
    if (await trigger(fieldNames)) {
      onSubmit();
    }
  };

  const popupToggle = useToggle();

  if (activeStep.value !== 1) {
    return null;
  }

  return (
    <>
      {popupToggle.state && <SelectAddressPopup onClose={popupToggle.toggleState} />}
      <Button buttonType="SECONDARY" onClick={popupToggle.toggleState}>
        Выбрать существующий адрес
      </Button>
      <InputListWrapper inputs={formData} />
      <Button onClick={handleSubmit}>Далее</Button>
    </>
  );
};

export default CheckoutSecondStepFrom;
