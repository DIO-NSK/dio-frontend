import Switch from "@/components/atoms/switch/Switch";
import ConnectForm from "@/components/organisms/forms/ConnectForm/ConnectForm";
import { Controller, FieldValues, UseFormReturn } from "react-hook-form";

const ControlledSwitch = ({ name }: { name: string }) => {
  return (
    <ConnectForm>
      {(methods: UseFormReturn<FieldValues, any, FieldValues>) => (
        <Controller
          render={({ field: { onChange, value } }) => <Switch isSelected={value} onSelect={() => onChange(!value)} />}
          control={methods.control}
          name={name}
        />
      )}
    </ConnectForm>
  );
};

export default ControlledSwitch;
