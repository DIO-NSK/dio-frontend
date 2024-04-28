import {CallRequestStatus} from "@/app/admin/call-requests/main.model";
import {ServiceForm} from "@/types/dto/user/ServiceForm";
import {SelectItem} from "@/types/props/SelectItem";

export type AdminService = {
    id: number,
    createAt: string,
    nameRequestStatus: CallRequestStatus,
    numberPhone: string
} & Omit<ServiceForm, "phoneNumber">

export enum ServiceType {
    RENT_FLOOR_COOLER_WITH_FRIDGE = "Аренда напольного кулера с холодильником",
    RENT_FLOOR_COOLER = "Аренда напольного кулера",
    RENT_TABLE_COOLER = "Аренда настольного кулера",
    RENT_PURIFIER_ELECTRONIC_COOLING = "Аренда пурифайера с электронным охлаждением",
    RENT_PURIFIER_COMPRESSOR_COOLING = "Аренда пурифайера с компрессорным охлаждением",
    WARRANTY_REPAIR_PURIFIER = "Гарантийный ремонт пурифайера",
    ON_SITE_DIAGNOSTICS_PURIFIER = "Выездная диагностика пурифайера",
    WARRANTY_REPAIR_COOLER = "Гарантийный ремонт кулера",
    ON_SITE_DIAGNOSTICS_COOLER = "Выездная диагностика кулера",
    DIAGNOSTICS_COOLER = "Диагностика кулера",
    SANITIZATION_COOLER = "Санитарная обработка кулера",
    ON_SITE_SANITIZATION_COOLER = "Выездная санитарная обработка кулера",
    SIMPLE_INSTALLATION_PURIFIER = "Простая установка пуриайера",
    COMPLEX_INSTALLATION_PURIFIER = "Сложная (или скрытая) установка пурифайера",
    ANNUAL_4_SERVICE_PURIFIER_LARGE_OFFICE = "Годовое 4-х разовое сервисное обслуживание пурифайера(офис более 50 человек)",
    ANNUAL_2_SERVICE_PURIFIER_SMALL_OFFICE = "Годовое 2-х разовое сервисное обслуживание пурифайера (офис до 40 человек)",
    ONE_TIME_FULL_SERVICE_PURIFIER = "Единоразовое полное сервисное обслуживание пурифайера",
    FREE_USE_RACK_4_BOTTLES = "Cтеллаж для хранения 4-х бутылей в бесплатное пользование",
    FREE_USE_TABLE_COOLER_NO_COOLING = "Настольный кулер без охлаждения в бесплатное пользование",
    FREE_USE_TABLE_COOLER_WITH_COOLING = "Настольный кулер с охлаждением в бесплатное пользование",
}

//@ts-ignore
export const selectableServiceTypes: SelectItem<ServiceType>[] = Object.keys(ServiceType).map(item => ({name: ServiceType[item], value: item}))

export const optionalServiceTypes: SelectItem<ServiceType | "ALL">[] = [{name: 'Все', value: "ALL"}, ...selectableServiceTypes]