import React from 'react';
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import FileInput from "@/components/atoms/inputs/file-input/FileInput";
import {useFieldArray, useFormContext} from "react-hook-form";

type AdminPanelPhotoBlockProps = {
    header?: string,
    description?: string,
    editMode?: boolean,
    blockName?: string
}

const AdminPanelPhotoBlock = ({blockName = "photos", ...props}: AdminPanelPhotoBlockProps) => {

    const {control} = useFormContext()
    const {fields, append, remove,} = useFieldArray({
        control, name: blockName
    })

    return (
        <div className={"w-full mx-[-28px] px-7 flex flex-col gap-5 pb-7 border-b-2 border-light-gray"}>
            <HeaderDescriptionButtonRow
                header={props.header ?? "Фотографии товара"}
                descr={props.description ?? `Первая фотография в списке будет являться обложкой для карточки товара.
                        Порядок расположения фотографий будет влиять на отображение фотографий в карточке продукта.`}
            />
            <div className={"w-full grid grid-cols-3 gap-7"}>
                {fields.map((item, index) =>
                    <AdminPhotoCard
                        canDelete
                        onDelete={() => remove(index)}
                        name={`${blockName}.${index}`}
                        key={item.id} {...props}
                    />
                )}
                <FileInput
                    onChange={append}
                    placeholder={"Выберите файл"}
                    className={"col-span-1"}
                />
            </div>
        </div>
    );
};

export default AdminPanelPhotoBlock;
