import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import { data } from "./UserDataBlock.constants";

export const UserDataBlock = () => (
  <BackgroundBlockWrapper header={"Данные получателя"}>
    {data.map((input, key) => (
      <ControlledTextInput {...input} key={key} theme={"filled"} />
    ))}
  </BackgroundBlockWrapper>
);
