import {useMediaQuery} from "react-responsive";

export const useMobile = () => {

    return useMediaQuery({
        query : '(min-width: 320px) and (max-width: 744px)'
    })

}