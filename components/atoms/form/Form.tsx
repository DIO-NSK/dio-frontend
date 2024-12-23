import { cn } from "@/utlis/cn";
import { FormEventHandler } from "react";
import { FormProps } from "./Form.types";

const Form = ({ onSubmit, children, ...props }: FormProps) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit?.(event);
  };

  return (
    <form className={cn("w-full flex flex-col gap-5 sm:gap-7", props.className)} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default Form;
