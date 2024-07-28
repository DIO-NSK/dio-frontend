import {FiEye, FiEyeOff} from "react-icons/fi";

const EyeButton = ({isOpen, setOpen}: {
    isOpen: boolean,
    setOpen: (isOpen: boolean) => void
}) => {
    return (
        <div
            onClick={() => setOpen(!isOpen)}
            className={"pointer hoverable text-text-gray hover:text-link-blue"}
        >
            {
                isOpen ? <FiEyeOff size={"20px"}/>
                    : <FiEye size={"20px"}/>
            }
        </div>
    );
};

export default EyeButton;
