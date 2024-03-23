export type ResponseProfileOrder = {
    id: number,
    items: ProfileOrderItem[],
    deliveryDate: string,
    deliveryTime: string,
    address: string,
    status: OrderStatus
}

export type ProfileOrderItem = {
    id: number,
    name: string,
    price: number,
    description: string,
    discountPercent: number,
    quantity: number,
    mainImage: string
}

export type OrderStatus = "DRAFT" | "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELED"