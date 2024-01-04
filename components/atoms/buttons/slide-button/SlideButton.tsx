import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {Side} from "@/data/enums/side";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

type SlideButtonType = {
    side : Side
    onClick : () => void
}

const SlideButton = ({side, onClick} : SlideButtonType) => {


    const wrapperCV : ClassValue[] = [
        "w-[50px] h-[50px] rounded-full border-2 border-light-blue",
        "flex items-center justify-center pointer hoverable",
        "text-text-gray hover:bg-light-blue hover:text-link-blue",
        "hover:bg-light-gray hover:border-bg-light-blue"
    ]

    return (
        <div className={cn(wrapperCV)} onClick={onClick}>
            {
                side === Side.LEFT ? <FiChevronLeft size={"22px"} />
                    : <FiChevronRight size={"22px"} />
            }
        </div>
    )

}

export default SlideButton
