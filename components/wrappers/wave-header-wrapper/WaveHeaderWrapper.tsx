import {WaveHeader} from "@/components/wrappers/wave-header-wrapper/wave-header/WaveHeader";
import React from "react";
import {fullWidthCardData} from "@/data/fullwidthCardData";
import FullwidthMainCard from "@/components/organisms/cards/fullwidth-main-card/FullwidthMainCard";

const WaveHeaderWrapper = ({header}: {header : string}): React.ReactNode => {
    return (
        <div className={"px-5 sm:px-0 w-full flex flex-col gap-7 sm:gap-[80px]"}>
            <WaveHeader header={header} />
            <div className={"flex flex-col gap-7 sm:gap-[80px]"}>
                {
                    fullWidthCardData.map((card) => {
                        return <FullwidthMainCard card={card} />
                    })
                }
            </div>
        </div>
    )
}

export default WaveHeaderWrapper
