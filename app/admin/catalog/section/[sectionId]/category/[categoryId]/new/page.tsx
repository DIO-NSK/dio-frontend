"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import AdminPanelCharBlock from "@/components/organisms/blocks/admin-panel-char-block/AdminPanelCharBlock";
import ControlledTextArea from "@/components/atoms/inputs/controlled-text-area/ControlledTextArea";
import AdminPanelPhotoBlock from "@/components/organisms/blocks/admin-panel-photo-block/AdminPanelPhotoBlock";
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import Button from "@/components/atoms/buttons/button/Button";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateProductData, CreateProductSchema} from "@/schemas/admin/CreateProductSchema";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import Form from "@/components/atoms/form/Form";
import ControlledSwitch from "@/components/atoms/switch/ControlledSwitch";
import {useUnit} from "effector-react";
import {useRouter} from "next/navigation";
import {
    $createProductError,
    createProductFx
} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/new/model";
import Text from "@/components/atoms/text/text-base/Text";
import AdminPanelProductInputGrid
    from "@/components/organisms/blocks/admin-panel-product-input-grid/AdminPanelProductInputGrid";

const productOfTheDayDescription: string =
    `Если чекбокс включён, то данный товар будет отображаться
     в каталоге с уникальным тегом «Товар дня»`

const textAreaDescription: string = "Придумайте привлекающее описание товара. Идеальная длина описания — 3 предложения."

const AdminPanelNewProductPage = ({params}: {
    params: {
        categoryId: number,
        sectionId: number
    }
}) => {

    const router = useRouter()
    const [createProduct, createError] = useUnit([createProductFx, $createProductError])

    const methods = useForm<CreateProductData>({
        resolver: zodResolver(CreateProductSchema),
        mode: "onBlur"
    })

    const {handleSubmit, formState: {isSubmitting}} = methods

    const onSubmit = (formData: FieldValues) => createProduct({
        categoryId: params.categoryId,
        productData: formData as CreateProductData
    })
        .then(_ => router.back())
        .catch(e => e)

    return (
        <>
            <HeaderRow
                className={"w-full"}
                theme={"bordered"}
                header={"Новый товар"}
                hasBackIcon
            />
            <FormProvider {...methods}>
                <Form>
                    <AdminPanelProductInputGrid/>
                    <AdminPanelCharBlock blockName={"filledProperties"}/>
                    <ControlledTextArea
                        labelText={"Описание товара"}
                        placeholder={textAreaDescription}
                        name={"description"}
                        classNames={{
                            wrapper: "w-full mx-[-28px] px-7 pb-7 border-b-2 border-light-gray",
                            input: "min-h-[150px] max-h-[300px]"
                        }}
                    />
                    <AdminPanelPhotoBlock/>
                    <HeaderDescriptionButtonRow
                        className={"mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"}
                        button={<ControlledSwitch name={"isProductOfTheDay"}/>}
                        descr={productOfTheDayDescription}
                        header={"Товар дня"}
                    />
                    <div className={"flex flex-row gap-5 items-center"}>
                        <Button
                            text={isSubmitting ? "Отправка.." : "Сохранить"}
                            disabled={isSubmitting}
                            onClick={handleSubmit(onSubmit)}
                            classNames={{button: "w-[250px]"}}
                        />
                        {
                            createError && <Text
                                className={"text-info-red"}
                                text={createError}
                            />
                        }
                    </div>

                </Form>
            </FormProvider>
        </>
    );

};

export default AdminPanelNewProductPage;
