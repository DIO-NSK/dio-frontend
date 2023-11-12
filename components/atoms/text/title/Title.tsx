import React from 'react';
import {COLOR} from "@/components/colors";
import {TextTypes} from "@/types/text";

const Title = ({color = COLOR["black"], text} : TextTypes) => {
    return (
        <h4
            style={{color : color}}
            className={"text-[32px] font-bold leading-none"}
        >
            {text}
        </h4>
    )
}

export default Title
