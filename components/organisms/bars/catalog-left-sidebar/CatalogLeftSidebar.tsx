"use client"

import style from "./CatalogLeftSidebar.module.css"
import TextLg from "@/components/atoms/text/text-lg/TextLg";
import TextBase from "@/components/atoms/text/text-base/TextBase";
import {useState} from "react";
import LabelInputWrapper from "@/components/wrappers/label-input-wrapper/LabelInputWrapper";
import RangeInput from "@/components/atoms/inputs/range-input/RangeInput";

type HeaderDescrType = {
    header: string,
    descr: string
}

const HeaderRow = ({header, descr}: HeaderDescrType) => {
    return (
        <div className={style.headerRow}>
            <TextLg text={header}/>
            <div onClick={() => console.log(descr)}>
                <TextBase text={descr}/>
            </div>
        </div>
    )
}

const CatalogLeftSidebar = () => {

    const [fromInitialValue, toInitialValue] = ["200", "5000"]
    const [fromValue, setFromValue] = useState(fromInitialValue)
    const [toValue, setToValue] = useState(toInitialValue)

    return (
        <div className={style.wrapper}>
            <LabelInputWrapper header={"Цена"}>
                <RangeInput
                    fromPlaceholder={fromInitialValue}
                    toPlaceholder={toInitialValue}
                    fromValue={fromValue}
                    toValue={toValue}
                    onChangeFromValue={(newPrice: string) => setFromValue(newPrice)}
                    onChangeToValue={(newPrice: string) => setToValue(newPrice)}
                />
            </LabelInputWrapper>
        </div>
    )
}

CatalogLeftSidebar.HeaderRow = HeaderRow

export default CatalogLeftSidebar
