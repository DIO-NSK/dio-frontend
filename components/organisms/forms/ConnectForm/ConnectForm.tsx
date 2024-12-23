import { FieldValues, useFormContext } from "react-hook-form";
import { ConnectFormProps } from "./ConnectForm.types";

const ConnectForm = <T extends FieldValues>({ children }: ConnectFormProps<T>) => {
  const methods = useFormContext<T>();

  return children({ ...methods });
};

export default ConnectForm;
