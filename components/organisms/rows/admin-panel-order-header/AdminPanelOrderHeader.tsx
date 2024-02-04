import React, {useState} from 'react';
import Button from "@/components/atoms/buttons/button/Button";
import {FiSliders} from "react-icons/fi";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import {useSearchbar} from "@/components/organisms/bars/searchbar/Searchbar.hooks";
import OrderPageFilterPopup from "@/components/organisms/popups/admin/order-page-filter-popup/OrderPageFilterPopup";

const AdminPanelOrderHeader = () => {

    const {...searchbarContext} = useSearchbar()
    const [isPopupOpen, setPopupOpen] = useState<boolean>(false)

    const handleSwitchPopup = () => setPopupOpen(!isPopupOpen)

    return (
        <React.Fragment>
            {
                isPopupOpen && <OrderPageFilterPopup
                    onClose={handleSwitchPopup}
                />
            }
            <section className={"w-full mx-[-28px] px-7 flex flex-row gap-5"}>

                <Button
                    icon={<FiSliders size={"18px"}/>}
                    text={"Применить фильтры"}
                    onClick={handleSwitchPopup}
                />

                <SearchInput
                    placeholder={"Поиск заказов"}
                    value={searchbarContext.searchbar.searchbarValue}
                    onChange={searchbarContext.searchbar.setSearchbarValue}
                />

            </section>
        </React.Fragment>
    );

};

export default AdminPanelOrderHeader;
