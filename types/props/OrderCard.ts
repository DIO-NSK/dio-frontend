import {Order} from "@/types/dto/Order";
import {Theme} from "@/types/props/Theme";

export type OrderCardProps = {
    order : Order,
    theme ?: Theme,
    className ?: string,
    canRepeat ?: boolean
}