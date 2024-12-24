import { CheckoutFormData, CheckoutPaymentType } from "@/schemas/customer/checkout/CheckoutFormSchema";
import { RadioButtonItem } from "@/types/props/RadioButtonItem";
import { SelectItem } from "@/types/props/SelectItem";
import { FieldName } from "react-hook-form";

const radioGroupItems: RadioButtonItem[] = [
  {
    value: CheckoutPaymentType.Online,
    label: "Банковской картой онлайн",
    groupName: "paymentType",
  },
  {
    value: CheckoutPaymentType.Offline,
    label: "Наличными при получении",
    groupName: "paymentType",
  },
];

const selectItems: SelectItem[] = [
  { name: "12:00 — 13:00", value: "12-13" },
  { name: "13:00 — 14:00", value: "13-14" },
  { name: "14:00 — 15:00", value: "14-15" },
  { name: "15:00 — 16:00", value: "15-16" },
];

const formData = [
  {
    labelText: "Дата доставки",
    placeholder: "дд/мм/гггг",
    inputMask: "99/99/9999",
    name: "deliveryDate",
  },
];

const fieldNames: FieldName<CheckoutFormData>[] = ["paymentType", "deliveryDate", "deliveryTime", "additional"];

export { fieldNames, formData, radioGroupItems, selectItems };
