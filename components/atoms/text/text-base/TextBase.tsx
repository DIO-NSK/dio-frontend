import {TextProps} from "@/types/props/Text";
import {cn} from "@/utlis/cn";

const TextBase = ({text, className}: TextProps) => {
    return (
        <h5 className={cn("text-base font-normal", className)}>
            {text}
        </h5>
    );
};

export default TextBase;
