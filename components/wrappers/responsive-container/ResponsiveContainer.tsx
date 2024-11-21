"use client"

import { PropsWithClassName } from "@/types/props/utils/PropsWithClassName";
import { cn } from "@/utlis/cn";
import { PropsWithChildren } from "react";

export const ResponsiveContainer = ({ children, className }: PropsWithClassName<PropsWithChildren>) => (
    <section className={cn("w-ful flex flex-col items-center relative", className)}>
        <section className='w-full 2xl:max-w-[1560px] xl:max-w-[1260px] lg:max-w-[964px] md:max-w-[724px]'>
            {children}
        </section>
    </section>
)