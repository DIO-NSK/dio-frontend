import {TextProps} from "@/types/props/Text";
import {cn} from "@/utlis/cn";

const TextBase = ({text, className, onClick}: TextProps) => {
    return (
        <h5
            className={cn("text-base font-normal", className)}
            onClick={onClick}
        >
            {text}
        </h5>
    );
};

export default TextBase;
