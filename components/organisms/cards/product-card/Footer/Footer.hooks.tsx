import { useBuyButton } from "@/utlis/hooks/product/useBuyButton";
import { useLike } from "@/utlis/hooks/product/useLike";
import { FiCheck } from "react-icons/fi";
import { useProductCardContext } from "../ProductCardContext";

export const useProductCardFooter = () => {
  const { productCard, controlled } = useProductCardContext();

  const [isLiked, toggleLike] = useLike(productCard.inFavourites, productCard.id);
  const [isInCart, onBuyClick] = useBuyButton(productCard.inCart, productCard.id, undefined, controlled);

  const buttonText = productCard.inStock ? (isInCart ? "В корзине" : "В корзину") : "Нет в наличии";
  const buttonIcon = isInCart ? <FiCheck size={"20px"} className={"stroke-white"} /> : null;
  const disabled = !productCard.inStock;

  return {
    states: { isLiked, buttonIcon, buttonText, isInCart, disabled },
    actions: { toggleLike, onBuyClick },
  };
};
