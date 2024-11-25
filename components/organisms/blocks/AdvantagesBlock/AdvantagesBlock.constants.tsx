import {
  CalendarCheckIcon,
  DropletsIcon,
  HandshakeIcon,
  HeadsetIcon,
  SearchCheckIcon,
  TimerResetIcon,
  TruckIcon,
  UsersIcon,
} from "lucide-react";

const ICON_SIZE = 28;

export const data: { icon: React.ReactNode; header: string }[] = [
  {
    icon: <TimerResetIcon size={ICON_SIZE} />,
    header: "Многолетний опыт работы",
  },
  {
    icon: <DropletsIcon size={ICON_SIZE} />,
    header: "Постоянное улучшение технологий",
  },
  {
    icon: <TruckIcon size={ICON_SIZE} />,
    header: "Доставка без выходных дней",
  },
  {
    icon: <CalendarCheckIcon size={ICON_SIZE} />,
    header: "Возможность доставки в день заказа",
  },
  {
    icon: <SearchCheckIcon size={ICON_SIZE} />,
    header: "Широкий ассортимент товаров и оборудования",
  },
  {
    icon: <HeadsetIcon size={ICON_SIZE} />,
    header: "Собственный сервис центр",
  },
  {
    icon: <UsersIcon size={ICON_SIZE} />,
    header: "Ответственные сотрудники",
  },
  {
    icon: <HandshakeIcon size={ICON_SIZE} />,
    header: "Демократичные цены",
  },
];
