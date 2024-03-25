import React, {useState} from "react";
import ChevronButton, {ChevronButtonType} from "@/components/atoms/buttons/chevron-button/ChevronButton";
import Text from "@/components/atoms/text/text-base/Text";

type LabelRowType = {
    header: string
    children : React.ReactNode
}

type LabelInputWrapperType = LabelRowType & {isDirty ?: boolean}

const LabelRow = ({header, isExpanded, setExpanded, isDirty}: { header : string, isDirty ?: boolean } & ChevronButtonType) => {
    return (
        <div className={"w-full flex flex-row justify-between items-center"}>
            <div className={"flex flex-row items-center gap-3"}>
                <Text text={header}/>
                {isDirty && <div className={"w-[6px] h-[6px] rounded-full bg-link-blue"}/>}
            </div>
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
        <div className={"w-full flex flex-col gap-[20px] pb-7 border-b-2 border-light-gray"}>
            <LabelInputWrapper.LabelRow
                isDirty={props.isDirty}
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
