import {COLOR} from "@/components/colors";
import {TextTypes} from "@/types/dto/text";

const TextM = ({text, weight = "medium", color = COLOR["black"]}: TextTypes) => {

    const textWeight = weight === "regular" ? 300
        : weight === "medium" ? 400 : 500

    return (
        <h4
            style={{color: color, fontWeight: textWeight}}
            className={"text-lg font-medium"}
        >
            {text}
        </h4>
    )
}

export default TextM
