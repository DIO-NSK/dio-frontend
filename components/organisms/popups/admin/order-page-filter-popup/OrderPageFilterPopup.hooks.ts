import {SelectItem} from "@/types/props/SelectItem";
import {useState} from "react";
import {OrderStatus} from "@/types/dto/user/order/ResponseProfileOrder";

export const useOrderPageFilterPopup = () => {
    
    const selectItems : SelectItem<OrderStatus>[] = [
        {name : "В ожидании", value : "PENDING"},
        {name : "В архиве", value : "CANCELED"},
        {name : "В обработке", value : "PROCESSING"},
        {name : "В пути", value : "SHIPPED"},
        {name : "Отправлен", value : "DELIVERED"},
    ]

    const selectPaymentItems : SelectItem<boolean>[] = [
        {name : "Оплачен", value : true},
        {name : "Не оплачен", value : false},
    ]

    const [
        activePayment,
        setActivePayment
    ] = useState<SelectItem<boolean>>(selectPaymentItems[0])

    const [
        activeOrder,
        setActiveOrder
    ] = useState<SelectItem<OrderStatus>>(selectItems[0])

    const [fromValue, setFromValue] = useState<string>("0")
    const [toValue, setToValue] = useState<string>("0")

    const [creationDate, setCreationDate] = useState<string>("")
    const [paymentDate, setPaymentDate] = useState<string>("")

    const handleSaveChanges = () => console.log("Changes Saved!")

    return {
        orderInput : {selectItems, activeOrder, setActiveOrder},
        paymentInput : {selectPaymentItems, activePayment, setActivePayment},
        rangeInput : {fromValue, setFromValue, toValue, setToValue},
        creationDateInput : {creationDate, setCreationDate},
        paymentDateInput : {paymentDate, setPaymentDate},
        handleSaveChanges
    }
    
}