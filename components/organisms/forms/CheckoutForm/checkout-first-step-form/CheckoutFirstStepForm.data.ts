import { CheckoutFormData } from "@/schemas/customer/checkout/CheckoutFormSchema";
import { FieldName } from "react-hook-form";

export const formData = [
  {
    labelText: "Имя",
    placeholder: "Введите имя",
    name: "name",
  },
  {
    labelText: "Фамилия",
    placeholder: "Введите фамилию",
    name: "surname",
  },
  {
    labelText: "Телефон",
    placeholder: "+7 (000) 000-00-00",
    inputMask: "+9 (999) 999-99-99",
    name: "phoneNumber",
  },
  {
    labelText: "Электронная почта",
    placeholder: "example@gmail.com",
    name: "email",
  },
];

export const fieldNames: FieldName<CheckoutFormData>[] = ["name", "surname", "phoneNumber", "email"];
