import React from "react";

export type IconButton = {
    icon : React.ReactNode,
    onClick ?: () => void,
    className ?: string
}