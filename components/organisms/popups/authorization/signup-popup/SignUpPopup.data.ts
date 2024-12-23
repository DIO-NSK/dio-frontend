import { InputPrefilledData } from "@/types/props/inputs/InputPrefilledData";

export const inputData: InputPrefilledData[] = [
  {
    labelText: "Телефон",
    placeholder: "+7 (___) ___-__-__",
    inputMask: "+7 (999) 999-99-99",
    name: "phoneNumber",
  },
  {
    labelText: "Имя пользователя",
    placeholder: "Иван Иванов",
    name: "fullName",
  },
  {
    labelText: "Пароль",
    placeholder: "Введите пароль",
    name: "password",
    isPassword: true,
  },
];
