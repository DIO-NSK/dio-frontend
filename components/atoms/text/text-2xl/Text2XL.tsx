import {COLOR} from "@/components/colors";
import {Text2XLTypes} from "@/types/dto/text";

const Text2XL = ({text, color = COLOR["black"], isUppercase = false}: Text2XLTypes) => {

    const defaultClassname = "text-[24px] font-semibold leading-none"
    const className = isUppercase ? `uppercase ${defaultClassname}` : defaultClassname

    return (
        <h4
            style={{color : color, whiteSpace: "balance"}}
            className={className}
        >
            {text}
        </h4>
    )
}

export default Text2XL
