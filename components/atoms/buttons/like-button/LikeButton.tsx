import {FiHeart} from "react-icons/fi";
import {useState} from "react";

const LikeButton = () => {

    const [isLiked, setLiked] = useState<boolean>(false)

    return (
        <div className={"hover:cursor-pointer"}>
            {
                isLiked ? <FiHeart
                    size={"24px"}
                    className={"fill-info-red stroke-none"}
                    onClick={() => setLiked(false)}
                /> : <FiHeart
                    size={"22px"}
                    className={"stroke-border-gray"}
                    onClick={() => setLiked(true)}
                    />
            }
        </div>
    )
}

export default LikeButton
