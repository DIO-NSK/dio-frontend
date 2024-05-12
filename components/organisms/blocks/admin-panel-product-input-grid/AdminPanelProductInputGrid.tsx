import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import React, {useEffect} from "react";
import {InputPrefilledData} from "@/types/props/inputs/InputPrefilledData";
import ControlledMultiSelectButton from "@/components/atoms/buttons/multiselect-button/ControlledMultiSelectButton";
import {priceTypeItems} from "@/schemas/admin/CreateProductSchema";
import {cn} from "@/utlis/cn";
import {useFormContext} from "react-hook-form";
import {$productDetails} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/new/model";
import {useUnit} from "effector-react";

const inputRowCN: string = "px-7 w-full grid grid-cols-3 gap-7 pb-7 border-b-2 border-light-gray"

const AdminPanelProductInputGrid = ({hasPriceToggle = true}: { hasPriceToggle?: boolean }) => {

    const productDetails = useUnit($productDetails)
    const methods = useFormContext()

    const productInputGrid: InputPrefilledData[] = [
        {
            labelText: "Название товара",
            placeholder: "Введите название товара",
            name: "name"
        }, {
            labelText: "Цена товара",
            placeholder: "Введите цену товара",
            readOnly: true,
            name: "price"
        }, {
            labelText: "Скидка",
            placeholder: "Введите скидку на товар",
            numbersOnly: true,
            name: "discountPercent"
        }
    ]

    useEffect(() => {
        if (methods.getValues('priceType') && hasPriceToggle) {
            console.log(methods.getValues('priceType'))
            const res = methods.getValues('priceType').value === 'unit'
            methods.setValue('price', res ? productDetails?.price : productDetails?.pricePackage)
        }
    }, [methods.watch('priceType')]);

    useEffect(() => {
        if (hasPriceToggle) {
            methods.reset({priceType: priceTypeItems[0]})
        }
    }, []);

    console.log(methods.watch())

    return (
        <React.Fragment>
            <section className={inputRowCN}>
                {productInputGrid
                    .map((inputData, inputIndex) => {
                        return <ControlledTextInput
                            readonly={inputData.readOnly}
                            classNames={{wrapper: `col-span-1`}}
                            key={inputIndex} {...inputData}
                        />
                    })}
            </section>
            <section className={cn(inputRowCN, "items-end")}>
                <ControlledTextInput
                    classNames={{wrapper: 'col-span-1'}}
                    labelText={"Размер НДС"}
                    name={"taxPercent"}
                    placeholder={"20"}
                    readonly={true}
                />
                {
                    productDetails?.pricePackage && hasPriceToggle ?
                        <ControlledMultiSelectButton
                            className={'col-span-1 h-[70px] align-bottom'}
                            items={priceTypeItems}
                            name={"priceType"}
                        /> : null
                }
            </section>
        </React.Fragment>

    )

}

export default AdminPanelProductInputGrid