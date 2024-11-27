import { IconTextAction } from "@/types/dto/text";
import { UseNavigationReturn } from "@/utlis/hooks/useNavigation";
import { FiFile, FiSettings, FiUser } from "react-icons/fi";

export const createAuthorizedTabs = (navigation: UseNavigationReturn): IconTextAction[] => [
  {
    icon: <FiUser className={"text-link-blue"} />,
    action: () => navigation.push("/profile"),
    text: "Мой профиль",
  },
  {
    icon: <FiFile className={"text-link-blue"} />,
    action: () => navigation.push("/profile/orders"),
    text: "Мои заказы",
  },
  {
    icon: <FiSettings className={"text-link-blue"} />,
    action: () => navigation.push("/profile/settings"),
    text: "Настройки",
  },
];
