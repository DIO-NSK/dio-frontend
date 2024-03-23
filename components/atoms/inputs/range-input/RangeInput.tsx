import React, {ChangeEvent} from 'react';
import style from "./RangeInput.module.css"
import Text from "@/components/atoms/text/text-base/Text";

export type RangeInputType = {
    fromValue : string,
    toValue : string,
    onChangeFromValue : (newValue : string) => void,
    onChangeToValue : (newValue : string) => void,
    labelText ?: string
}

const RangeInput = (props : RangeInputType) => {

    const inputList = [
        {
            className: style.leftInput,
            placeholder: "от",
            value: props.fromValue,
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
                props.onChangeFromValue(event.target.value)
        }, {
            className: style.rightInput,
            placeholder: "до",
            value: props.toValue,
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
                props.onChangeToValue(event.target.value)
        },
    ]

    return (
        <div className={"w-full flex flex-col gap-2"}>
            {
                props.labelText && <Text
                    text={props.labelText}
                    className={"text-base text-black"}
                />
            }
            <div className={style.inputCol}>

                <div className={style.inputRow}>
                    {
                        inputList.map((input) => {
                            return <input
                                type={"text"}
                                pattern={"[0-9]*"}
                                placeholder={input.placeholder}
                                className={input.className}
                                value={input.value + " ₽"}
                                onChange={input.onChange}
                            />
                        })
                    }
                </div>

                <div className={style.selectorRow}>
                    {
                        inputList.map((input) => {
                            return <input
                                type={"range"} step={"10"}
                                className={style.selector}
                                value={input.value}
                                onChange={input.onChange}
                            />
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default RangeInput
