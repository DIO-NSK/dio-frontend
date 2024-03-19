import {Dispatch, SetStateAction} from "react";

export type Auth = {
    accessToken: string,
    refreshToken: string
}

export type AuthContextType = {
    auth: Auth,
    setAuth: Dispatch<SetStateAction<Auth>>,
}