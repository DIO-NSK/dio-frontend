import {useState} from "react";
import {useUnit} from "effector-react";
import {addToFavouritesEvent, removeFromFavouritesEvent} from "@/components/organisms/cards/product-price-card/model";
import {$userCredentials} from "@/app/(customer)/model";
import {useStore} from "@/store/Store";
import {useRouter} from "next/navigation";
import {BREAKPOINT_MOBILE} from "@/constants";

export const useLike = (initState: boolean, productId: number) => {

    const router = useRouter()

    const switchPopupState = useStore(state => state.switchPopupState)
    const userCredentials = useUnit($userCredentials)
    const [addToFavourites, removeFromFavourites] = useUnit([addToFavouritesEvent, removeFromFavouritesEvent])

    const [isLiked, setLiked] = useState<boolean>(initState)
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < BREAKPOINT_MOBILE : false

    const toggleLike = () => {
        if (userCredentials) {
            if (isLiked) removeFromFavourites(productId)
            else addToFavourites(productId)
            setLiked(!isLiked)
        } else {
            if (isMobile) {
                router.push('/mobile/authorization')
            } else {
                switchPopupState("login")
            }
        }
    }

    return [isLiked, toggleLike] as const

}