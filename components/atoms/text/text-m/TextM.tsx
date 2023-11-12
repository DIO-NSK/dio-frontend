import {COLOR} from "@/components/colors";
import {TextTypes} from "@/types/text";

const TextM = ({text, color = COLOR["black"]} : TextTypes) => {
    return (
        <h4
            style={{color : color}}
            className={"text-lg font-medium"}
        >
            {text}
        </h4>
    )
}

export default TextM
