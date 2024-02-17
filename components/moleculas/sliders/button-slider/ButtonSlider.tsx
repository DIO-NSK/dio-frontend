import SlideButton from "@/components/atoms/buttons/slide-button/SlideButton";
import {Side} from "@/data/enums/side";

type ButtonSliderTypes = {
    onBackClick : () => void,
    onNextClick : () => void
}

const ButtonSlider = ({onBackClick, onNextClick} : ButtonSliderTypes) => {
    return (
        <div className={"hidden sm:flex flex-row items-center gap-[20px]"}>
            <SlideButton
                side={Side["LEFT"]}
                onClick={onBackClick}
            />
            <SlideButton
                side={Side["RIGHT"]}
                onClick={onNextClick}
            />
        </div>
    )
}

export default ButtonSlider
