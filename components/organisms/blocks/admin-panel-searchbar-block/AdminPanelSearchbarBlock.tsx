import React, {useEffect, useState} from 'react';
import AdminPanelBlockWrapper from "@/components/wrappers/admin-panel-block-wrapper/AdminPanelBlockWrapper";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import DraggableRowWrapper from "@/components/wrappers/draggable-row-wrapper/DraggableRowWrapper";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {useUnit} from "effector-react";
import {searchCatalogByNameEvent} from "@/components/organisms/bars/searchbar/model";
import {useFormContext} from "react-hook-form";
import {CreateSaleData} from "@/schemas/admin/CreateSaleSchema";

type AdminPanelSearchbarBlockProps = {
    header: string,
    description: string
}

type ProductIdRow = {
    quantity: string,
    product?: ResponseProductSearch
}

const AdminPanelSearchbarBlock = (props: AdminPanelSearchbarBlockProps) => {

    const {getValues, setValue, watch} = useFormContext<CreateSaleData>()

    const getCatalogueByName = useUnit(searchCatalogByNameEvent)

    const [selectedNames, updateNames] = useState<string[]>([])
    const [productRows, updateProductRows] = useState<ProductIdRow[]>([])

    const updateName = (index: number, newName: string) => {
        getCatalogueByName(newName)
        updateNames(names => names.map((name, idx) => index === idx ? newName : name))
    }

    const updateSelectItem = (index: number, value: ResponseProductSearch | undefined) => {
        const product = productRows.find((_, idx) => idx === index)!!
        if (value) {
            if (product && !product.product) {
                const updatedProduct: ProductIdRow = {...product, product: value}
                updateProductRows(productRows => productRows.with(index, updatedProduct))
                updateNames(names => names.with(index, value.name))
            }
        } else {
            delete product["product"]
            updateProductRows(products => products.with(index, product as ProductIdRow))
        }
    }

    const handleAddProductRow = () => {
        updateProductRows(productRows => [...productRows, {quantity: ""}])
        updateNames(names => [...names, ""])
    }

    const handleRemoveProductRow = (index: number) => {
        const filterFn = (_: any, idx: number) => idx !== index
        updateProductRows(productRows => productRows.filter(filterFn))
        updateNames(names => names.filter(filterFn))
    }

    useEffect(() => {
        productRows.forEach((item, index) => {
            if (item.product) {
                setValue(`productIdList.${index}.productId`, item.product.id.toString())
            }
        })
    }, [productRows]);

    return (
        <AdminPanelBlockWrapper className={"mx-0 px-7"}>
            <HeaderDescriptionButtonRow
                header={props.header}
                descr={props.description}
                button={
                    <Button
                        onClick={handleAddProductRow}
                        classNames={{button: "h-fit"}}
                        icon={<FiPlus size={"18px"}/>}
                        buttonType={"SECONDARY"}
                        text={"Добавить ещё"}
                        size={"sm"}
                    />
                }
            />
            <section className={"w-full flex flex-col gap-5"}>
                {productRows.map((productRow, index) =>
                    <DraggableRowWrapper
                        onDelete={() => handleRemoveProductRow(index)}
                        className={"w-full flex flex-row gap-5"}
                        key={index}
                    >
                        <SearchInput
                            onSelect={(product) => updateSelectItem(index, product)}
                            value={selectedNames[index]} onChange={(name) => updateName(index, name)}
                            placeholder={"Введите название товара"} key={index} hasPopover
                            selectedElement={productRow.product}
                        />
                        <ControlledTextInput
                            placeholder={"Укажите количество товара"}
                            name={`productIdList.${index}.quantity`}
                        />
                    </DraggableRowWrapper>
                )}
            </section>
        </AdminPanelBlockWrapper>
    );

};

export default AdminPanelSearchbarBlock;
