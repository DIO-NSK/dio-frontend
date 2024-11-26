import ControlledTextArea from "@/components/atoms/inputs/controlled-text-area/ControlledTextArea";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";

export const CommentBlock = () => (
  <BackgroundBlockWrapper header={"Дополнительно"}>
    <ControlledTextArea
      placeholder={"Комментарий к заказу поможет уточнить данные об адресе доставки и ваших предпочтениях"}
      classNames={{ wrapper: "col-span-full" }}
      labelText={"Комментарий к заказу"}
      name={"comment"}
      theme={"filled"}
    />
  </BackgroundBlockWrapper>
);
