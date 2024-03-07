import {ResponsePromoSearch} from "@/types/dto/user/promo/ResponsePromoSearch";

export type ResponseProductSearch = {
    oldPrice: number,
    newPrice: number,
    image: string,
    discountPercent: number
} & ResponsePromoSearch