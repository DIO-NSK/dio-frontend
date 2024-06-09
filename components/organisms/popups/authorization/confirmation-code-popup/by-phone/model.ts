import {UserConfirmCodeData} from "@/schemas/customer/authorization/UserConfirmCodeSchema";
import {unauthorizedApi} from "@/api";
import {createEffect} from "effector";
import {cookies} from "next/headers";

const sendConfirmationCodeByPhone = async (formData : UserConfirmCodeData) => {
    return unauthorizedApi.put("/user/login/sms/confirm", formData)
        .then(response => {
            localStorage.setItem("ACCESS_TOKEN", response.data.accessToken)
            return response.data
        })
}

export const sendConfirmationCodeByPhoneFx = createEffect(sendConfirmationCodeByPhone)