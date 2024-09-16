import React, {ReactNode} from "react";
import {cn} from "@/utlis/cn";

export const RowWrapper = ({children, className}: { children: ReactNode, className ?: string }) => (
    <span className={cn('w-full grid grid-cols-4 gap-5 pb-8 border-b-2 border-light-gray', className)}>
        {children}
    </span>
)