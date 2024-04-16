import React, {useEffect} from 'react';
import {PopupProps} from "@/types/props/Popup";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import {FieldValues, Form, FormProvider, useForm} from "react-hook-form";
import {CreateBannerData, CreateBannerSchema} from "@/schemas/admin/CreateBannerSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUnit} from "effector-react";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import FileInput from "@/components/atoms/inputs/file-input/FileInput";
import {HeaderDescription} from "@/types/dto/text";
import {WrapperProps} from "@/types/props/Wrapper";
import {createBannerFx, RequestBanner} from "@/app/admin/promo/model";

const blockCV = "w-full flex flex-col gap-4"

const PopupBlock = (props : HeaderDescription & WrapperProps) => (
    <section className={blockCV}>
        <div className={"flex flex-col gap-4"}>
            <div className={"flex flex-col"}>
                <Text text={props.header} className={"text-[18px]"}/>
                <Text text={props.description} className={"text-text-gray"}/>
            </div>
            {props.children}
        </div>
    </section>
)

const AddPromoPopup = (props: PopupProps) => {

    const createBanner = useUnit(createBannerFx)
    const methods = useForm<CreateBannerData>({
        resolver: zodResolver(CreateBannerSchema),
        mode : "onBlur"
    })

    const {watch} = methods

    const onSubmit = (fieldValues: FieldValues) => {
        createBanner(fieldValues as RequestBanner)
            .then(props.onClose)
    }

    useEffect(() => {
        console.log(methods.formState.errors)
    }, [methods.formState.errors]);

    console.log(watch())

    return (
        <PopupWrapper {...props}>
            <FormProvider {...methods}>
                <Form className={"w-[800px] flex flex-col gap-5"}>
                    <Text text={"Новая промо-акция"} className={"text-[20px] font-medium"}/>
                    <PopupBlock
                        header={"Ссылка на товар"}
                        description={"Откройте страницу товара на сайте и скопируйте ссылку в адресной строке браузера"}
                    >
                        <ControlledTextInput name={"link"} placeholder={"Вставьте ссылку на товар"}/>
                    </PopupBlock>
                    <PopupBlock
                        header={"Фотография промо-акции"}
                        description={"Данная фотография будет отображаться в первом блоке на главном странице сайта"}
                    >
                        {methods.getValues("image") ? (
                            <AdminPhotoCard
                                onDelete={() => methods.setValue("image", null)}
                                name={"image"}
                                className={"w-full"}
                            />
                        ) : (
                            <FileInput
                                onChange={(value) => methods.setValue("image", value)}
                                placeholder={"Выберите файл"}
                                className={"w-full"}
                            />
                        )}
                    </PopupBlock>
                    <Button
                        text={"Добавить"}
                        disabled={methods.formState.isSubmitting}
                        onClick={methods.handleSubmit(onSubmit)}
                        classNames={{button: "w-[250px]"}}
                    />
                </Form>
            </FormProvider>
        </PopupWrapper>
    );

};

export default AddPromoPopup;
