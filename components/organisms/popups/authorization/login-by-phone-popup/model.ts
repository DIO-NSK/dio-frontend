import {LoginByPhoneData} from "@/schemas/customer/LoginByPhoneSchema";
import {api} from "@/api";
import {createEffect, createStore} from "effector";
import {$userId} from "@/components/organisms/popups/authorization/confirmation-code-popup/model";

const loginByPhone = async (formData : LoginByPhoneData) => {
    return api.post("/user/login/sms", formData)
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

export const loginByPhoneFx = createEffect(loginByPhone)
export const $loginByPhoneError = createStore<string>("")

$loginByPhoneError.on(loginByPhoneFx.failData, (_, error) => error.message)
$userId.on(loginByPhoneFx.doneData, (_, userId) => userId)