import { getBonuses } from "@/app/(customer)/profile/page.api";
import ControlledMultiSelectButton from "@/components/atoms/buttons/multiselect-button/ControlledMultiSelectButton";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Text from "@/components/atoms/Text/Text";
import { BREAKPOINT_MOBILE } from "@/constants";
import { PaymentMethod } from "@/types/dto/user/order/PaymentMethod";
import { SelectItem } from "@/types/props/SelectItem";
import "dayjs/locale/ru";
import { useEffect, useState } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import { useOrderPrice } from "../../../page.hooks";

export const CheckoutPaymentBlock = () => {
  const { totalActualPrice } = useOrderPrice();
  const maxBonuses = Math.ceil(totalActualPrice * 0.7);
  const { getValues } = useFormContext();

  const [bonusesError, setBonusesError] = useState<{ message: string } | undefined>(undefined);
  const [bonuses, setBonuses] = useState<number>(0);

  const multiselectElements: SelectItem<PaymentMethod>[] = [
    { name: window.screen.width < BREAKPOINT_MOBILE ? "Картой" : "Банковской картой онлайн", value: "ONLINE" },
    { name: "Наличными или картой при получении", value: "CASH" },
  ];

  useEffect(() => {
    const bonuses = getValues("bonuses");

    if (!isNaN(Number(bonuses)) && Number(bonuses) > maxBonuses) {
      setBonusesError({ message: "Количество бонусов не может быть больше 70% от суммы заказа." });
    } else {
      setBonusesError(undefined);
    }
  }, [getValues("bonuses")]);

  useEffect(() => {
    getBonuses().then(setBonuses);
  }, []);

  return (
    <section className={"w-full flex flex-col gap-5"}>
      <div className={"w-[700px] flex flex-col gap-3"}>
        <Text text={"Способ оплаты"} className={"text-lg font-medium"} />
        <ControlledMultiSelectButton className={"h-[70px]"} items={multiselectElements} name={"paymentMethod"} />
      </div>
      <div className={"w-[700px] flex flex-col gap-3"}>
        <span className={"w-full flex flex-row items-baseline justify-between"}>
          <Text text={"Бонусы"} className={"text-lg font-medium"} />
          <Text text={`Текущий баланс: ${bonuses} бонусов`} className={"text-sm text-text-gray"} />
        </span>
        <ControlledTextInput
          placeholder={"Количество бонусов для списания"}
          errors={bonusesError as FieldError}
          endDecorator={`макс. ${maxBonuses}`}
          name={"bonuses"}
          theme="filled"
        />
      </div>
    </section>
  );
};
