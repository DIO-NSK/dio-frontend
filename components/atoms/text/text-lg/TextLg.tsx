import {TextTypes} from "@/types/dto/text";


const TextLg = ({text, color, weight = "regular"}: TextTypes) => {

    const textWeight = weight === "regular" ? 300
        : weight === "medium" ? 400 : 500

    return (
        <h4
            style={{
                color: color,
                fontWeight: textWeight,
                whiteSpace: "balance"
            }}
            className={"text-[20px] font-normal leading-tight"}
        >
            {text}
        </h4>
    )
}

export default TextLg
