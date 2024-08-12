import axios from "axios";

const COORDS_TO_LOCATION_URL = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address'
const LOCATION_TO_COORDS_URL = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'

export interface Suggestion {
    address : string;
    lat : number;
    lng : number;
}

const headers = {
    headers : {
        'Authorization' : `Token ${process.env.NEXT_PUBLIC_GEO_KEY}`
    }
}

export const getLocationByCoords = async (coords : {lat : number, lng : number}) => {
    return axios.post(COORDS_TO_LOCATION_URL, {lat : coords.lat, lon : coords.lng}, headers)
        .then(response => response.data.suggestions)
}

export const getCoordsByLocation = async (location : string) : Promise<Suggestion[]> => {
    const response = await axios.post(LOCATION_TO_COORDS_URL, {query : location}, headers);
    const suggestions = response.data.suggestions;

    return suggestions.map((item : any) => ({address : item.value, lat : Number(item.data.geo_lat), lng : Number(item.data.geo_lon)}))
}