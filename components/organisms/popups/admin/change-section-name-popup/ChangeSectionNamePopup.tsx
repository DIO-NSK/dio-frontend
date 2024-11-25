import { editSectionEvent, onCloseSectionToEditEvent } from "@/app/admin/catalog/model";
import Text from "@/components/atoms/Text/Text";
import Button from "@/components/atoms/buttons/button/Button";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import { TableItemPopup } from "@/types/props/Popup";
import { useUnit } from "effector-react";
import { useState } from "react";

const ChangeSectionNamePopup = (props: TableItemPopup<string[]>) => {
  const [editSection, onCloseSectionToEdit] = useUnit([editSectionEvent, onCloseSectionToEditEvent]);

  const [sectionName, setSectionName] = useState<string>("");

  const handleSubmit = () => {
    // editSection({sectionId: props.tableRow.id, newName: sectionName as any})
    onCloseSectionToEdit();
  };

  return (
    <PopupWrapper placement={"center"} {...props}>
      <div className={"w-[400px] flex flex-col gap-5"}>
        <Text text={"Изменить название"} className={"text-[20px] font-medium"} />
        <Text
          text={"Будьте осторожны, новое название применится ко всем разделам сайта"}
          className={"text-text-gray"}
        />
        <TextInput
          labelText={"Название раздела"}
          placeholder={props.tableRow.item[0]}
          value={sectionName}
          onChange={setSectionName}
        />
        <Button text={"Подтвердить"} onClick={handleSubmit} />
      </div>
    </PopupWrapper>
  );
};

export default ChangeSectionNamePopup;
