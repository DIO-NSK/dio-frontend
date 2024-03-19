import {api} from "@/api";
import {Auth} from "@/types/AuthContextType";
import {useContext} from "react";
import AuthContext from "@/context/AuthContext";

const useRefreshToken = () => {

    const {setAuth} = useContext(AuthContext)

    const refresh = async () => {
        const response = await api.get('/refresh', {withCredentials: true});
        setAuth((prev: Auth) => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {...prev, accessToken: response.data.accessToken}
        });
        return response.data.accessToken;
    }

    return refresh;

};

export default useRefreshToken;