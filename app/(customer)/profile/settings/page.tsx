"use client"

import React, {useEffect, useState} from 'react';
import UserSettings from "@/app/(customer)/profile/settings/roles/UserSettings";
import LegalPartnerSettings from "@/app/(customer)/profile/settings/roles/LegalPartnerSettings";
import {jwtDecode} from "jwt-decode";
import Loading from "@/components/mobile/loading/Loading";

const UserProfileSettingsPage = () => {

    const [role, setRole] = useState<string>('')

    useEffect(() => {
        const token = localStorage.getItem("ACCESS_TOKEN")!!
        const decoded: any = jwtDecode(token)
        setRole(decoded?.role)
    }, [])

    if (!role.length) {
        return (<Loading className={"col-span-9 h-full"}/>)
    }

    return role === 'LEGAL_PARTNER'
        ? (<LegalPartnerSettings/>)
        : (<UserSettings/>)

};

export default UserProfileSettingsPage;
