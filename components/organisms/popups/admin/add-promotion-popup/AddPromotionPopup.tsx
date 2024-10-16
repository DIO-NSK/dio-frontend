import {
    $editPromotionStatus,
    $promotionToEdit,
    createPromotionFx,
    editPromotionEvent,
    RequestPromotion,
    setPromotionToEditEvent
} from "@/app/admin/promo/models/promotion.model";
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

const AddPromotionPopup = (props: PopupProps) => {

    const editPromotionStatus = useUnit($editPromotionStatus)
    const [createStatus, setCreateStatus] = useState<boolean | undefined>(undefined)

    const [promotionToEdit, setPromotionToEdit, createPromotion, editPromotion]
        = useUnit([$promotionToEdit, setPromotionToEditEvent, createPromotionFx, editPromotionEvent])

    const methods = useForm<CreateBannerData>({
        resolver: zodResolver(CreateBannerSchema),
        mode: "onSubmit"
    })

    const { reset } = methods

    console.log(methods.watch())

    const handleClose = () => {
        setPromotionToEdit(null)
        props.onClose?.()
    }

    const onSubmit = (fieldValues: FieldValues) => {
        if (promotionToEdit) {
            editPromotion({ ...fieldValues, id: promotionToEdit.id } as RequestPromotion)
        } else {
            createPromotion(fieldValues as RequestPromotion)
                .then(_ => setCreateStatus(true))
                .then(_ => setPromotionToEdit(null))
                .catch(_ => setCreateStatus(false))
        }
    }

    useEffect(() => {
        if (promotionToEdit) {
            reset(promotionToEdit)
        }
    }, []);

    return (
        <PopupWrapper onClose={handleClose}>
            <FormProvider {...methods}>
                <Snackbar
                    success={createStatus === true}
                    header={createStatus ? "Промо-акция успешно создан!" : "Возникли ошибки при создании промо-акции"}
                    message={createStatus ? "Вы можете вернуться назад" : "Заполните все поля и попробуйте снова"}
                    open={createStatus !== undefined}
                    onClose={handleClose}
                    action={handleClose}
                />
                <Snackbar
                    success={editPromotionStatus === true}
                    header={editPromotionStatus ? "Промо-акция отредактирована успешо!" : "Возникли ошибки при редактировании промо-акции"}
                    message={editPromotionStatus ? "Вы можете вернуться назад" : "Заполните все поля и попробуйте снова"}
                    open={editPromotionStatus !== null}
                    action={handleClose}
                    onClose={handleClose}
                />
                <Form className={"w-[800px] flex flex-col gap-5"}>
                    <Text text={"Новая "} className={"text-[20px] font-medium"} />
                    <PopupBlock
                        header={"Ссылка на акцию"}
                        description={"Откройте страницу акции на сайте и скопируйте ссылку в адресной строке браузера"}
                    >
                        <ControlledTextInput name={"link"} placeholder={"Вставьте ссылку на акцию"} />
                    </PopupBlock>
                    <PopupBlock header={"Фотография промо-акции"} className="grid grid-cols-2 gap-5">
                        {repsonsiveImages.map((item) => (
                            <ControlledFileInput {...item} />
                        ))}
                        {methods.formState.errors['imageUrlDto'] ? <Text className="text-info-red" text='Все фотографии должны быть загружены' /> : null} 
                    </PopupBlock>
                    <Button
                        text={promotionToEdit ? "Редактировать" : "Добавить"}
                        disabled={methods.formState.isSubmitting}
                        onClick={methods.handleSubmit(onSubmit)}
                        classNames={{ button: "w-[250px]" }}
                    />
                </Form>
            </FormProvider>
        </PopupWrapper>
    );

};

export default AddPromotionPopup;
