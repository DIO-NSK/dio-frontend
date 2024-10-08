import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {Side} from "@/data/enums/side";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

type SlideButtonType = {
    side: Side
    onClick: () => void,
    disabled?: boolean
}

const SlideButton = ({side, onClick, disabled}: SlideButtonType) => {

    const disabledCV = disabled && [
        "bg-gray-100 bg-opacity-40 hover:bg-gray-100",
        "hover:bg-opacity-60 hover:cursor-not-allowed",
        "hover:border-gray-300 hover:text-gray"
    ]

    const wrapperCV: ClassValue[] = [
        "md:w-[40px] md:h-[40px] xl:w-[50px] xl:h-[50px] rounded-full border-2 border-light-blue",
        "flex items-center justify-center pointer hoverable",
        "text-text-gray hover:bg-light-blue hover:text-link-blue",
        "hover:bg-light-gray hover:border-bg-light-blue",
    ]

    return (
        <div className={cn(wrapperCV, disabledCV)} onClick={onClick}>
            {
                side === Side.LEFT
                    ? <FiChevronLeft className={'xl:size-[22px] md:size-[18px]'}/>
                    : <FiChevronRight className={"xl:size-[22px] md:size-[18px]"}/>
            }
        </div>
    )

}

export default SlideButton
