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
import { zodResolver } from "@hookform/resolvers/zod";
import { useUnit } from "effector-react";
import { useEffect, useState } from 'react';
import { FieldValues, Form, FormProvider, useForm } from "react-hook-form";

const blockCV = "w-full flex flex-col gap-4"

const PopupBlock = (props: HeaderDescription & WrapperProps) => (
    <section className={blockCV}>
        <div className={"flex flex-col gap-4"}>
            <div className={"flex flex-col"}>
                <Text text={props.header} className={"text-[18px]"} />
                <Text text={props.description} className={"text-text-gray"} />
            </div>
            {props.children}
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

    console.log(watch())

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
                    <PopupBlock
                        header={"Фотография промо-баннера"}
                        description={"Данная фотография будет отображаться в первом блоке на главном странице сайта"}
                    >
                        {methods.getValues("mainImageUrl") ? (
                            <AdminPhotoCard
                                canDelete
                                onDelete={() => methods.setValue("mainImageUrl", null)}
                                name={"imageUrl"}
                                className={"w-full"}
                            />
                        ) : (
                            <FileURLInput
                                onChange={(value) => methods.setValue("mainImageUrl", value)}
                                placeholder={"Выберите файл"}
                                className={"w-full"}
                            />
                        )}
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
