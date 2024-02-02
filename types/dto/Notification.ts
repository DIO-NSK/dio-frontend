import {TextLink} from "@/types/dto/text";

export type Notification = {
    header : string,
    message ?: string
    textLink : TextLink,
    type : NotificationType
}

type NotificationType = "warning" | "info" | "critical"