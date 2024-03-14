import {FiHeart} from "react-icons/fi";
import {MouseEventHandler} from "react";

const LikeButton = ({isLiked, toggleLike}: {
    isLiked: boolean,
    toggleLike: () => void
}) => {

    const handleLikeClick: MouseEventHandler = (event) => {
        event.stopPropagation();
        toggleLike()
    }

    return (
        <div className={"hover:cursor-pointer"} onClick={handleLikeClick}>
            {
                isLiked ? <FiHeart
                    size={"24px"}
                    className={"fill-info-red stroke-none"}
                /> : <FiHeart
                    size={"22px"}
                    className={"stroke-border-gray hover:stroke-info-red hoverable"}
                />
            }
        </div>
    )
}

export default LikeButton
