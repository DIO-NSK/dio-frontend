import { cn } from "@/utlis/cn";
import React from "react";

type PageWrapperTypes = {
    children: React.ReactNode;
    className?: string;
}

const PageWrapper = ({ children, className }: PageWrapperTypes) => {
    return (
        <main className={cn("w-full flex flex-col gap-7 md:pt-6 md:px-0 lg:gap-12 lg:mt-1 xl:mt-[30px] xl:px-0", className)}>
            {children}
        </main>
    )
}

export default PageWrapper
