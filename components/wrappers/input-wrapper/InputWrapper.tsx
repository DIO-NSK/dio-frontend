import Text from "@/components/atoms/Text/Text";
import { TextInputProps } from "@/types/props/inputs/TextInput";
import { cn } from "@/utlis/cn";
import { ClassValue } from "clsx";
import React from "react";

type InputWrapperProps = {
  children: React.ReactNode;
  props: TextInputProps;
};

const InputWrapper = ({ children, props }: InputWrapperProps) => {
  const hintTextCV: ClassValue = {
    "text-info-red": props.hintText?.type === "warning",
    "text-text-gray": props.hintText?.type === "neutral",
  };

  return (
    <div className={cn("w-full flex flex-col gap-2", props.classNames?.wrapper)}>
      {props.labelText && <Text text={props.labelText} className={"text-base text-black"} />}
      {children}
      {props.hintText && <Text text={props.hintText.hintMessage} className={cn(hintTextCV, "text-[14px]")} />}
    </div>
  );
};

export default InputWrapper;
