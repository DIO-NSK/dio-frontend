'use client'

import React, {useEffect, useRef} from 'react';
import {ResponseProduct} from "@/types/dto/user/product/ResponseProduct";
import {SaleDetails} from "@/app/(customer)/(site)/(inner-pages)/sales/[saleId]/model";
import {useBuyButton} from "@/utlis/hooks/product/useBuyButton";
import Button from "@/components/atoms/buttons/button/Button";
import Text from "@/components/atoms/text/text-base/Text";
import {useDiscount} from "@/utlis/hooks/product/useDiscount";
import {cn} from "@/utlis/cn";
import {FiCheck} from "react-icons/fi";

type MobileProductStickyButtonProps = {
    id: number,
    item: ResponseProduct | SaleDetails,
}

const buttonStyles = {
    button: cn([
        "fixed w-[calc(100%-40px)] bottom-5 left-5 z-30 justify-between",
        "px-5 py-5 sm:hidden flex"
    ])
}

const MobileProductStickyButton = (props: MobileProductStickyButtonProps) => {

    const itemPrice = (props.item as ResponseProduct)?.price;
    const itemDiscountPercent = (props.item as ResponseProduct)?.discountPercent ?? 0;
    const isSale = (props.item as SaleDetails)?.ruleList !== undefined;
    const inCart = (props.item as ResponseProduct)?.inCart;

    const [isInCart, addToCart] = useBuyButton(inCart, props.id, isSale);
    const [price, newPrice] = useDiscount(itemPrice, itemDiscountPercent);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleScroll = () => {
        const footer = document.getElementById('footer');

        if (!buttonRef.current || !footer) return;
        const box = footer.getBoundingClientRect();

        if (window.scrollY + 100 >= box.top) {
            buttonRef.current.style.display = 'none';
        } else {
            buttonRef.current.style.display = 'flex';
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <Button
            ref={buttonRef}
            text={isInCart ? 'В корзине' : 'В корзину'}
            classNames={buttonStyles}
            rightContent={
                <div className={'flex flex-row items-baseline gap-3'}>
                    <Text
                        className={"text-white"}
                        text={`${newPrice.toFixed(2)} ₽`}
                    />
                    {itemDiscountPercent !== 0 ? <Text
                        className={"text-white text-opacity-50 line-through"}
                        text={`${price.toFixed(2)} ₽`}
                    /> : null}
                </div>
            }
            icon={isInCart ? <FiCheck size={'20px'} className={'text-white'}/> : null}
            onClick={addToCart}
        />
    );
};

export default MobileProductStickyButton;
