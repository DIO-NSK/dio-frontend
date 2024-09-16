import { ShoppingCartProductCardProps } from "../ShoppingCartProductCard.types";

export interface CounterRowProps extends Omit<ShoppingCartProductCardProps, 'hasLink'> {
    onIncrease: () => void;
    onDecrease: () => void;
    amount: number;
}