import {FiHeart} from "react-icons/fi";
import {MouseEventHandler, useState} from "react";

const LikeButton = () => {

    const [isLiked, setLiked] = useState<boolean>(false)
    const handleLike : MouseEventHandler = (event) => {
        event.stopPropagation(); setLiked(true)
    }
    const handleRemoveLike : MouseEventHandler = (event) => {
        event.stopPropagation(); setLiked(false)
    }

    return (
        <div className={"hover:cursor-pointer"}>
            {
                isLiked ? <FiHeart
                    size={"24px"}
                    className={"fill-info-red stroke-none"}
                    onClick={handleRemoveLike}
                /> : <FiHeart
                    size={"22px"}
                    className={"stroke-border-gray hover:stroke-info-red hoverable"}
                    onClick={handleLike}
                    />
            }
        </div>
    )
}

export default LikeButton
