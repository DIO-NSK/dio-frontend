import {useEffect, useState} from "react";
import {DEFAULT_CUSTOMER_POSITION} from "@/constants";

export const useLocation = (): [number, number] => {
    const [coords, setCoords] = useState<GeolocationCoordinates>();

    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition(
            (position) => setCoords(position.coords),
            () => setCoords(undefined)
            , {
                enableHighAccuracy: true
            }
        );
    }, []);

    return coords ? [coords.latitude, coords.longitude] : DEFAULT_CUSTOMER_POSITION;

}