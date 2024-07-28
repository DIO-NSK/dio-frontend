import React from "react";

type PageWrapperTypes = {
    children : React.ReactNode
}

const PageWrapper = ({children} : PageWrapperTypes) => {
    return (
        <main className={"sm:mt-[30px] sm:px-[100px] flex flex-col gap-7 sm:gap-[60px]"}>
            {children}
        </main>
    )
}

export default PageWrapper
