import { ResponseCustomerBanner } from "@/app/(customer)/(site)/page.hooks";
import { PropsWithClassName } from "@/types/props/utils/PropsWithClassName";

export type DefaultPhoto = { image: string; link?: string };
export type Photo = DefaultPhoto | ResponseCustomerBanner;

export type MobilePhotoSliderProps = PropsWithClassName<{
  showQuantity?: boolean;
  photos: Photo[];
}>;
