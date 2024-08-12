import React, {useEffect, useMemo, useRef} from 'react';
import {Marker as LeafletMarker, useMap} from "react-leaflet";
import {MarkerIcon} from "@/components/organisms/map/MarkerIcon";
import {MapProps} from "@/components/organisms/map/Map.types";

const Marker = ({position, setPosition} : MapProps) => {

    const markerRef = useRef<any>(null)
    const map = useMap();

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )

    useEffect(() => {
        map.flyTo({lat : position.lat, lng : position.lng})
    }, [ position ]);

    useEffect(() => {
        map.attributionControl.setPrefix('');

        map.on('move',() => {
            markerRef.current?.setLatLng(map.getCenter());
        });

        map.on('dragend', () => {
            setPosition(map.getCenter())
        })

        return () => {
            map.off();
        }

    }, []);

    return position ? (
        <LeafletMarker
            ref={markerRef}
            eventHandlers={eventHandlers}
            position={position}
            icon={MarkerIcon}
        />
    ) : null;
};

export default Marker;