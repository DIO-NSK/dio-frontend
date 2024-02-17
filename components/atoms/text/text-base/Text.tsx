import {TextProps} from "@/types/props/Text";
import {cn} from "@/utlis/cn";

const Text = ({text, className, onClick, style}: TextProps) => {
    return (
        <h5
            style={style}
            className={cn("text-base font-normal", className)}
            onClick={onClick}
        >
            {text}
        </h5>
    );
};

export default Text;
