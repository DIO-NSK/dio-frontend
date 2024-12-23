import Form from "@/components/atoms/form/Form";
import FormStepper from "@/components/mobile/moleculas/form-stepper/FormStepper";
import { CheckoutFormData, CheckoutFormSchema } from "@/schemas/customer/checkout/CheckoutFormSchema";
import { getFormDataFromStorage } from "@/utlis/getFormDataFromStorage";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { CheckoutFormProps } from "./CheckoutForm.types";
import CheckoutFirstStepForm from "./FirstStep/CheckoutFirstStepForm";
import CheckoutSecondStepForm from "./SecondStep/CheckoutSecondStepForm";
import CheckoutThirdStepForm from "./ThirdStep/CheckoutThirdStepForm";

const CheckoutForm = (props: CheckoutFormProps) => {
  const methods = useForm<CheckoutFormData>({
    defaultValues: getFormDataFromStorage("checkoutForm"),
    resolver: zodResolver(CheckoutFormSchema),
    mode: "onSubmit",
  });

  const { handleSubmit, setValue, watch } = methods;

  useFormPersist("checkoutForm", {
    storage: window.localStorage,
    setValue,
    watch,
  });

  const onSubmit = async (data: FieldValues) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const handleNextClick = () => {
    const nextActiveStep = props.steps[props.activeStep.value + 1];
    
    props.setActiveStep(nextActiveStep);
  };

  return (
    <FormProvider {...methods}>
      <FormStepper {...props} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CheckoutFirstStepForm onSubmit={handleNextClick} {...props} />
        <CheckoutSecondStepForm onSubmit={handleNextClick} {...props} />
        <CheckoutThirdStepForm onSubmit={onSubmit} {...props} />
      </Form>
    </FormProvider>
  );
};

export default CheckoutForm;
