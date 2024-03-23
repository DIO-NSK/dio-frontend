import {UserCredentials} from "@/types/dto/user/UserCredentials";
import {api} from "@/api";
import {createEffect, createEvent, sample} from "effector";

const updateUserSettings = async (data : UserCredentials) => {
    return api.put("/profile/setting", data)
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

export const updateUserSettingsFx = createEffect(updateUserSettings)
export const updateUserCredentialsEvent = createEvent<UserCredentials>()

sample({
    clock : updateUserCredentialsEvent,
    target : updateUserSettingsFx
})