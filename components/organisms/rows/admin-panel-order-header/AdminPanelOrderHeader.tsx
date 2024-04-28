import React from 'react';
import Button from "@/components/atoms/buttons/button/Button";
import {FiSliders} from "react-icons/fi";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import OrderPageFilterPopup from "@/components/organisms/popups/admin/order-page-filter-popup/OrderPageFilterPopup";
import {useToggle} from "@/utlis/hooks/useToggle";

const AdminPanelOrderHeader = () => {

    const orderPopup = useToggle()

    return (
        <React.Fragment>
            {orderPopup.state && <OrderPageFilterPopup
                onClose={orderPopup.toggleState}
            />}
            <section className={"w-full mx-[-28px] px-7 flex flex-row gap-5"}>

                <Button
                    icon={<FiSliders size={"18px"}/>}
                    text={"Применить фильтры"}
                    onClick={orderPopup.toggleState}
                />

                <SearchInput
                    placeholder={"Поиск заказов"}
                    value={""}
                    onChange={() => console.log("Searching..")}
                />

            </section>
        </React.Fragment>
    );

};

export default AdminPanelOrderHeader;
