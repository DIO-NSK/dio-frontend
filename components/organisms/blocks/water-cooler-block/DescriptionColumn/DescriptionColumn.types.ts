import { HeaderDescription } from "@/types/dto/text";

export interface DescriptionColumnProps extends HeaderDescription {
    description: string,
    top: number,
    left?: number,
    right?: number
}