import {Slider} from "@mui/joy";
import React, {ChangeEvent} from "react";
import {RangeInputProps} from "@/components/atoms/inputs/range-input/legacy/RangeInput";
import Text from "@/components/atoms/text/text-base/Text";

const sx = {
    ".MuiSlider-track": {
        height: "6px",
        border: "none",
        backgroundColor: "#E3F6FF"
    },
    ".MuiSlider-thumb": {
        height: "15px",
        width: "15px",
        backgroundColor: "#0067B0",
        boxBorder: "none",
        border: "none",
        "&::before": {
            border: "none",
            borderColor: "none",
            outline: "none"
        }
    }
}

const RangeInput = (props: RangeInputProps) => {

    const step = Number(((+props.maxValue - +props.minValue) / 20).toFixed())

    const handleChange = (_: Event, state: number | number[]) => {
        props.onChangeFromValue((state as number[])[0].toString())
        props.onChangeToValue((state as number[])[1].toString())
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[0-9]/.test(event.key)) event.preventDefault()
    }

    const inputList = [
        {
            onChange: (e: ChangeEvent<HTMLInputElement>) => props.onChangeFromValue(e.target.value),
            className: "w-full p-[20px] rounded-l-xl bg-bg-light-blue border-2 border-light-gray focus:outline-0",
            placeholder: "от",
            value: props.fromValue,
        }, {
            onChange: (e: ChangeEvent<HTMLInputElement>) => props.onChangeToValue(e.target.value),
            className: "w-full p-[20px] text-right rounded-r-xl border-2 border-l-0 border-light-gray bg-bg-light-blue focus:outline-0",
            placeholder: "до",
            value: props.toValue,
        },
    ]

    return (
        <div className={"w-full flex flex-col"}>
            <div className={"w-full flex flex-col gap-2"}>
                {props.labelText && <Text text={props.labelText} className={"text-base text-black"}/>}
                <div className={"w-full flex flex-row items-center gap-[0px]"}>
                    {inputList.map((input) => (
                        <input
                            {...props} {...input}
                            onKeyDown={handleKeyPress}
                            pattern={"[0-9]*"}
                            type={"text"}
                        />
                    ))}
                </div>
            </div>
            <Slider
                min={+props.minValue} max={+props.maxValue}
                value={[+props.fromValue, +props.toValue]}
                onChange={handleChange}
                sx={sx} disableSwap
            />
        </div>
    )

}

export default RangeInput