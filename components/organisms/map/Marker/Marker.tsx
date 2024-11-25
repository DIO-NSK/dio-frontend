import { MapProps } from "@/components/organisms/map/Map.types";
import { MarkerIcon } from "@/components/organisms/map/MarkerIcon";
import { Marker as LeafletMarker } from "react-leaflet";
import { useMarker } from "./Marker.hooks";

const Marker = ({ position, setPosition }: MapProps) => {
  const { markerRef, eventHandlers } = useMarker({ position, setPosition });

  return position ? (
    <LeafletMarker ref={markerRef} eventHandlers={eventHandlers} position={position} icon={MarkerIcon} />
  ) : null;
};

export default Marker;
