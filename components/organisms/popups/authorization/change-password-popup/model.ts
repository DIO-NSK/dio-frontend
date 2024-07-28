import {api} from "@/api";
import {createEffect} from "effector";
import {ChangePasswordData} from "@/schemas/customer/authorization/ChangePasswordSchema";

const changePassword = async (formData : ChangePasswordData) => {
    return api.put("/user/update/password", formData)
        .then(response => response.data)
}

export const changePasswordFx = createEffect(changePassword)