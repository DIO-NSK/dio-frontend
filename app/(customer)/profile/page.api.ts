import {api} from "@/api";

export const getBonuses = async () => {
    return api.get('/profile/setting/bonuses').then(response => response.data.balance);
}