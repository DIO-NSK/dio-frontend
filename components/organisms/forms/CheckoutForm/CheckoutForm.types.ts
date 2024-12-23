import { SelectItem } from "@/types/props/SelectItem";
import { FieldValues } from "react-hook-form";

export interface CheckoutStepFromProps {
  activeStep: SelectItem<number>;
  onSubmit: () => void;
}

export interface CheckoutSubmitStepProps extends Omit<CheckoutStepFromProps, "onSubmit"> {
  onSubmit: (data: FieldValues) => Promise<void>;
}

export interface CheckoutFormProps {
  setActiveStep: (step: SelectItem<number>) => void;
  activeStep: SelectItem<number>;
  steps: SelectItem<number>[];
}
