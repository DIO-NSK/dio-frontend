import style from "./LabelInputWrapper.module.css"
import TextM from "@/components/atoms/text/text-m/TextM";
import React, {useState} from "react";
import ChevronButton, {ChevronButtonType} from "@/components/atoms/buttons/chevron-button/ChevronButton";

type LabelRowType = {
    header: string
    children : React.ReactNode
}

type LabelInputWrapperType = LabelRowType

const LabelRow = ({header, isExpanded, setExpanded}: { header : string } & ChevronButtonType) => {
    return (
        <div className={style.labelRow}>
            <TextM text={header}/>
            <ChevronButton
                isExpanded={isExpanded}
                setExpanded={setExpanded}
            />
        </div>
    )
}

const LabelInputWrapper = (props: LabelInputWrapperType) => {

    const [isExpanded, setExpanded] = useState(true)

    return (
        <div className={style.wrapper}>
            <LabelInputWrapper.LabelRow
                header={props.header}
                isExpanded={isExpanded}
                setExpanded={(isExpanded : boolean) => setExpanded(isExpanded)}
            />
            {
                isExpanded && props.children
            }
        </div>
    )
}


LabelInputWrapper.LabelRow = LabelRow

export default LabelInputWrapper
