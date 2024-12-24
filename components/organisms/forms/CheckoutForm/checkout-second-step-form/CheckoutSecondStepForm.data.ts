import { CheckoutFormData } from "@/schemas/customer/checkout/CheckoutFormSchema";
import { FieldName } from "react-hook-form";

export const formData = [
  {
    labelText: "Город",
    placeholder: "Введите город проживания",
    name: "city",
  },
  {
    labelText: "Улица",
    placeholder: "Введите название улицы",
    name: "street",
  },
  {
    labelText: "Дом / Корпус",
    placeholder: "Введите номер дома",
    name: "houseNumber",
  },
  {
    labelText: "Квартира / Офис",
    placeholder: "Введите номер квартиры",
    name: "apartmentNumber",
  },
  {
    labelText: "Подъезд",
    placeholder: "Введите номер подъезда",
    name: "doorway",
  },
  {
    labelText: "Этаж",
    placeholder: "Введите этаж",
    name: "floor",
  },
];

export const fieldNames: FieldName<CheckoutFormData>[] = [
  "city",
  "street",
  "houseNumber",
  "apartmentNumber",
  "doorway",
  "floor",
];
