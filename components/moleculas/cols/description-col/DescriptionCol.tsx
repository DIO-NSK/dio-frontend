import LinesEllipsis from "react-lines-ellipsis";
import React, {useState} from "react";
import Text from "@/components/atoms/text/text-base/Text";

const DescriptionCol = ({text}: { text: string}) => {

    const [isExpanded, setExpanded] = useState<boolean>(false)

    return (
        <div className={"col-span-4 flex flex-col gap-2 sm:gap-[15px]"}>
            {
                isExpanded ? <Text text={text}/>
                    : <LinesEllipsis
                        text={text} maxLine='3'
                        ellipsis='..' trimRight
                        basedOn='letters'
                    />
            }
            <div
                className={"hover:cursor-pointer"}
                onClick={() => setExpanded(!isExpanded)}
            >
                <Text
                    text={"Читать всё"}
                    className={"hoverable pointer text-link-blue hover:text-blue-800"}
                />
            </div>
        </div>
    )
}

export default DescriptionCol
