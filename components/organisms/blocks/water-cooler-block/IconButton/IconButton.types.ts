import { ReactNode } from "react";

interface Offset {
    centerLeft : number;
    centerRight : number;
    top: number;
}

export interface IconButtonProps {
    header: string;
    description: ReactNode;
    inactiveUrl: string;
    activeUrl: string;
    offset: Partial<Offset>;
    defaultActive ?: boolean;
}