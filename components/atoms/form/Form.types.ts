import { WrapperProps } from "@/types/props/Wrapper";

export type FormProps = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
} & WrapperProps;
