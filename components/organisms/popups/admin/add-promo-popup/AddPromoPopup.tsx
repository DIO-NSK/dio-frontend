import {
    $bannerIdToEdit,
    createBannerFx,
    editBannerFx,
    RequestBanner,
    setBannerIdToEditEvent
} from "@/app/admin/promo/models/banner.model";
import Button from "@/components/atoms/buttons/button/Button";
import FileURLInput from "@/components/atoms/inputs/file-input/FileURLInput";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Text from "@/components/atoms/text/text-base/Text";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import Snackbar from "@/components/organisms/snackbar/Snackbar";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import { CreateBannerData, CreateBannerSchema } from "@/schemas/admin/CreateBannerSchema";
import { HeaderDescription } from "@/types/dto/text";
import { PopupProps } from "@/types/props/Popup";
import { WrapperProps } from "@/types/props/Wrapper";
import { cn } from "@/utlis/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUnit } from "effector-react";
import { useEffect, useState } from 'react';
import { FieldValues, Form, FormProvider, useForm, useFormContext } from "react-hook-form";

const blockCV = "w-full flex flex-col gap-4"

const repsonsiveImages = [
    { name: "mainImageUrl", header: "Для компьютеров", extension: "Размер 1045x436px" },
    { name: "imageUrlDto.tabletHorizontalImageUrl", header: "Для горизонтальных планшетов", extension: "Размер 556x290px" },
    { name: "imageUrlDto.tabletVerticalImageUrl", header: "Для вертикальных планшетов", extension: "Размер 475x277px" },
    { name: "imageUrlDto.mobileImageUrl", header: "Для телефонов", extension: "Размер 375x200px" },
]

interface ControlledFileInputProps {
    name: string;
    header: string;
    extension: string;
}

const ControlledFileInput = ({ name, header, extension }: ControlledFileInputProps) => {
    const methods = useFormContext();

    return (
        <div className="col-span-1 flex flex-col gap-2">
            <div className="w-full flex flex-row items-baseline justify-between">
                <Text text={header} />
                <Text text={extension} className="text-xs text-text-gray" />
            </div>
            {methods.getValues(name) ? (
                <AdminPhotoCard
                    canDelete={true}
                    onDelete={() => methods.setValue(name, null)}
                    name={name}
                    className={"w-full"}
                />
            ) : (
                <FileURLInput
                    onChange={(value) => methods.setValue(name, value)}
                    placeholder={"Выберите файл"}
                    className={"w-full"}
                />
            )}
        </div>
    )
}

const PopupBlock = ({ className, ...props }: Partial<HeaderDescription> & WrapperProps) => (
    <section className={blockCV}>
        <div className={"flex flex-col gap-4"}>
            <div className={"flex flex-col"}>
                {props.header ? <Text text={props.header} className={"text-[18px]"} /> : null}
                {props.description ? <Text text={props.description} className={"text-text-gray"} /> : null}
            </div>
            <div className={cn("w-full", className)}>
                {props.children}
            </div>
        </div>
    </section>
)

const AddPromoPopup = (props: PopupProps) => {

    const [reqStatus, setReqStatus] = useState<boolean>()
    const [editStatus, setEditStatus] = useState<boolean>()

    const [bannerIdToEdit, setBannerIdToEdit, createBanner, editBanner]
        = useUnit([$bannerIdToEdit, setBannerIdToEditEvent, createBannerFx, editBannerFx])

    const methods = useForm<CreateBannerData>({
        resolver: zodResolver(CreateBannerSchema),
        mode: "onSubmit"
    })

    const { watch, reset } = methods

    watch();

    const handleClose = () => {
        setBannerIdToEdit(null)
        props.onClose?.()
    }

    const onSubmit = (fieldValues: FieldValues) => {
        if (bannerIdToEdit) {
            editBanner({ ...fieldValues, id: bannerIdToEdit.id } as RequestBanner)
                .then(_ => setEditStatus(true))
                .then(_ => setBannerIdToEdit(null))
                .then(_ => props?.onClose?.())
                .catch(_ => setEditStatus(false))
        } else {
            createBanner(fieldValues as RequestBanner)
                .then(_ => setReqStatus(true))
                .then(_ => setBannerIdToEdit(null))
                .then(_ => props?.onClose?.())
                .catch(_ => setReqStatus(false))
        }
    }

    useEffect(() => {
        if (bannerIdToEdit) {
            reset(bannerIdToEdit)
        }
    }, []);

    return (
        <PopupWrapper onClose={handleClose}>
            <FormProvider {...methods}>
                <Snackbar
                    success={reqStatus === true}
                    header={reqStatus ? "Промо-баннер успешно создан!" : "Возникли ошибки при создании промо-баннера"}
                    message={reqStatus ? "Вы можете вернуться назад" : "Заполните все поля и попробуйте снова"}
                    open={reqStatus !== undefined}
                    action={handleClose}
                    onClose={handleClose}
                />
                <Snackbar
                    success={editStatus === true}
                    header={editStatus ? "Редактирование прошло успешно!" : "Возникли ошибки при редактировании"}
                    message={editStatus ? "Вы можете вернуться назад" : "Заполните все поля и попробуйте снова"}
                    open={editStatus !== undefined}
                    action={handleClose}
                    onClose={handleClose}
                />
                <Form className={"w-[800px] flex flex-col gap-5"}>
                    <Text text={"Новый промо-баннер"} className={"text-[20px] font-medium"} />
                    <PopupBlock
                        header={"Ссылка на товар"}
                        description={"Откройте страницу товара на сайте и скопируйте ссылку в адресной строке браузера"}
                    >
                        <ControlledTextInput name={"link"} placeholder={"Вставьте ссылку на товар"} />
                    </PopupBlock>
                    <PopupBlock header={"Фотография промо-акции"} className="grid grid-cols-2 gap-5">
                        {repsonsiveImages.map((item) => (
                            <ControlledFileInput {...item} />
                        ))}
                        {methods.formState.errors['imageUrlDto'] ? <Text className="text-info-red" text='Все фотографии должны быть загружены' /> : null} 
                    </PopupBlock>
                    <Button
                        text={"Добавить"}
                        disabled={methods.formState.isSubmitting}
                        onClick={methods.handleSubmit(onSubmit)}
                        classNames={{ button: "w-[250px]" }}
                    />
                </Form>
            </FormProvider>
        </PopupWrapper>
    );

};

export default AddPromoPopup;
