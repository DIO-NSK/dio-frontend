import {Theme} from "@/types/props/Theme";
import {ResponseProfileOrder} from "@/types/dto/user/order/ResponseProfileOrder";

export type OrderCardProps = {
    order : ResponseProfileOrder,
    theme ?: Theme,
    className ?: string,
    canRepeat ?: boolean
}