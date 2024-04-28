import React from 'react';
import style from "./RangeInput.module.css"
import Text from "@/components/atoms/text/text-base/Text";

export type RangeInputType = {
    fromValue: string,
    toValue: string,
    maxValue: string,
    minValue: string,
    onChangeFromValue: (newValue: string) => void,
    onChangeToValue: (newValue: string) => void,
    unit?: string,
    labelText?: string
}

const RangeInput = ({...props}: RangeInputType) => {

    const inputList = [
        {
            className: "w-full p-[20px] rounded-l-xl bg-bg-light-blue border-r-2 border-light-gray focus:outline-0",
            placeholder: "от",
            value: props.fromValue,
            onChange: props.onChangeFromValue
        }, {
            className: "w-full p-[20px] text-right rounded-r-xl bg-bg-light-blue focus:outline-0",
            placeholder: "до",
            value: props.toValue,
            onChange: props.onChangeToValue
        },
    ]

    const step = ((+props.maxValue - +props.minValue) / 20).toFixed()

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[0-9]/.test(event.key)) event.preventDefault()
    }

    return (
        <div className={"w-full flex flex-col gap-2"}>
            {props.labelText && <Text
                text={props.labelText}
                className={"text-base text-black"}
            />}
            <div className={"w-full flex flex-col gap-[20px]"}>

                <div className={"w-full flex flex-row items-center gap-[0px]"}>
                    {inputList.map((input) => {
                        return <input
                            type={"text"}
                            pattern={"[0-9]*"}
                            onKeyPress={handleKeyPress}
                            max={props.maxValue}
                            min={props.minValue}
                            placeholder={input.placeholder}
                            className={input.className}
                            value={input.value}
                            onChange={(event) => input.onChange(event.target.value)}
                        />
                    })}
                </div>

                <div className={"w-full flex flex-row"}>
                    {inputList.map((input) => {
                        return <input
                            type={"range"} step={step}
                            className={style.selector}
                            max={props.maxValue}
                            min={props.minValue}
                            value={input.value}
                            onChange={(event) =>
                                input.onChange(event.target.value)}
                        />
                    })}
                </div>

            </div>
        </div>
    )
}

export default RangeInput
