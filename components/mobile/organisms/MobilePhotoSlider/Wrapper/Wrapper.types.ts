import { WrapperProps } from "@/types/props/Wrapper";

export interface MobilePhotoSliderWrapperProps extends WrapperProps {
  onChange: (next: number) => void;
  showQuantity?: boolean;
  activeIndex: number;
}
