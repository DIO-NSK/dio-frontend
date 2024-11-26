import { $orderId } from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/Steps/FirstStep/model";
import {
  $deliveryDates,
  $deliveryTimes,
  getDeliveryTimeEvent,
} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/Steps/SecondStep/model";
import ControlledSelectInput from "@/components/atoms/inputs/select-input/controlled-select-input/ControlledSelectInput";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import { CreateOrderData } from "@/schemas/customer/checkout/CreateOrderSchema";
import { SelectItem } from "@/types/props/SelectItem";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export const TimeBlock = () => {
  const { watch, getValues } = useFormContext<CreateOrderData>();

  const [orderId, deliveryTimes, deliveryDates, getDeliveryTimes] = useUnit([
    $orderId,
    $deliveryTimes,
    $deliveryDates,
    getDeliveryTimeEvent,
  ]);

  const selectedTimeItems: SelectItem<string>[] = deliveryTimes.map((item) => ({
    name: `с ${item.deliveryTime.split("-")[0]}:00 по ${item.deliveryTime.split("-")[1]}:00`,
    value: item.routeCode.toString(),
  }));

  const selectedDateItems: SelectItem<string>[] = deliveryDates.map((item) => ({
    name: dayjs(item).locale("ru").format("DD MMMM YYYY"),
    value: item,
  }));

  useEffect(() => {
    const localDate = getValues("deliveryDate.value");
    if (localDate) getDeliveryTimes({ orderId, localDate });
  }, [watch("deliveryDate")]);

  return (
    <BackgroundBlockWrapper header={"Дата и время доставки"}>
      <ControlledSelectInput
        width={"col-span-1"}
        items={selectedDateItems}
        name={"deliveryDate"}
        className={"bg-white border-2 border-light-gray"}
        placeholder={"Выберите дату доставки"}
        labelText={"Дата доставки"}
      />
      <ControlledSelectInput
        width={"col-span-1"}
        items={selectedTimeItems}
        name={"deliveryTime"}
        className={"bg-white border-2 border-light-gray"}
        placeholder={"Выберите время доставки"}
        labelText={"Время доставки"}
      />
    </BackgroundBlockWrapper>
  );
};
