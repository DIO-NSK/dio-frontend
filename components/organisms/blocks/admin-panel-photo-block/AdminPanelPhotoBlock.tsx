import React from 'react';
import HeaderDescrButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescrButtonRow";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import FileInput from "@/components/atoms/inputs/file-input/FileInput";

type AdminPanelPhotoBlockProps = {
    header ?: string,
    description ?: string,
    photos: File[],
    onAddPhoto: (file : File) => void,
    onDeletePhoto: (index: number) => void
}

const AdminPanelPhotoBlock = (props: AdminPanelPhotoBlockProps) => {
    return (
        <div className={"w-full mx-[-28px] px-7 flex flex-col gap-5 pb-7 border-b-2 border-light-gray"}>

            <HeaderDescrButtonRow
                header={props.header ?? "Фотографии товара"}
                descr={props.description ?? `Первая фотография в списке будет являться обложкой для карточки товара.
                        Порядок расположения фотографий будет влиять на отображение фотографий в карточке продукта.`}
            />

            <div className={"w-full grid grid-cols-3 gap-7"}>
                {
                    props.photos.map((photo, index) =>
                        <AdminPhotoCard
                            key={index} file={photo}
                            onDelete={() => props.onDeletePhoto(index)}
                        />
                    )
                }
                <FileInput
                    onChange={props.onAddPhoto}
                    placeholder={"Выберите файл"}
                    className={"col-span-1"}
                />
            </div>

        </div>
    );
};

export default AdminPanelPhotoBlock;
