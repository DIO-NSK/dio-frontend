import React from 'react';
import {FiChevronDown, FiChevronUp} from "react-icons/fi";

export type ChevronButtonType = {
    isExpanded: boolean,
    setExpanded: (isExpanded: boolean) => void
}

const ChevronButton = ({isExpanded, setExpanded}: ChevronButtonType) => {
    return (
        <div>
            {
                isExpanded ? <FiChevronUp
                    size={"20px"}
                    className={"stroke-text-gray hover:cursor-pointer"}
                    onClick={() => setExpanded(!isExpanded)}
                /> : <FiChevronDown
                    size={"20px"}
                    className={"stroke-text-gray hover:cursor-pointer"}
                    onClick={() => setExpanded(!isExpanded)}
                />
            }
        </div>
    )
}

export default ChevronButton
