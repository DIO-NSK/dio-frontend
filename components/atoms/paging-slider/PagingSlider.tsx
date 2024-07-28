import style from "./PagindSlider.module.css"

import {useState} from "react";
import {COLOR} from "@/components/colors";

type PagingSliderTypes = {
    activePage: number,
    setActivePage: (page: number) => void,
    pageNumber: number
}

const PagingSlider = ({activePage, setActivePage, pageNumber}: PagingSliderTypes) => {

    const initialArray : boolean[] = Array.from({length : pageNumber},
        (_, index) => index === activePage)

    const [pagesArray, setPagesArray] = useState<boolean[]>(initialArray)

    const updateArrayState = (activeIndex: number) => {
        const updatedArray = pagesArray.map((pageStatus, index) => {
            if (index === activeIndex) return true
            return pageStatus
        })
        setPagesArray(updatedArray)
    }

    return (
        <div className={style.wrapper}>
            {
                pagesArray.map((_, index: number) => {

                    const color = index === activePage
                        ? COLOR["link-blue"] : COLOR["bg-light-blue"]

                    return <div
                        key={index}
                        style={{backgroundColor: color}}
                        className={style.page}
                        onClick={() => {
                            updateArrayState(index)
                            setActivePage(index)
                        }}
                    />

                })
            }
        </div>
    )
}

export default PagingSlider
