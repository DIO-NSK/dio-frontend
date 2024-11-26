import {ResponseProfileOrder} from "@/types/dto/user/order/ResponseProfileOrder";

export const convertOrderToFormData = (order : ResponseProfileOrder | null) => {

    if (!order) return undefined

    const orderData = order.address.split(',')
    const street = orderData[0].split(' ')[1]
    const house = orderData[1].trim().split(' ')[1]
    const apartment = orderData[2].trim().split(' ')[1]

    return ({
        street : street,
        houseNumber : house,
        flatNumber : apartment
    })

}