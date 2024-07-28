import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {AdminOrder} from "@/types/dto/AdminOrder";
import {OrderFilterData} from "@/schemas/admin/OrderFiltersSchema";

type OrderFilters = {
    status: string,
    created: string,
    paymentType: string,
    paymentTime: string,
    numberPhone: string,
    firstName: string,
    lastName: string,
    costFrom: number,
    costTo: number,
    orderId: number
}

type PriceRange = {
    min : number,
    max : number
}

export type RequestOrderFilters = Partial<OrderFilters>

const filterOrders = async (filters: RequestOrderFilters): Promise<AdminOrder[]> => {
    return api.get("/admin/order/filter", {params: filters})
        .then(response => response.data)
}

export const filterOrdersFx = createEffect<RequestOrderFilters, AdminOrder[], Error>(filterOrders)
export const filterOrdersEvent = createEvent<OrderFilterData>()
export const saveFiltersEvent = createEvent<OrderFilterData>()
export const savePriceRangeEvent = createEvent<PriceRange>()

export const $savedFilters = createStore<OrderFilterData | null>(null)
export const $savedPriceRange = createStore<PriceRange | null>(null)
$savedFilters.on(saveFiltersEvent, (_, filters) => filters)

$savedPriceRange.on(savePriceRangeEvent, (_, range) => range)

sample({
    clock: filterOrdersEvent,
    fn: (data) => convertDataToRequest(data),
    target: filterOrdersFx
})

const convertDataToRequest = (data: OrderFilterData): RequestOrderFilters => ({
    created : data.created?.length ? parseDate(data.created) : undefined,
    costFrom : data?.cost?.from ?? undefined,
    costTo : data?.cost?.to ?? undefined,
    paymentType: data.paymentType?.value,
    paymentTime: data.paymentDate,
    status: data.status?.value
} as RequestOrderFilters)

export const parseDate = (date : string) => {
    const [day, month, year] = date.split('.')
    return [year, month, day].join('-')
}