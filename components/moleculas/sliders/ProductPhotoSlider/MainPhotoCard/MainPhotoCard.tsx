import { cn } from "@/utlis/cn";
import { Image } from "@chakra-ui/react";
import { imageCV } from "./MainPhotoCard.styles";

export const MainPhotoCard = ({ photo }: { photo?: string }) => (
  <Image className={cn(imageCV)} src={photo} alt="Изображение продукта" />
);
