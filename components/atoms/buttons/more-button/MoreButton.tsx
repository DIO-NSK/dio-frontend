import React from 'react';
import TextBase from "@/components/atoms/text/text-base/TextBase";
import {COLOR} from "@/components/colors";
import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";

const MoreButton = ({text, isExpanded, setExpanded} : {
    text : string,
    isExpanded : boolean,
    setExpanded : (isExpanded : boolean) => void
}) => {
    return (
        <div className={"flex flex-row items-center gap-[10px] hover:cursor-pointer"}
             onClick={() => setExpanded(!isExpanded)}
        >
            <TextBase text={text} color={COLOR["link-blue"]}/>
            <ChevronButton
                isExpanded={isExpanded}
                setExpanded={setExpanded}
            />
        </div>
    )
}

export default MoreButton
