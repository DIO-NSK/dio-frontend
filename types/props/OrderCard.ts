import {Order} from "@/types/dto/Order";
import {Theme} from "@/types/props/Theme";

export type OrderCardProps = {
    order : Order,
    isOpen : boolean,
    setOpen : (isOpen : boolean) => void,
    theme ?: Theme,
    className ?: string,
    canRepeat ?: boolean
}