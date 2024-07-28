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
import {ResponseCartItem} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {closestCenter, DndContext, DragEndEvent} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import SortableItemWrapper from "@/components/wrappers/sortable-wrapper/SortableItemWrapper";
import {swap} from "@/components/organisms/blocks/admin-panel-searchbar-block/AdminPanelSearchBlock.utils";

type AdminPanelSearchbarBlockProps = {
    header: string,
    description: string,
    defaultProducts?: ResponseCartItem[]
}

type ProductIdRow = {
    quantity: string,
    product?: ResponseProductSearch
}

const AdminPanelSearchbarBlock = (props: AdminPanelSearchbarBlockProps) => {

    const {setValue} = useFormContext<CreateSaleData>()
    const getCatalogueByName = useUnit(searchCatalogByNameEvent)

    const defaultSelectedNames = props.defaultProducts?.map(product => product.name) ?? []
    const defaultProductIdRows = props.defaultProducts?.map(product => ({
        product: {
            ...product,
            id: product.productId
        } as any, quantity: String(product.quantity)
    })) as ProductIdRow[] ?? []

    const [selectedNames, updateNames] = useState<string[]>(defaultSelectedNames);
    const [productRows, updateProductRows] = useState<ProductIdRow[]>(defaultProductIdRows);

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

    const handleChangeOrder = (event: DragEndEvent) => {
        const {active, over} = event;

        if (active.id !== over?.id) {
            const oldIndex = productRows.findIndex((item, index) => item.product?.id === active.id);
            const newIndex = productRows.findIndex((item, index) => item.product?.id === over?.id);
            const newProductRows = arrayMove(productRows, oldIndex, newIndex);

            updateProductRows(newProductRows);
        }
    }

    useEffect(() => console.log(productRows), [productRows]);

    const handleAddProductRow = () => {
        updateProductRows(productRows => [...productRows, {quantity: ""}])
        updateNames(names => [...names, ""])
    }

    const handleRemoveProductRow = (index: number) => {
        const filterFn = (_: any, idx: number) => idx !== index
        const filteredProductRows = productRows.filter(filterFn);

        updateProductRows(filteredProductRows);
        updateNames(names => names.filter(filterFn))

        setValue(`productIdList`, filteredProductRows.map(row => ({
            productId: row.product!!.id.toString(),
            quantity: row.quantity
        })));
    }

    useEffect(() => {
        productRows.forEach((item, index) => {
            if (item?.product) {
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
                <DndContext
                    onDragEnd={handleChangeOrder}
                    collisionDetection={closestCenter}
                >
                    <SortableContext
                        items={productRows.map((item, index) => item.product?.id as number)}
                        strategy={verticalListSortingStrategy}
                    >
                        {productRows.map((productRow, index) =>
                            <SortableItemWrapper
                                sequenceNumber={productRow.product?.id as number}
                                key={productRow.product?.id}
                            >
                                <DraggableRowWrapper
                                    onDelete={() => handleRemoveProductRow(index)}
                                    className={"w-full flex flex-row gap-5"}
                                >
                                    <SearchInput
                                        onSelect={(product) => updateSelectItem(index, product)}
                                        value={selectedNames[index]} onChange={(name) => updateName(index, name)}
                                        placeholder={"Введите название товара"} hasPopover
                                        selectedElement={productRow?.product}
                                    />
                                    <ControlledTextInput
                                        placeholder={"Укажите количество товара"}
                                        name={`productIdList.${index}.quantity`}
                                    />
                                </DraggableRowWrapper>
                            </SortableItemWrapper>
                        )}
                    </SortableContext>
                </DndContext>
            </section>
        </AdminPanelBlockWrapper>
    );

};

export default AdminPanelSearchbarBlock;
