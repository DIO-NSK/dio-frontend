import React, {useEffect} from 'react';
import Button from "@/components/atoms/buttons/button/Button";
import {FiSliders} from "react-icons/fi";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import OrderPageFilterPopup from "@/components/organisms/popups/admin/order-page-filter-popup/OrderPageFilterPopup";
import {useToggle} from "@/utlis/hooks/useToggle";
import {useUnit} from "effector-react";
import {
    $savedFilters,
    $savedPriceRange,
    savePriceRangeEvent
} from "@/components/organisms/popups/admin/order-page-filter-popup/model";
import {$orders} from "@/app/admin/orders/model";
import {AdminOrderTableRow} from "@/types/dto/Table";
import {OrderFilterData} from "@/schemas/admin/OrderFiltersSchema";

const getTotalOrderPrice = (order: AdminOrderTableRow) => {
    return order.item.products.reduce((acc, item) => acc + item.price * item.quantity, 0)
}
const filterOrderByPrice = (orders: AdminOrderTableRow[], fn: (fst: number, snd: number) => boolean) => {
    return orders.reduce((acc, order) => fn(acc, getTotalOrderPrice(order)) ? getTotalOrderPrice(order) : acc, 0)
}

const getUniqueFiltersFields = (filters: OrderFilterData | null) => {
    if (!filters) return 0
    return Object.values(filters).reduce((acc, value) => Boolean(value) ? acc + 1 : acc, 0)
}

const AdminPanelOrderHeader = () => {

    const orderPopup = useToggle()

    const [orders, savedFilters] = useUnit([$orders, $savedFilters])
    const [savedPriceRange, savePriceRange] = useUnit([$savedPriceRange, savePriceRangeEvent])
    const uniqueFiltersFields = getUniqueFiltersFields(savedFilters)

    useEffect(() => {
        if (!savedPriceRange && orders.length !== 0) {
            const maxOrderPrice = filterOrderByPrice(orders, (fst, snd) => fst < snd)
            const minOrderPrice = filterOrderByPrice(orders, (fst, snd) => fst > snd)
            savePriceRange({min: minOrderPrice, max: maxOrderPrice})
        }
    }, [orders, savedPriceRange]);

    return (
        <React.Fragment>
            {orderPopup.state && <OrderPageFilterPopup
                onClose={orderPopup.toggleState}
            />}
            <section className={"w-full px-7 flex flex-row gap-5"}>

                <Button
                    icon={<FiSliders size={"18px"}/>}
                    onClick={orderPopup.toggleState}
                    text={uniqueFiltersFields !== 0 ? `Применено (${uniqueFiltersFields})` : "Фильтры"}
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
