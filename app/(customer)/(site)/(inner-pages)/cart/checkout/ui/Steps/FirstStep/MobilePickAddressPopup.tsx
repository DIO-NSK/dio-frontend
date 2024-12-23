import {
  $userAddress,
  getAddressFx,
  selectUserAddressEvent,
} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/ui/Steps/FirstStep/model";
import Text from "@/components/atoms/Text/Text";
import Button from "@/components/atoms/buttons/button/Button";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import { Address } from "@/components/organisms/map/Map.types";
import { PopupProps } from "@/types/props/Popup";
import { SelectItem } from "@/types/props/SelectItem";
import { useUnit } from "effector-react";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const MobilePickAddressPopup = (props: PopupProps) => {
  const getUserAddresses = useUnit(getAddressFx);

  const [userAddresses, selectAddress] = useUnit([$userAddress, selectUserAddressEvent]);
  const [userAddress, setUserAddress] = useState<SelectItem<Address> | null>(null);

  const handleConfirmUserAddress = () => {
    selectAddress(userAddress!!);
    props.onClose?.();
  };

  useEffect(() => {
    getUserAddresses().then((items) => {
      const selectedItem = {
        name: items[0].address,
        value: items[0],
      } as SelectItem<Address>;

      setUserAddress(selectedItem);
    });
  }, []);

  return (
    <section className="-mt-7 flex flex-col gap-5">
      <HeaderRow
        rightContent={<FiX onClick={props.onClose} size={"20px"} />}
        header="Выберите существующий адрес"
        headerCN="text-lg"
      />
      <Text className="text-base text-text-gray">
        Выберите существующий адрес, чтобы не заполнять заново поля в форме адреса доставки
      </Text>
      <SelectInput width="w-full" items={userAddresses} onSelect={setUserAddress} selectedItem={userAddress} />
      <Button onClick={handleConfirmUserAddress}>Подтвердить</Button>
    </section>
  );
};

export default MobilePickAddressPopup;
