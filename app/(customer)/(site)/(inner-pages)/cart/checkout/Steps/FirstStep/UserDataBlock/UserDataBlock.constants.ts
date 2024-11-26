import { InputPrefilledData } from "@/types/props/inputs/InputPrefilledData";

export const data: InputPrefilledData[] = [
  {
    labelText: "Имя",
    placeholder: "Введите имя",
    name: "firstName",
  },
  {
    labelText: "Фамилия",
    placeholder: "Введите фамилию",
    name: "surname",
  },
  {
    labelText: "Телефон",
    placeholder: "+7 (___) ___-__-__",
    inputMask: "+9 (999) 999-99-99",
    name: "phoneNumber",
  },
  {
    labelText: "Электронная почта",
    placeholder: "Введите почту",
    name: "email",
  },
];
