import { ControlledAddressBlock } from "@/components/organisms/address-block/ControlledAddressBlock";
import PickAddressPopup from "@/components/organisms/popups/checkout/PickAddressPopup";
import { useEffect, useState } from "react";
import { AddressDeliveryBlockProps } from "./AddressDeliveryBlock.types";

const MIN_SCREEN_WIDTH = 640;

export const AddressDeliveryBlock = ({ onOpenMobilePopup }: AddressDeliveryBlockProps) => {
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("");

  const handleSwitchPopupState = () => setPopupVisible(!isPopupVisible);

  const handleOpenPopup = () => {
    if (window.innerWidth >= MIN_SCREEN_WIDTH) {
      setPopupVisible(true);
    } else {
      onOpenMobilePopup();
    }
  };

  useEffect(() => {
    if (window.screen.width >= MIN_SCREEN_WIDTH) {
      setButtonText("Выбрать существующий");
    }
  }, []);

  return (
    <>
      {isPopupVisible && <PickAddressPopup onClose={handleSwitchPopupState} />}
      <ControlledAddressBlock buttonText={buttonText} onOpenPopup={handleOpenPopup} name={"address"} />
    </>
  );
};
