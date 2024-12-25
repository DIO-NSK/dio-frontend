import Text from "@/components/atoms/Text/Text";
import { cn } from "@/utlis/cn";
import { useMemo } from "react";
import { OrderCardBlockProps } from "../OrderCard.types";
import { itemCV } from "./InformationBlock.styles";
import { createInformationGrid } from "./InformationBlock.utils";

export const InformationBlock = ({ order }: OrderCardBlockProps) => {
  const informationGrid = useMemo(() => createInformationGrid(order), [order]);

  return (
    <div className={"w-full flex flex-col md:grid grid-cols-2 gap-5"}>
      <div className={"md:hidden w-full flex flex-col gap-1 border-b-2 border-light-gray pb-5"}>
        <Text text={"Адрес доставки"} className={"text-text-gray"} />
        <Text text={order.address} />
      </div>
      {informationGrid.map((item, key) => (
        <div className={cn(itemCV, { "hidden md:flex": key === 1 }, item?.className)} key={key}>
          <Text text={item.header} className={"text-text-gray"} />
          <Text text={item.description} />
        </div>
      ))}
    </div>
  );
};
