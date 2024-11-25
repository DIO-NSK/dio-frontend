import { MutableRefObject, useEffect, useMemo, useRef } from 'react';
import { useMap } from "react-leaflet";
import { MapProps } from '../Map.types';

export interface UseMarkerReturn {
    markerRef: MutableRefObject<any>;
    eventHandlers: any;
}

export const useMarker = ({ position, setPosition }: MapProps): UseMarkerReturn => {
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
        map.flyTo({ lat: position.lat, lng: position.lng })
    }, [position]);

    useEffect(() => {
        map.attributionControl.setPrefix('');

        map.on('move', () => {
            markerRef.current?.setLatLng(map.getCenter());
        });

        map.on('dragend', () => {
            setPosition(map.getCenter())
        })

        return () => {
            map.off();
        }

    }, []);

    return {
        markerRef, eventHandlers
    }
}