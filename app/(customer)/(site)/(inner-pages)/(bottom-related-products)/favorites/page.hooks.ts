import {
  $favourites,
  getFavouritesEvent,
  ResponseUserFavorites,
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/favorites/model";
import { addAllToCartEvent } from "@/components/organisms/cards/product-price-card/model";
import { InfoBlockElement } from "@/types/dto/text";
import { useUnit } from "effector-react";
import { useEffect } from "react";

interface UseFavoritesPageReturn {
  favourites: ResponseUserFavorites | null;
  infoBlockData: InfoBlockElement[];
  handleButtonClick: () => void;
}

export const useFavoritesPage = (): UseFavoritesPageReturn => {
  const [favourites, getFavourites, addAllToCart] = useUnit([$favourites, getFavouritesEvent, addAllToCartEvent]);

  const infoBlockData: InfoBlockElement[] = [
    {
      header: "Выбрано",
      description: `${favourites?.products.length} шт.`,
    },
    {
      header: "Итого",
      description: `${favourites?.products.reduce(
        (acc, item) => acc + item.price - 0.01 * item.price * item.discountPercent,
        0,
      )} ₽`,
      className: "text-link-blue font-medium text-[20px]",
    },
  ];

  const handleButtonClick = () => {
    const productItemIds = favourites?.products.map((item) => item.id);
    if (productItemIds) addAllToCart(productItemIds);
  };

  useEffect(() => {
    getFavourites();
  }, []);

  return {
    handleButtonClick,
    infoBlockData,
    favourites,
  };
};
