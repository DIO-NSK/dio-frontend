import {CallRequestStatus} from "@/app/admin/call-requests/model";
import {ServiceForm} from "@/types/dto/user/ServiceForm";

export type AdminService = {
    id: number,
    createAt: string,
    nameRequestStatus: CallRequestStatus,
    numberPhone: string
} & Omit<ServiceForm, "phoneNumber">

export type ServiceType = "OTHER" | "ALL"