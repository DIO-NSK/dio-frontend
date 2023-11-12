import React from 'react';
import {TextTypes} from "@/types/text";

const Text40 = ({text, color} : TextTypes) => {
    return (
        <h4
            style={{color : color}}
            className={"text-[40px] font-bold leading-none"}
        >
            {text}
        </h4>
    )
}

export default Text40
