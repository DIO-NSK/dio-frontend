import style from "./SliderGroup.module.css"
import Title from "@/components/atoms/text/title/Title";
import React from "react";
import ButtonSlider from "@/components/moleculas/button-slider/ButtonSlider";

type SliderGroupTypes = {
    header : string,
    children : React.ReactNode
}

const SliderGroup = ({header, children} : SliderGroupTypes) => {
    return (
        <div className={style.wrapper}>
            <div className={style.headerRow}>
                <Title text={header} />
                <ButtonSlider
                    onBackClick={() => console.log("Назад")}
                    onNextClick={() => console.log("Вперёд")}
                    />
            </div>
            <div className={style.container}>
                {children}
            </div>
        </div>
    )
}

export default SliderGroup
