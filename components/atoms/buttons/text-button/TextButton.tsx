import Text from "@/components/atoms/text/text-base/Text";
import {TextProps} from "@/types/props/Text";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";

type TextButtonProps = {
    onClick : () => void
} & TextProps

const TextButton = ({text, onClick, className} : TextButtonProps) => {

    const textButtonCV : ClassValue[] = [
        "text-link-blue text-sm xl:text-base pointer",
        "hover:text-blue-800 hover:duration-200 transition",
    ]

    return (
        <div onClick={e => {
            e.stopPropagation(); onClick()
        }}>
            <Text
                className={cn(textButtonCV, className)}
                text={text}
            />
        </div>
    );
};

export default TextButton;
