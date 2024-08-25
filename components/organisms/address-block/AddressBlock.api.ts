import {api} from "@/api";
import {Address} from "@/components/organisms/map/Map.types";

export interface Suggestion {
    address: string;
    city : string;
    flat : string;
    house : string;
    lat: number;
    lng: number;
}

export const getLocationByCoords = async (coords: { lat: number, lng: number }) : Promise<Address[]> => {
    const response = await  api.get('/geo/suggest/coords', {params: {latitude: coords.lat, longitude: coords.lng}});
    const suggestions = response.data.suggestions;

    return suggestions.map((item: any) => ({
        address: item.value,
        city : item.data.city ?? '',
        house : item.data.house ?? '',
        latitude: Number(item.data.geo_lat),
        longitude: Number(item.data.geo_lon)
    }) as Address)
}

export const getCoordsByLocation = async (location: string): Promise<Suggestion[]> => {
    const response = await api.get('/geo/suggest/name', {params: {name: location}});
    const suggestions = response.data.suggestions;

    return suggestions.map((item: any) => ({
        address: item.value,
        city : item.data.city ?? '',
        house : item.data.house ?? '',
        lat: Number(item.data.geo_lat),
        lng: Number(item.data.geo_lon)
    }) as Suggestion)
}