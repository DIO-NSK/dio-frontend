"use client";

import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { MainPhotoCard } from "./MainPhotoCard/MainPhotoCard";
import { PhotoSlider } from "./PhotoSlider/PhotoSlider";

const ProductPhotoSlider = ({ photos }: { photos: string[] }) => {
  const [activePhoto, setActivePhoto] = useState<string>();

  return (
    <VStack w="full" gap="20px" className="hidden md:flex md:col-start-1 md:col-span-full xl:col-span-5">
      <MainPhotoCard photo={activePhoto} />
      <PhotoSlider photos={photos} activePhoto={activePhoto} setActive={setActivePhoto} />
    </VStack>
  );
};

export default ProductPhotoSlider;
