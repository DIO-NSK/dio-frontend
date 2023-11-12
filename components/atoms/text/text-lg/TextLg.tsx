import {TextTypes} from "@/types/text";


const TextLg = ({text, color} : TextTypes) => {
    return (
        <h4
            style={{color : color, whiteSpace: "balance"}}
            className={"text-[20px] font-normal leading-tight"}
        >
            {text}
        </h4>
    )
}

export default TextLg
