import {cn} from "@/utlis/cn";

type IconButtonTypes = {
    src : string,
    onClick : () => void,
    className ?: string
}

const IconButton = ({src, onClick, className = "w-6 h-6"} : IconButtonTypes) => {
    return (
        <button onClick={onClick}>
            <img
                className={cn("pointer hover:link-blue", className)}
                src={src} alt={'/'}
            />
        </button>
    )
}

export default IconButton
