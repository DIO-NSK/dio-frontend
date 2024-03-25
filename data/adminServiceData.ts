import {SelectItem} from "@/types/props/SelectItem";
import {ServiceType} from "@/types/dto/admin/service/AdminService";

export const selectableServiceTypes : SelectItem<ServiceType>[] = [
    {name : "Все", value : "ALL"},
    {name : "Другое", value : "OTHER"}
]