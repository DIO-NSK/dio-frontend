import React, {useState} from "react";
import Text from "@/components/atoms/text/text-base/Text";

const DescriptionCol = ({text, maxSymbols = 100}: { text: string, maxSymbols?: number }) => {

    const [isExpanded, setExpanded] = useState<boolean>(false)

    const isLower = maxSymbols < text.length
    const shortText = isLower ? text.slice(0, maxSymbols).concat("..") : text

    return (
        <div className={"col-span-4 flex flex-col gap-2 sm:gap-3"}>
            {isExpanded ? <Text text={text}/> : <Text text={shortText}/>}
            {isLower && <div
                className={"hover:cursor-pointer"}
                onClick={() => setExpanded(!isExpanded)}
            >
                <Text
                    text={isExpanded ? "Свернуть" : "Читать всё"}
                    className={"hoverable pointer text-link-blue hover:text-blue-800"}
                />
            </div>}
        </div>
    )
}

export default DescriptionCol
