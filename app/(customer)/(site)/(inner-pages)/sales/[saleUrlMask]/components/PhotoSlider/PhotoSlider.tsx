import MobilePhotoSlider from "@/components/mobile/organisms/MobilePhotoSlider/MobilePhotoSlider";
import ProductPhotoSlider from "@/components/moleculas/sliders/ProductPhotoSlider/ProductPhotoSlider";
import { SaleDetails } from "../../model";

export const PhotoSlider = ({ sale }: { sale: SaleDetails }) => (
  <>
    <ProductPhotoSlider photos={sale.images} />
    <MobilePhotoSlider photos={sale.images?.map((image) => ({ image: image }))} className={"mt-5 mb-0"} showQuantity />
  </>
);
