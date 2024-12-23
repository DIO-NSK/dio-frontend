import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import ConnectForm from "@/components/organisms/forms/ConnectForm/ConnectForm";
import { Controller, FieldValues, Path } from "react-hook-form";

type ControlledSearchInputProps<T extends FieldValues> = {
  placeholder: string;
  name: Path<T>;
};

const ControlledSearchInput = <T extends FieldValues>(props: ControlledSearchInputProps<T>) => {
  return (
    <ConnectForm>
      {(methods) => (
        <Controller
          control={methods.control}
          name={props.name}
          render={({ field: { onChange, value } }) => (
            <SearchInput
              placeholder={props.placeholder}
              value={value}
              onSelect={onChange}
              onChange={onChange}
              hasPopover
            />
          )}
        />
      )}
    </ConnectForm>
  );
};

export default ControlledSearchInput;
