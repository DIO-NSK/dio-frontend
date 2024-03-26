import {ResponsePromoSearch} from "@/types/dto/user/promo/ResponsePromoSearch";

export type ResponseProductSearch = {
    price: number,
    image: string,
    inCart : boolean,
    inFavourites : boolean,
    discountPercent: number
} & ResponsePromoSearch