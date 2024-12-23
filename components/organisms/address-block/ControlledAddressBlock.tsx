import { AddressBlock } from "@/components/organisms/address-block/AddressBlock";
import ConnectForm from "@/components/organisms/forms/ConnectForm/ConnectForm";
import { Controller, FieldError } from "react-hook-form";
import { AddressBlockProps } from "./AddresssBlock.types";

interface ControlledAddressBlockProps extends Pick<AddressBlockProps, "onOpenPopup" | "buttonText"> {
  name: string;
}

const getError = (fieldError: FieldError | undefined): string | undefined => {
  const error = fieldError as any;

  return error?.address?.message || error?.flat?.message || error?.city?.messsage || error?.house?.message;
};

export const ControlledAddressBlock = ({ name, buttonText, onOpenPopup }: ControlledAddressBlockProps) => (
  <ConnectForm>
    {({ control, formState: { errors } }) => (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <AddressBlock
            location={value}
            buttonText={buttonText}
            onOpenPopup={onOpenPopup}
            onChange={onChange}
            error={getError(error)}
          />
        )}
      />
    )}
  </ConnectForm>
);
