import { ResponseProfileOrder } from "@/types/dto/user/order/ResponseProfileOrder";

export interface FooterProps {
  setOpen: (isOpen: boolean) => void;
  order: ResponseProfileOrder;
  canRepeat: boolean;
  isOpen: boolean;
}
