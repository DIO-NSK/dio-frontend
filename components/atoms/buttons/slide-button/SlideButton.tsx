import style from "./SlideButton.module.css"
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

export enum SlideButtonSide {
    LEFT, RIGHT
}

type SlideButtonType = {
    side : SlideButtonSide
    onClick : () => void
}

const SlideButton = ({side, onClick} : SlideButtonType) => {

    const buttonProps = {
        className : "stroke-link-blue",
        size : "24px"
    }

    return (
        <div className={style.wrapper} onClick={onClick}>
            {
                side === SlideButtonSide.LEFT ? <FiChevronLeft {...buttonProps} />
                    : <FiChevronRight {...buttonProps} />
            }
        </div>
    )
}

export default SlideButton
