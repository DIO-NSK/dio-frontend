import {api} from "@/api";
import {createEffect, createEvent, sample} from "effector";
import {AdminOrder} from "@/types/dto/AdminOrder";
import {OrderFilterData, RangeInputData} from "@/schemas/admin/OrderFiltersSchema";

type OrderFilters = {
    status: string,
    created: string,
    deliveryTime: string,
    numberPhone: string,
    firstName: string,
    lastName: string,
    costFrom: number,
    costTo: number,
    orderId: number
}

export type RequestOrderFilters = Partial<OrderFilters>

const filterOrders = async (filters: RequestOrderFilters): Promise<AdminOrder[]> => {
    return api.get("/order/admin/filter", {params: filters})
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

export const filterOrdersFx = createEffect<RequestOrderFilters, AdminOrder[], Error>(filterOrders)
export const filterOrdersEvent = createEvent<OrderFilterData>()

sample({
    clock: filterOrdersEvent,
    fn: (data) => convertDataToRequest(data),
    target: filterOrdersFx
})

const convertDataToRequest = (data: OrderFilterData): RequestOrderFilters => ({
    costFrom: data.cost?.from ? +data.cost.from : 0,
    costTo: data.cost?.to ? +data.cost.to : 100_000,
    created: data.created,
    status: data.status?.value
})
