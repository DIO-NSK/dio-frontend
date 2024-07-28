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

const trashCV: ClassValue = "w-[18px] sm:w-[22px] hoverable pointer text-info-red hover:text-red-700"

const ShoppingCartSaleCard = ({promo}: { promo: ResponseCartSaleItem }) => {

    const deleteSale = useUnit(removeSaleFromCartEvent)
    const [amount, increase, decrease] = useCounter(0, promo.quantity)

    const isExpanded = useToggle()

    const handleDeleteProduct = () => deleteSale(promo.promoId)

    return (
        <section className={"w-full flex flex-col gap-5 pb-5 border-b-2 border-light-gray"}>
            <section className={"w-full flex flex-row gap-5"}>
                <img
                    src={promo.mainImage}
                    className={'w-[76px] h-[60px] sm:h-[90px] sm:w-[180px] rounded-lg object-scale-down'}
                    alt={'Изображение акции'}
                />
                <div className={"w-full flex flex-col gap-5 sm:gap-2"}>
                    <div className={"w-full flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:justify-between"}>
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
                        <div className={"flex flex-row items-center gap-5"}>
                            <div className={"sm:hidden"}>
                                <Counter amount={amount} increase={increase} decrease={decrease}/>
                            </div>
                            <FiTrash2 size={"22px"} className={cn(trashCV)} onClick={handleDeleteProduct}/>
                            <div className={"sm:flex hidden"}>
                                <Counter amount={amount} increase={increase} decrease={decrease}/>
                            </div>
                            <Text
                                text={`${(promo.price * amount).toFixed(2)} ₽`}
                                className={"sm:flex hidden text-[22px] font-medium"}
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