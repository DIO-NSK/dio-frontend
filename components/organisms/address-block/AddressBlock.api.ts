import {api} from "@/api";

export interface Suggestion {
    address: string;
    lat: number;
    lng: number;
}

export const getLocationByCoords = async (coords: { lat: number, lng: number }) => {
    return api.get('/geo/suggest/coords', {params: {latitude: coords.lat, longitude: coords.lng}})
        .then(response => response.data.suggestions)
}

export const getCoordsByLocation = async (location: string): Promise<Suggestion[]> => {
    const response = await api.get('/geo/suggest/name', {params: {name: location}});
    const suggestions = response.data.suggestions;

    return suggestions.map((item: any) => ({
        address: item.value,
        lat: Number(item.data.geo_lat),
        lng: Number(item.data.geo_lon)
    }))
}