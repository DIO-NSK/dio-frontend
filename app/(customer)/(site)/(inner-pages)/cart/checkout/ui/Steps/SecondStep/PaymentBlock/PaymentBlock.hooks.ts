import { getBonuses } from "@/app/(customer)/profile/page.api";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useOrderPrice } from "../../../../page.hooks";

const BONUSES_FORM_KEY = "bonuses";
const MAX_BONUSES_PERCENT = 0.7;

export const useBonuses = () => {
  const [error, setError] = useState<{ message: string } | undefined>(undefined);
  const [bonuses, setBonuses] = useState<number>(0);

  const { totalActualPrice } = useOrderPrice();
  const { getValues } = useFormContext();

  const maxBonuses = Math.ceil(totalActualPrice * MAX_BONUSES_PERCENT);

  /** Получает значение бонусов от API. */
  useEffect(() => {
    getBonuses().then(setBonuses);
  }, []);

  /** Валидирует введённое пользователем значение бонусов. */
  useEffect(() => {
    const currentBonuses = getValues(BONUSES_FORM_KEY);

    if (isNaN(Number(currentBonuses))) {
      setError({ message: "Количество бонусов должно содержать только цифры." });
    } else if (currentBonuses.includes(".")) {
      setError({ message: "Количество бонусов должно быть целым числом." });
    } else if (Number(currentBonuses) > bonuses) {
      setError({ message: "Количество бонусов не может быть больше баланса бонусов." });
    } else if (Number(currentBonuses) > maxBonuses) {
      setError({ message: "Количество бонусов не может быть больше 70% от суммы заказа." });
    } else if (Number(currentBonuses) < 0) {
      setError({ message: "Количество бонусов не может быть меньше нуля." });
    } else {
      setError(undefined);
    }
  }, [getValues(BONUSES_FORM_KEY)]);

  return [bonuses, maxBonuses, error] as const;
};
