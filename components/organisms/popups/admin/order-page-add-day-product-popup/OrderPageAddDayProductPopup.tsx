import React, {useEffect, useState} from 'react';
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import Button from "@/components/atoms/buttons/button/Button";
import {PopupProps} from "@/types/props/Popup";
import {useUnit} from "effector-react";
import {searchCatalogByNameEvent} from "@/components/organisms/bars/searchbar/model";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import {addDayProductsEvent} from "@/app/admin/promo/models/day_products.model";

const OrderPageAddDayProductPopup = (props: PopupProps) => {

    const [getCatalogueByName, createProduct] = useUnit([searchCatalogByNameEvent, addDayProductsEvent])

    const [nameToSearch, setNameToSearch] = useState<string>('')
    const [selectedProduct, selectProduct] = useState<ResponseProductSearch | undefined>(undefined)

    const updateProducts = (name: string) => {
        getCatalogueByName(name)
        setNameToSearch(name)
    }

    const handleAddProduct = () => {
        if (selectedProduct) {
            createProduct(selectedProduct?.id)
            props.onClose?.()
        }
    }

    useEffect(() => {
        if (selectedProduct) {
            setNameToSearch(selectedProduct.name)
        }
    }, [selectedProduct]);

    return (
        <PopupWrapper {...props}>
            <div className={"w-[800px] flex flex-col gap-5"}>
                <Text text={"Добавить товар дня"} className={"text-[20px] font-medium"}/>
                <SearchInput
                    onSelect={selectProduct}
                    value={nameToSearch}
                    onChange={updateProducts}
                    placeholder={"Введите название товара"}
                    selectedElement={selectedProduct}
                    hasPopover
                />
                <Button
                    text={"Добавить"}
                    onClick={handleAddProduct}
                    classNames={{button: "w-[250px]"}}
                />
            </div>
        </PopupWrapper>
    );

};

export default OrderPageAddDayProductPopup;
