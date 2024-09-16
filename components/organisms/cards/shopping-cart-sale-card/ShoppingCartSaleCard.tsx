import React from 'react';
import {
    removeSaleFromCartEvent,
    ResponseCartSaleItem
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import Text from "@/components/atoms/text/text-base/Text";
import ShoppingCartProductCard from "@/components/organisms/cards/shopping-cart-product-card/ShoppingCartProductCard";
import MoreButton from "@/components/atoms/buttons/more-button/MoreButton";
import {useToggle} from "@/utlis/hooks/useToggle";
import {FiTrash2} from "react-icons/fi";
import {cn} from "@/utlis/cn";
import Counter from "@/components/moleculas/counter/Counter";
import {useCounter} from "@/utlis/hooks/product/useCounter";
import {ClassValue} from "clsx";
import {useUnit} from "effector-react";
import useBreakpoint from "@/utlis/hooks/useBreakpoint";

const trashCV: ClassValue = "w-[18px] sm:w-[22px] hoverable pointer text-info-red hover:text-red-700"

const ShoppingCartSaleCard = ({promo, className}: { promo: ResponseCartSaleItem, className ?: string}) => {

    const deleteSale = useUnit(removeSaleFromCartEvent)
    const [amount, increase, decrease] = useCounter(promo.promoId, promo.quantity, true)

    const isExpanded = useToggle()

    const handleDeleteProduct = () => deleteSale(promo.promoId)

    return (
        <section className={cn("w-full flex flex-col gap-5", className)}>
            <section className={"w-full flex flex-row gap-5"}>
                <img
                    src={promo.mainImage}
                    className={'w-[76px] h-[60px] md:h-[90px] md:w-[120px] xl:h-[90px] xl:w-[180px] shrink-0 rounded-lg object-scale-down'}
                    alt={'Изображение акции'}
                />
                <div className={"w-full flex flex-col gap-5 sm:gap-2"}>
                    <Text
                        text={`${(promo.price * amount).toFixed(2)} ₽`}
                        className={"md:flex xl:hidden text-[20px] font-medium"}
                    />
                    <div className={"w-full flex flex-col xl:flex-row items-start xl:items-center gap-5 xl:justify-between"}>
                        <div className={"flex flex-col gap-1"}>
                            <Text text={promo.duration ?? "до 06.05.2024"} className={"text-text-gray text-sm"}/>
                            <div className={"w-full flex flex-col gap-2 sm:gap-1"}>
                                <Text text={promo.name} className={"sm:font-medium"}/>
                                <Text
                                    text={`${(promo.price * amount).toFixed(2)} ₽`}
                                    className={"sm:hidden text-lg font-semibold text-link-blue"}
                                />
                            </div>
                        </div>
                        <div className={"flex xl:flex-row items-center gap-5"}>
                            <div className={"sm:hidden"}>
                                <Counter amount={amount} increase={increase} decrease={decrease}/>
                            </div>
                            <FiTrash2 size={"22px"} className={cn(trashCV)} onClick={handleDeleteProduct}/>
                            <div className={"sm:flex hidden"}>
                                <Counter amount={amount} increase={increase} decrease={decrease}/>
                            </div>
                            <Text
                                text={`${(promo.price * amount).toFixed(2)} ₽`}
                                className={"xl:flex hidden text-[22px] font-medium"}
                            />
                        </div>
                    </div>
                    <MoreButton
                        setExpanded={isExpanded.toggleState}
                        isExpanded={isExpanded.state}
                        text={'Подробнее'}
                    />
                </div>
            </section>
            {
                isExpanded.state && <section className={"w-full flex flex-col gap-5 pt-5 border-t-2 border-light-gray"}>
                    {isExpanded.state && promo.products.map((product, index) => (
                        <ShoppingCartProductCard canInteract={false} card={product} key={index}/>
                    ))}
                </section>
            }
        </section>
    )
};

export default ShoppingCartSaleCard;