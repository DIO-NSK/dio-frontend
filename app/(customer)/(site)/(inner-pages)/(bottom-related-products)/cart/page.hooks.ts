import { $cart, getCartEvent } from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import { resetOrderToRepeatEvent } from "@/app/(customer)/profile/orders/model";
import { useStore } from "@/store/Store";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useCartPage = () => {
  const router = useRouter();

  const [cart, getCart, resetOrderToRepeat] = useUnit([$cart, getCartEvent, resetOrderToRepeatEvent]);
  const switchPopupState = useStore((state) => state.switchPopupState);

  const handleButtonClick = () => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    if (accessToken) {
      resetOrderToRepeat();

      router.push("/cart/checkout");
    } else {
      switchPopupState("login");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return {
    cart,
    handleButtonClick,
  };
};
