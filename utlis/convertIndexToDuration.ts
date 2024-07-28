import {CategoryRentDuration} from "@/types/dto/CategoryRent";

export const convertIndexToDuration = (index: number): CategoryRentDuration | undefined => {
    switch (index) {
        case 0 :
            return "day"
        case 1 :
            return "month"
        case 2 :
            return "half_year"
        case 3 :
            return "year"
    }
}