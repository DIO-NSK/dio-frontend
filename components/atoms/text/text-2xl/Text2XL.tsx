import {COLOR} from "@/components/colors";
import {TextTypes} from "@/components/atoms/text/textTypes";

const Text2XL = ({text, color = COLOR["black"]}: TextTypes) => {
    return (
        <h4
            style={{color : color}}
            className={"text-[24px] font-semibold leading-none"}
        >
            {text}
        </h4>
    )
}

export default Text2XL
