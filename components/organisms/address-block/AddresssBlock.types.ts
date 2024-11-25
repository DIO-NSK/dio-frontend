import { Address } from "../map/Map.types";

export interface AddressBlockProps {
  buttonText: string;
  onOpenPopup: () => void;
  onChange: (address: Address) => void;
  location: Address;
  error?: string;
}
