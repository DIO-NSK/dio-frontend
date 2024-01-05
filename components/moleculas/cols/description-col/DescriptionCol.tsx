import style from "./DescriptionCol.module.css"
import LinesEllipsis from "react-lines-ellipsis";
import React, {useState} from "react";
import TextBase from "@/components/atoms/text/text-base/TextBase";

const DescriptionCol = ({text}: { text: string }) => {

    const [isExpanded, setExpanded] = useState<boolean>(false)

    return (
        <div className={style.wrapper}>
            {
                isExpanded ? <TextBase text={text}/>
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
                <TextBase
                    text={"Читать всё"}
                    className={"hoverable pointer text-link-blue hover:text-blue-800"}
                />
            </div>
        </div>
    )
}

export default DescriptionCol
