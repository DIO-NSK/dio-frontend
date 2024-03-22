import {useUnit} from "effector-react";
import {
    editProductAmountEvent
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {useEffect, useState} from "react";

export const useCounter = (productId: number, initAmount: number) => {

    const MAX_VALUE = 100

    const changeAmount = useUnit(editProductAmountEvent)
    const [amount, setAmount] = useState<number>(initAmount)

    const increase = () => amount < MAX_VALUE && setAmount(amount => amount + 1)
    const decrease = () => amount > 1 && setAmount(amount => amount - 1)

    useEffect(() => {
        if (amount !== initAmount) {
            changeAmount({productItemId: productId, quantityProduct: amount})
        }
    }, [amount])

    return [amount, increase, decrease] as const

}