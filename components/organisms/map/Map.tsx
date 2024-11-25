"use client";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";

import { MapProps } from "@/components/organisms/map/Map.types";
import Marker from "@/components/organisms/map/Marker/Marker";
import { config, MAP_URL } from "./Map.constants";

const Map = (props: MapProps) => (
  <MapContainer
    className={"col-span-full h-[300px] rounded-lg z-0"}
    center={[props.position.lat, props.position.lng]}
    {...config}
  >
    <TileLayer url={MAP_URL} />
    <Marker {...props} />
  </MapContainer>
);

export default Map;
