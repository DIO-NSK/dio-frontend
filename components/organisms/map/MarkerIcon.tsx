import {Icon} from 'leaflet'

const MarkerIcon = new Icon({
    iconUrl: '/icons/map-pin.png' as any,
    iconSize: [32, 32],
    iconAnchor: [16, 32]
})

export {MarkerIcon};