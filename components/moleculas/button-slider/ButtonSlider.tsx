import SlideButton, {SlideButtonSide} from "@/components/atoms/buttons/slide-button/SlideButton";

type ButtonSliderTypes = {
    onBackClick : () => void,
    onNextClick : () => void
}

const ButtonSlider = ({onBackClick, onNextClick} : ButtonSliderTypes) => {
    return (
        <div className={"flex flex-row items-center gap-[20px]"}>
            <SlideButton
                side={SlideButtonSide["LEFT"]}
                onClick={onBackClick}
            />
            <SlideButton
                side={SlideButtonSide["RIGHT"]}
                onClick={onNextClick}
            />
        </div>
    )
}

export default ButtonSlider
