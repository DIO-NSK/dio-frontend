"use client";

import { useResponsiveImage } from "@/utlis/hooks/useResponsiveImage";
import { Image } from "@chakra-ui/react";
import Link from "next/link";
import { BannerCardProps } from "./BannerCard.types";

export const BannerCard = ({ banner }: BannerCardProps) => {
  const image = useResponsiveImage(banner);

  return (
    <Link href={banner.link}>
      <Image src={image} objectFit="cover" w="full" h="full" alt="" />
    </Link>
  );
};
