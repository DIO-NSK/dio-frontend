import { ResponseProductSearch } from "@/types/dto/user/product/ResponseProductSearch";
import { useBuyButton } from "@/utlis/hooks/product/useBuyButton";
import { useDiscount } from "@/utlis/hooks/product/useDiscount";
import { useLike } from "@/utlis/hooks/product/useLike";
import { useRouter } from "next/navigation";
import { FiCheck } from "react-icons/fi";

export const useProductCard = (productCard: ResponseProductSearch) => {

    const router = useRouter()

    const [isLiked, toggleLike] = useLike(productCard.inFavourites, productCard.id)
    const [isInCart, onBuyClick] = useBuyButton(productCard.inCart, productCard.id)
    const [price, newPrice] = useDiscount(productCard.price, productCard.discountPercent)

    const buttonText = productCard.inStock ? isInCart ? "В корзине" : "В корзину" : "Нет в наличии"
    const buttonIcon = isInCart ? <FiCheck size={ "20px"} className = { "stroke-white"} /> : null

    const handleCardClick = () => router.push(`/product/${(productCard as any).urlMask}`);

    return {
        isLiked, toggleLike,
        onBuyClick, buttonIcon, buttonText,
        handleCardClick, price, newPrice, isInCart
    }
}   