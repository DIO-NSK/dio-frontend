import {WaveHeader} from "@/components/wrappers/wave-header-wrapper/wave-header/WaveHeader";
import React from "react";
import {fullWidthCardData} from "@/data/fullwidthCardData";
import FullwidthMainCard from "@/components/organisms/cards/fullwidth-main-card/FullwidthMainCard";

const WaveHeaderWrapper = ({header}: { header: string }): React.ReactNode => {
    return (
        <article className={"px-5 sm:px-0 w-full flex flex-col gap-7 sm:gap-[80px]"}>
            <WaveHeader header={header}/>
            <section className={"flex flex-col gap-7 sm:gap-[80px]"}>
                {fullWidthCardData.map((card, index) => {
                    return <FullwidthMainCard card={card} key={index}/>
                })}
            </section>
        </article>
    )
}

export default WaveHeaderWrapper
