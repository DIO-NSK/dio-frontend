'use client'

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import React from 'react';
import {MapContainer, TileLayer} from "react-leaflet";

import Marker from "@/components/organisms/map/Marker";
import {useLocation} from "@/utlis/hooks/useLocation";
import {MapProps} from "@/components/organisms/map/Map.types";

const Map = (props : MapProps) => (
    <MapContainer
        className={'col-span-full h-[300px] rounded-lg z-0'}
        center={[props.position.lat, props.position.lng]}
        markerZoomAnimation={true}
        zoom={16} zoomControl={true}
        zoomAnimation={true}
        zoomSnap={1}
    >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <Marker {...props}/>
    </MapContainer>
);

export default Map;