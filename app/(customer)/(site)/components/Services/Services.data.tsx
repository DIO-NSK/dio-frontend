import { TextLink } from "@/types/dto/text";
import { HandshakeIcon, MicroscopeIcon, PencilRulerIcon, PercentIcon, StethoscopeIcon, WrenchIcon } from "lucide-react";
import { ReactNode } from "react";

const ICON_SIZE = 28;

export const data: (TextLink & { icon: ReactNode })[] = [
  {
    text: "Аренда кулеров и пурифайеров",
    link: "rent",
    icon: <HandshakeIcon className={"stroke-link-blue"} size={ICON_SIZE} />,
  },
  {
    text: "Ремонт и диагностика оборудования",
    link: "diagnostic",
    icon: <StethoscopeIcon className={"stroke-link-blue"} size={ICON_SIZE} />,
  },
  {
    text: "Санитарная обработка оборудования",
    link: "sanitization",
    icon: <MicroscopeIcon className={"stroke-link-blue"} size={ICON_SIZE} />,
  },
  {
    text: "Установка пурифайеров",
    link: "mount",
    icon: <PencilRulerIcon className={"stroke-link-blue"} size={ICON_SIZE} />,
  },
  {
    text: "Сервисное обслуживание оборудования",
    link: "maintenance",
    icon: <WrenchIcon className={"stroke-link-blue"} size={ICON_SIZE} />,
  },
  {
    text: "Бесплатное пользование",
    link: "free_use",
    icon: <PercentIcon className={"stroke-link-blue"} size={ICON_SIZE} />,
  },
];
