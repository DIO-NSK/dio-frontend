import TextBase from "@/components/atoms/text/text-base/TextBase";
import {TextProps} from "@/types/props/Text";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";

type TextButtonProps = {
    onClick : () => void
} & TextProps

const TextButton = ({text, onClick, className} : TextButtonProps) => {

    const textButtonCV : ClassValue[] = [
        "text-link-blue font-medium pointer",
        "hover:text-blue-800 hover:duration-200 transition"
    ]

    return (
        <div onClick={onClick}>
            <TextBase
                className={cn(textButtonCV, className)}
                text={text}
            />
        </div>
    );
};

export default TextButton;
