import React, {useState} from 'react';
import {AdminProduct} from "@/types/dto/AdminProduct";
import {AddPromoPopup} from "@/types/props/Popup";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import Button from "@/components/atoms/buttons/button/Button";
import {mockAdminProduct} from "@/data/tables/adminProductTable";

const OrderPageAddDayProductPopup = (props : AddPromoPopup<AdminProduct>) => {

    const [product, setProduct] = useState<string>("")
    const handleAddProduct = () => {
        props.onAddItem(mockAdminProduct)
        props.onClose && props.onClose()
    }

    return (
        <PopupWrapper {...props}>
            <div className={"w-[800px] flex flex-col gap-5"}>
                <Text text={"Добавить товар дня"} className={"text-[20px] font-medium"}/>
                <SearchInput
                    placeholder={"Введите название товара"}
                    onChange={setProduct}
                    value={product}
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
