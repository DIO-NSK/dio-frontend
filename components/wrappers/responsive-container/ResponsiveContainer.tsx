"use client"

import { PropsWithClassName } from "@/types/props/utils/PropsWithClassName";
import { cn } from "@/utlis/cn";
import { PropsWithChildren } from "react";
import { ResponsiveBlock } from "./ResposiveBlock";

export const ResponsiveContainer = ({ children, className }: PropsWithClassName<PropsWithChildren>) => (
    <section className={cn("w-full flex flex-col items-center relative", className)}>
        <ResponsiveBlock>
            {children}
        </ResponsiveBlock>
    </section>
)