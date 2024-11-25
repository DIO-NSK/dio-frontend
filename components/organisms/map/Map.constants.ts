import { MapContainerProps } from "react-leaflet";

export const config: MapContainerProps = {
    markerZoomAnimation: true,
    zoom: 16,
    maxZoom: 18,
    zoomControl: true,
    zoomAnimation: true,
    zoomSnap: 1,
};

export const MAP_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";