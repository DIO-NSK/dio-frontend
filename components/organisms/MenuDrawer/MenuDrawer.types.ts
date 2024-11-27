import { PropsWithChildren } from "react";

export interface DrawerProps extends PropsWithChildren {
  onClose: () => void;
  isOpen: boolean;
}
