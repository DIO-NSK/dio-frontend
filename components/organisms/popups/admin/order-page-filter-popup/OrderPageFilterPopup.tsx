import { $orders } from "@/app/admin/orders/model";
import Button from "@/components/atoms/buttons/button/Button";
import ControlledMultiSelectButton from "@/components/atoms/buttons/multiselect-button/ControlledMultiSelectButton";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import Form from "@/components/atoms/form/Form";
import ControlledRangeInput from "@/components/atoms/inputs/range-input/ControlledRangeInput";
import ControlledSelectInput from "@/components/atoms/inputs/select-input/controlled-select-input/ControlledSelectInput";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Text from "@/components/atoms/Text/Text";
import {
  $savedFilters,
  $savedPriceRange,
  filterOrdersEvent,
  PageableOrdersFilterData,
  resetFiltersEvent,
  saveFiltersEvent,
} from "@/components/organisms/popups/admin/order-page-filter-popup/model";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import { OrderFilterData, OrderFilterSchema } from "@/schemas/admin/OrderFiltersSchema";
import { PaymentMethod } from "@/types/dto/user/order/PaymentMethod";
import { selectableOrderStatuses } from "@/types/dto/user/order/ResponseProfileOrder";
import { PopupProps } from "@/types/props/Popup";
import { SelectItem } from "@/types/props/SelectItem";
import { cn } from "@/utlis/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClassValue } from "clsx";
import dayjs from "dayjs";
import { useUnit } from "effector-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

const rowWrapperCV: ClassValue = "w-full flex flex-row gap-5 pb-7 border-b-2 border-light-gray";

const paymentStatusItems: SelectItem<PaymentMethod>[] = [
  { name: "Наличными", value: "CASH" },
  { name: "Онлайн", value: "ONLINE" },
];

const OrderPageFilterPopup = (props: PopupProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(Array.from(searchParams.entries()));

  const savedPriceRange = useUnit($savedPriceRange);
  const [orders, filterOrders] = useUnit([$orders, filterOrdersEvent]);
  const [savedFilters, saveFilters, resetFilters] = useUnit([$savedFilters, saveFiltersEvent, resetFiltersEvent]);

  const methods = useForm<OrderFilterData>({
    resolver: zodResolver(OrderFilterSchema),
    mode: "onSubmit",
  });

  const onSubmit = (fieldValues: FieldValues) => {
    saveFilters({ ...fieldValues, page: 0 } as PageableOrdersFilterData);
    filterOrders({ ...fieldValues, page: 0 } as PageableOrdersFilterData);
    props.onClose?.();
  };

  const handleResetFilters = () => {
    methods.reset();
    resetFilters();

    urlSearchParams.set("page", "1");
    router.push(pathname.concat(`?${urlSearchParams.toString()}`));
    window.scrollTo(0, 0);

    props.onClose?.();
  };

  const handleSetToday = () => {
    const today = dayjs(Date.now()).format("DD.MM.YYYY");
    methods.setValue("created", today);
  };

  useEffect(() => {
    methods.reset({
      ...savedFilters,
      cost: {
        max: String(savedPriceRange?.max),
        min: String(savedPriceRange?.min),
      },
    } as OrderFilterData);
    methods.watch();
  }, [savedFilters]);

  return (
    <PopupWrapper onClose={props.onClose} placement={"center"}>
      <FormProvider {...methods}>
        <Form className={"w-[900px] flex flex-col gap-7"}>
          <Text text={"Фильтры"} className={"text-[24px] font-medium"} />
          <div className={cn(rowWrapperCV)}>
            <ControlledSelectInput
              items={selectableOrderStatuses}
              placeholder={"Выберите статус заказа"}
              labelText={"Статус заказа"}
              name={"status"}
            />
            <ControlledMultiSelectButton labelText={"Способ оплаты"} items={paymentStatusItems} name={"paymentType"} />
          </div>
          <div className={cn(rowWrapperCV)}>
            <ControlledTextInput
              labelText={"Дата создания"}
              placeholder={"31.12.24"}
              inputMask={"99.99.9999"}
              name={"created"}
              button={<TextButton onClick={handleSetToday} text={"Сегодня"} />}
            />
            <ControlledRangeInput minValue={"0"} maxValue={"10000"} labelText={"Цена заказа"} name={"cost"} />
          </div>
          <div className={"flex flex-row items-center gap-5 w-[600px]"}>
            <Button
              text={methods.formState.isSubmitting ? "Отправка.." : "Применить"}
              onClick={methods.handleSubmit(onSubmit)}
              disabled={methods.formState.isSubmitting}
            />
            <Button buttonType={"SECONDARY"} onClick={handleResetFilters} text={"Сбросить фильтры"} />
          </div>
        </Form>
      </FormProvider>
    </PopupWrapper>
  );
};

export default OrderPageFilterPopup;
