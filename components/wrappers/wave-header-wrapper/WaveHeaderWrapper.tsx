import style from "./WaveHeaderWrapper.module.css"

import {WaveHeader} from "@/components/wrappers/wave-header-wrapper/wave-header/WaveHeader";
import React from "react";
import {fullWidthCardData} from "@/data/fullwidthCardData";
import FullwidthMainCard from "@/components/organisms/cards/fullwidth-main-card/FullwidthMainCard";

const WaveHeaderWrapper = ({header}: {header : string}): React.ReactNode => {
    return (
        <div className={style.wrapper}>
            <WaveHeaderWrapper.WaveHeader header={header} />
            <div className={style.content}>
                {
                    fullWidthCardData.map((card) => {
                        return <FullwidthMainCard card={card} />
                    })
                }
            </div>
        </div>
    )
}

WaveHeaderWrapper.WaveHeader = WaveHeader

export default WaveHeaderWrapper
