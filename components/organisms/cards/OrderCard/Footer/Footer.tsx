"use client";

import { selectOrderToRepeatEvent } from "@/app/(customer)/profile/orders/model";
import Button from "@/components/atoms/buttons/button/Button";
import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";
import IconTextButton from "@/components/atoms/buttons/icon-text-button/IconTextButton";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { FiRefreshCw } from "react-icons/fi";
import { FooterProps } from "./Footer.types";

export const Footer = ({ canRepeat, isOpen, setOpen, order }: FooterProps) => {
  const selectOrderToRepeat = useUnit(selectOrderToRepeatEvent);
  const router = useRouter();

  const handleOpenState = () => setOpen(!isOpen);

  const handleRepeatOrder = () => {
    selectOrderToRepeat(order);

    router.push("/cart/checkout");
  };

  return (
    <div className={"w-full flex flex-row items-center justify-between"}>
      <IconTextButton
        icon={<ChevronButton isExpanded={isOpen} setExpanded={setOpen} />}
        className={"text-text-gray"}
        onClick={handleOpenState}
        placement={"right"}
        text={"Подробнее"}
      />
      <IfRenderBlock condition={canRepeat}>
        <Button
          classNames={{ button: "p-0 bg-0 md:py-3 md:px-4 md:bg-light-gray" }}
          icon={<FiRefreshCw size={"18px"} className={"hidden md:flex"} />}
          onClick={handleRepeatOrder}
          text={"Повторить заказ"}
          buttonType={"SECONDARY"}
          size={"sm"}
        />
      </IfRenderBlock>
    </div>
  );
};
