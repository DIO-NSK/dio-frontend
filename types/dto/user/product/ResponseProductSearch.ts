import {ResponsePromoSearch} from "@/types/dto/user/promo/ResponsePromoSearch";

export type ResponseProductSearch = {
    price: number,
    image: string,
    discountPercent: number
} & ResponsePromoSearch