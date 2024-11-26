import { COLOR } from "@/components/colors";
import { Image } from "@chakra-ui/react";
import { PhotoCardProps } from "./PhotoCard.types";

export const PhotoCard = ({ photo, isActive, setActive }: PhotoCardProps) => (
  <Image
    className={"h-[100px] w-full rounded-xl border-light-gray object-scale-down border-[2px] hover:pointer"}
    borderColor={isActive ? COLOR["light-gray"] : COLOR["white"]}
    onClick={() => setActive(photo)}
    src={photo}
    alt=""
  />
);
