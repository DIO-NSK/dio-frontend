import {COLOR} from "@/components/colors";
import {TextTypes} from "@/components/atoms/text/textTypes";

const TextBase = ({text, color = COLOR["black"]} : TextTypes) => {
    return (
        <h5
            style={{color : color}}
            className={"text-base font-normal"}
        >
            {text}
        </h5>
    );
};

export default TextBase;
