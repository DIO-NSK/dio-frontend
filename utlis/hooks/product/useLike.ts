import {useState} from "react";
import {useUnit} from "effector-react";
import {addToFavouritesEvent, removeFromFavouritesEvent} from "@/components/organisms/cards/product-price-card/model";
import {$favourites} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/favorites/model";

export const useLike = (productId: number) => {

    const [addToFavourites, removeFromFavourites, favourites]
        = useUnit([addToFavouritesEvent, removeFromFavouritesEvent, $favourites])

    const isFavourite = (): boolean => {
        const isFavourite = favourites?.products.find(elem => elem.id === productId)
        return Boolean(isFavourite)
    }

    const [isLiked, setLiked] = useState<boolean>(isFavourite)

    const toggleLike = () => {
        if (isLiked) removeFromFavourites(productId)
        else addToFavourites(productId)
        setLiked(!isLiked)
    }

    return [isLiked, toggleLike] as const

}