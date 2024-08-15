import {LatLng} from "leaflet";

export interface MapProps {
    position : LatLng;
    setPosition : (position : LatLng) => void;
}

export interface Address {
    address : string;
    latitude : number;
    longitude : number;
    city : string;
    flat : string;
    house : string;
}