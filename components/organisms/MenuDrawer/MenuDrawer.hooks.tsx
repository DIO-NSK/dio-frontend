import { $userCredentials, getUserCredentialsEvent, logoutUserFx } from "@/app/(customer)/model";
import { IconTextAction } from "@/types/dto/text";
import { useNavigation } from "@/utlis/hooks/useNavigation";
import { useUnit } from "effector-react";
import { useEffect, useMemo } from "react";
import { FiGift, FiHeart, FiLogIn, FiLogOut, FiMenu, FiShoppingCart, FiZap } from "react-icons/fi";
import { createAuthorizedTabs } from "./MenuDrawer.utils";

export const useMenuDrawer = () => {
  const logout = useUnit(logoutUserFx);
  const [userCredentials, getUserCredentials] = useUnit([$userCredentials, getUserCredentialsEvent]);

  const navigation = useNavigation();
  const handleTabClick = (link: string) => navigation.push(link);
  const handleOrderCallRequest = () => navigation.push("/mobile/call-request/order");

  const authorizedTabs = useMemo<IconTextAction[]>(() => createAuthorizedTabs(navigation), []);

  const handleManageRole = () => {
    if (userCredentials) {
      logout().then((_) => navigation.push("/"));
    } else {
      navigation.push("/mobile/authorization");
    }
  };

  const handleGoToFavorites = () => {
    if (userCredentials) {
      handleTabClick("/favorites");
    } else {
      navigation.push("/mobile/authorization");
    }
  };

  const menuTabs: IconTextAction[] = [
    {
      icon: userCredentials ? <FiLogOut className={"text-info-red"} /> : <FiLogIn className={"text-link-blue"} />,
      text: userCredentials ? "Выйти" : "Войти",
      action: handleManageRole,
    },
    {
      icon: <FiMenu className={"text-link-blue"} />,
      action: () => handleTabClick("/mobile/menu/catalog"),
      text: "Каталог",
    },
    {
      icon: <FiShoppingCart className={"text-link-blue"} />,
      action: () => handleTabClick("/cart"),
      text: "Корзина",
    },
    {
      icon: <FiHeart className={"text-info-red"} />,
      action: handleGoToFavorites,
      text: "Избранное",
    },
    {
      icon: <FiZap className={"text-link-blue"} />,
      action: () => handleTabClick("/services"),
      text: "Услуги",
    },
    {
      icon: <FiGift className={"text-link-blue"} />,
      action: () => handleTabClick("/sales"),
      text: "Акции",
    },
  ];

  useEffect(() => {
    getUserCredentials();
  }, []);

  return {
    states: { authorizedTabs, menuTabs },
    actions: { handleOrderCallRequest, handleManageRole },
  };
};
