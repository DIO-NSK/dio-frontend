import React from "react";

type PageWrapperTypes = {
    children: React.ReactNode
}

const PageWrapper = ({ children }: PageWrapperTypes) => {
    return (
        <main className={"flex flex-col gap-7 md:pt-6 md:px-0 lg:gap-12 lg:mt-1 xl:mt-[30px] xl:px-0"}>
            {children}
        </main>
    )
}

export default PageWrapper
