import React from 'react';
import style from "./StickyCardWrapper.module.css"

const StickyCardWrapper = ({children, startCol} : {
    children : React.ReactNode,
    startCol : "col-start-7" | "col-start-10"
}) => {

    const className : string = `${style.wrapper} ${startCol}`

    return (
        <div className={className}>
            {children}
        </div>
    )

}

export default StickyCardWrapper
