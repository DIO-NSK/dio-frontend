import React, {ChangeEvent} from 'react';
import style from "./RangeInput.module.css"

export type RangeInputType = {
    fromValue : string,
    toValue : string,
    fromPlaceholder : string,
    toPlaceholder : string,
    onChangeFromValue : (newValue : string) => void,
    onChangeToValue : (newValue : string) => void,
}

const RangeInput = (props : RangeInputType) => {

    const inputList = [
        {
            className: style.leftInput,
            placeholder: props.fromPlaceholder,
            value: props.fromValue,
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
                props.onChangeFromValue(event.target.value)
        }, {
            className: style.rightInput,
            placeholder: props.toPlaceholder,
            value: props.toValue,
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
                props.onChangeToValue(event.target.value)
        },
    ]

    return (
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
                            type={"range"}
                            min={props.fromPlaceholder}
                            max={props.toPlaceholder}
                            step={"10"}
                            className={style.selector}
                            value={input.value}
                            onChange={input.onChange}
                        />
                    })
                }
            </div>

        </div>
    )
}

export default RangeInput
