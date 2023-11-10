import TextBase from "@/components/atoms/text/text-base/TextBase";
import {COLOR} from "@/components/colors";

type TextButtonTypes = {
    text : string,
    onClick : () => void
}

const TextButton = ({text, onClick} : TextButtonTypes) => {
    return (
        <div onClick={onClick}>
            <TextBase text={text} color={COLOR["link-blue"]}/>
        </div>
    );
};

export default TextButton;
