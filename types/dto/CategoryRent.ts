export type CategoryRent = {
    category : string,
    rent : Record<CategoryRentDuration, string>
}

export type CategoryRentDuration = "day" | "month" | "half_year" | "year"