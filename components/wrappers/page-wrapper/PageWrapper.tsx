import React from "react";
import style from "./PageWrapper.module.css"

type PageWrapperTypes = {
    children : React.ReactNode
}

const PageWrapper = ({children} : PageWrapperTypes) => {
    return (
        <div className={style.wrapper}>
            {children}
        </div>
    )
}

export default PageWrapper
