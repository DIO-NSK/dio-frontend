import {ResponsePromoSearch} from "@/types/dto/user/promo/ResponsePromoSearch";

export type ResponseProductSearch = {
    price: number,
    image: string,
    mainImage?: string,
    inCart : boolean,
    inFavourites : boolean,
    discountPercent: number,
    inStock : boolean
} & ResponsePromoSearch