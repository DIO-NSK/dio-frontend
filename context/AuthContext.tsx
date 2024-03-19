"use client"

import React, {createContext, useState} from "react";
import {Auth, AuthContextType} from "@/types/AuthContextType";

const initialAuthState: Auth = {
    accessToken: "",
    refreshToken: ""
}

const initialContext: AuthContextType = {
    auth: initialAuthState,
    setAuth: (_) => {}
}

const AuthContext = createContext<AuthContextType>(initialContext);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {

    const [auth, setAuth] = useState<Auth>(initialAuthState);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;