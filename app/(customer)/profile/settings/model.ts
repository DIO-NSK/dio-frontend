import {UserCredentials} from "@/types/dto/user/credentials/UserCredentials";
import {api} from "@/api";
import {createEffect, createEvent, sample} from "effector";
import {LegalEntityData} from "@/schemas/customer/authorization/LegalEntitySchema";

export type LegalPartnerDto = Omit<LegalEntityData, 'password' | 'phoneNumber' | 'fullName'>

export type LegalPartnerSettings = {
    legalPartnerDto : LegalPartnerDto,
    changeUserDataDto : UserCredentials
}

const updateUserSettings = async (data : UserCredentials) => {
    return api.put("/profile/setting", data)
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const updateLegalSettings = async (data : LegalPartnerSettings) => {

    const formData = new FormData()
    formData.append('legalPartnerDto', new Blob([JSON.stringify(data.legalPartnerDto)], {type: "application/json"}))
    formData.append('changeUserDataDto', new Blob([JSON.stringify(data.changeUserDataDto)], {type: "application/json"}))

    return api.put('/profile/setting/legal-partner', formData, {
        headers: {"Content-type": "multipart/form-data"}
    })
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

export const updateLegalSettingsFx = createEffect(updateLegalSettings)

export const updateUserSettingsFx = createEffect(updateUserSettings)
export const updateUserCredentialsEvent = createEvent<UserCredentials>()

sample({
    clock : updateUserCredentialsEvent,
    target : updateUserSettingsFx
})