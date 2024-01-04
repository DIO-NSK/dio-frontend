import React from "react";

type PageWrapperTypes = {
    children : React.ReactNode
}

const PageWrapper = ({children} : PageWrapperTypes) => {
    return (
        <div className={"mt-[30px] w-full h-full px-[100px] flex flex-col gap-[60px]"}>
            {children}
        </div>
    )
}

export default PageWrapper
