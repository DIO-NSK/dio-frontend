import React from 'react';
import style from "./ServiceCardWrapper.module.css"

const ServiceCardWrapper = ({children} : {
    children : React.ReactNode
}) => {
    return (
        <div className={style.wrapper}>
            {children}
        </div>
    )
}

export default ServiceCardWrapper
