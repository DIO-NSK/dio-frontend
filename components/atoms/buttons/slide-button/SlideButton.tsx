import style from "./SlideButton.module.css"
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {Side} from "@/data/enums/side";

type SlideButtonType = {
    side : Side
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
                side === Side.LEFT ? <FiChevronLeft {...buttonProps} />
                    : <FiChevronRight {...buttonProps} />
            }
        </div>
    )
}

export default SlideButton
