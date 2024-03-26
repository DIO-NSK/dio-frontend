import {useState} from "react";
import {useUnit} from "effector-react";
import {addToFavouritesEvent, removeFromFavouritesEvent} from "@/components/organisms/cards/product-price-card/model";

export const useLike = (initState: boolean, productId: number) => {

    const [addToFavourites, removeFromFavourites] = useUnit([addToFavouritesEvent, removeFromFavouritesEvent])

    const [isLiked, setLiked] = useState<boolean>(initState)

    const toggleLike = () => {
        if (isLiked) removeFromFavourites(productId)
        else addToFavourites(productId)
        setLiked(!isLiked)
    }

    return [isLiked, toggleLike] as const

}