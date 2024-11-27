import { $userCredentials } from "@/app/(customer)/model";
import { addToFavouritesEvent, removeFromFavouritesEvent } from "@/components/organisms/cards/product-price-card/model";
import { useStore } from "@/store/Store";
import { useBreakpoint } from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLike = (initState: boolean, productId: number) => {
  const router = useRouter();

  const [addToFavourites, removeFromFavourites] = useUnit([addToFavouritesEvent, removeFromFavouritesEvent]);
  const switchPopupState = useStore((state) => state.switchPopupState);
  const userCredentials = useUnit($userCredentials);

  const [isLiked, setLiked] = useState<boolean>(initState);

  const breakpoint = useBreakpoint();
  const isMobile = ["init", "sm", "md"].includes(breakpoint);

  const toggleLike = () => {
    if (userCredentials) {
      if (isLiked) removeFromFavourites(productId);
      else addToFavourites(productId);
      setLiked(!isLiked);
    } else {
      if (isMobile) {
        router.push("/mobile/authorization");
      } else {
        switchPopupState("login");
      }
    }
  };

  return [isLiked, toggleLike] as const;
};
