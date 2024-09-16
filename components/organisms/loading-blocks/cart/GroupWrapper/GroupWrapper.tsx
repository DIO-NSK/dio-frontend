import React from "react";
import {cn} from "@/utlis/cn";

const groupWrapperCN = [
    "flex flex-col gap-3 w-full md:rounded-xl md:border-2",
    "md:border-light-gray xl:border-0 md:gap-5 xl:gap-7 md:p-5 xl:p-0"
]

export const GroupWrapper = ({children}: { children: React.ReactNode }) => (
    <section className={cn(groupWrapperCN)}>
        {children}
    </section>
)