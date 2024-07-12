import {api, unauthorizedApi} from "@/api";
import {CallRequestStatus} from "@/app/admin/call-requests/main.model";
import {AdminService, optionalServiceTypes, ServiceType} from "@/types/dto/admin/service/AdminService";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ServiceTableRow} from "@/types/dto/Table";
import {convertTableRowsToSelectedItems} from "@/utlis/convertTableRowsToSelectedItems";
import {SelectItem} from "@/types/props/SelectItem";

//region getServicesByType

const getServicesByType = async (nameType: ServiceType): Promise<AdminService[]> => {
    return api.get("/admin/service/by-type", {params: {nameType}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getServiceByTypeFx = createEffect<ServiceType, AdminService[], Error>(getServicesByType)
export const getServiceByTypeEvent = createEvent<SelectItem<ServiceType | "ALL">>()
export const $activeServiceType = createStore<SelectItem<ServiceType | "ALL">>(optionalServiceTypes[0])

$activeServiceType.on(getServiceByTypeEvent, (_, serviceType) => serviceType)

//endregion

//region getServicesByStatus

const getServicesByStatus = async (status: CallRequestStatus): Promise<AdminService[]> => {
    return api.get("/admin/service/by-status", {params: {nameStatus: status}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.payload)})
}

const getServicesByStatusFx = createEffect<CallRequestStatus, AdminService[], Error>(getServicesByStatus)
export const $serviceTableRows = createStore<ServiceTableRow[]>([])

$serviceTableRows
    .on(getServicesByStatusFx.doneData, (_, services) => convertServicesToTableRows(services))
    .on(getServiceByTypeFx.doneData, (_, services) => convertServicesToTableRows(services))

const convertServicesToTableRows = (services: AdminService[]): ServiceTableRow[] => {
    return services.map(service => ({id: service.id, item: service}))
}

//endregion

//region getServicesByPhoneNumber

const getServiceByPhoneNumber = async (numberPhone: string): Promise<AdminService[]> => {
    return api.get("/admin/service/by-phone-number", {params: {numberPhone}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getServiceByPhoneNumberFx = createEffect<ServiceType, AdminService[], Error>(getServiceByPhoneNumber)
export const getServiceByPhoneNumberEvent = createEvent<string>()
export const $servicePhoneNumber = createStore<string>("")

$servicePhoneNumber.on(getServiceByPhoneNumberEvent, (_, phoneNumber) => phoneNumber)

//endregion

//region setServiceStatus

export const $serviceStatus = createStore<CallRequestStatus>("CURRENT")
export const setServiceStatusEvent = createEvent<CallRequestStatus>()

$serviceStatus.on(setServiceStatusEvent, (_, status) => status)

sample({
    clock: setServiceStatusEvent,
    target: getServicesByStatusFx
})

//endregion

//region updateServices

const updateServicesStatus = async ({ids, status}: { ids: number[], status: CallRequestStatus }) => {
    return Promise.all(
        ids.map(id => api.put("/service/update", null, {params: {id: id, nameStatus: status}})
            .then(response => response.data)
            .catch(error => {
                throw Error(error.response.data.message)
            }))
    )
}

const updateServicesFx = createEffect(updateServicesStatus)
export const updateServicesEvent = createEvent<CallRequestStatus>()

//endregion

//region selectServices

export const selectServiceEvent = createEvent<number>()
export const selectAllServicesEvent = createEvent()
export const removeAllServicesEvent = createEvent()
export const $selectedServices = createStore<number[]>([])

$selectedServices
    .reset(updateServicesFx.doneData)
    .reset(removeAllServicesEvent)
    .on(selectServiceEvent, (selected, itemToSelect) => {
        if (selected.includes(itemToSelect)) return selected.filter(selectedId => selectedId !== itemToSelect)
        else return [...selected, itemToSelect]
    })

sample({
    clock: selectAllServicesEvent,
    source: $serviceTableRows,
    fn: convertTableRowsToSelectedItems,
    target: $selectedServices
})

//endregion

sample({
    //@ts-ignore
    clock : getServiceByTypeEvent,
    source : $serviceStatus,
    filter : (_, serviceType) => serviceType.value !== "ALL",
    fn : (_, serviceType) => serviceType.value as ServiceType,
    target : getServiceByTypeFx
})

sample({
    clock : getServiceByTypeEvent,
    source : $serviceStatus,
    filter : (_, serviceType : SelectItem<ServiceType | "ALL">) => serviceType.value === "ALL",
    fn : (status : CallRequestStatus, _) => status,
    target : getServicesByStatusFx
})

sample({
    clock: updateServicesEvent,
    source: $selectedServices,
    fn: (ids, status) => ({ids: ids, status: status}),
    target: updateServicesFx
})

sample({
    clock: updateServicesFx.doneData,
    source: $serviceStatus,
    target: getServicesByStatusFx
})