import React from "react";

type PageWrapperTypes = {
    children : React.ReactNode
}

const PageWrapper = ({children} : PageWrapperTypes) => {
    return (
        <main className={"flex flex-col gap-7 md:pt-6 md:px-6 lg:gap-12 lg:mt-1 lg:px-[90px] xl:mt-[30px] xl:px-[100px]"}>
            {children}
        </main>
    )
}

export default PageWrapper
