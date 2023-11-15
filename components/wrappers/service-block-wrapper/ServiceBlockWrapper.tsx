import React from 'react';
import style from "./ServiceBlockWrapper.module.css"
import TextM from "@/components/atoms/text/text-m/TextM";

const ServiceBlockWrapper = ({header, children} : {
    header : string,
    children : React.ReactNode
}) => {
    return (
        <div className={style.wrapper}>
            <div className={"col-span-full"}>
                <TextM text={header} weight={"medium"}/>
            </div>
            {children}
        </div>
    )
}

export default ServiceBlockWrapper
