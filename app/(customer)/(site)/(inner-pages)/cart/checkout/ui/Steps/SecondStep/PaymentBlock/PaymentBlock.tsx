"use client";

import ControlledMultiSelectButton from "@/components/atoms/buttons/multiselect-button/ControlledMultiSelectButton";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Text from "@/components/atoms/Text/Text";
import { PaymentMethod } from "@/types/dto/user/order/PaymentMethod";
import { SelectItem } from "@/types/props/SelectItem";
import { useOldBreakpoint } from "@/utlis/hooks/useBreakpoint";
import "dayjs/locale/ru";
import { FieldError } from "react-hook-form";
import { useBonuses } from "./PaymentBlock.hooks";

export const CheckoutPaymentBlock = () => {
  const [bonuses, maxBonuses, bonusesError] = useBonuses();
  const breakpoint = useOldBreakpoint();

  const isMobile = ["init", "sm", "md"].includes(breakpoint);

  const multiselectElements: SelectItem<PaymentMethod>[] = [
    { name: isMobile ? "Картой" : "Банковской картой онлайн", value: "ONLINE" },
    { name: "Наличными или картой при получении", value: "CASH" },
  ];

  return (
    <section className="w-full flex flex-col gap-5">
      <div className="w-[700px] flex flex-col gap-3">
        <Text className="text-lg font-medium">Способ оплаты</Text>
        <ControlledMultiSelectButton className="h-[70px]" items={multiselectElements} name="paymentMethod" />
      </div>
      <div className="w-[700px] flex flex-col gap-3">
        <span className="w-full flex flex-row items-baseline justify-between">
          <Text className="text-lg font-medium">Бонусы</Text>
          <Text className="text-sm text-text-gray">Текущий баланс: {bonuses} бонусов</Text>
        </span>
        <ControlledTextInput
          placeholder="Количество бонусов для списания"
          errors={bonusesError as FieldError}
          endDecorator={`макс. ${maxBonuses}`}
          name="bonuses"
          theme="filled"
        />
      </div>
    </section>
  );
};
