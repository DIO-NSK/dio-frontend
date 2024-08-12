import ConnectForm from "@/components/organisms/forms/connect-form/ConnectForm";
import {Controller} from "react-hook-form";
import {AddressBlock, AddressBlockProps} from "@/components/organisms/address-block/AddressBlock";

interface ControlledAddressBlockProps extends Pick<AddressBlockProps, 'onOpenPopup' | 'buttonText'> {
    name: string;
}

export const ControlledAddressBlock = ({name, buttonText, onOpenPopup}: ControlledAddressBlockProps) => (
    <ConnectForm>
        {({control}) => (
            <Controller
                control={control}
                name={name}
                render={({field : { onChange, value }}) => (
                    <AddressBlock
                        location={value}
                        buttonText={buttonText}
                        onOpenPopup={onOpenPopup}
                        onChange={onChange}
                    />
                )}
            />
        )}
    </ConnectForm>
)