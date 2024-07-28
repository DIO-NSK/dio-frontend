import React from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Link from "next/link";
import Text from "@/components/atoms/text/text-base/Text";
import {useUnit} from "effector-react";
import {$searchCatalog} from "@/components/organisms/bars/searchbar/model";
import {useToggle} from "@/utlis/hooks/useToggle";
import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";
import {useDiscount} from "@/utlis/hooks/product/useDiscount";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";

const MobileCatalogSearchingMenu = () => {

    const productRowCV: ClassValue = [
        "w-full right-0 p-7 pb-5 hover:bg-bg-light-blue hoverable pointer",
        "flex flex-row items-center border-b-2",
        "border-light-gray justify-between"
    ]

    const productsToggle = useToggle()
    const categoriesToggle = useToggle()

    const catalog = useUnit($searchCatalog)

    return (
        <section className={"flex flex-col gap-7"}>
            <HeaderRow
                leftContent={`${catalog?.productList.length} шт.`}
                theme={"bordered"} header={"Товары"}
                rightContent={
                    <ChevronButton
                        isExpanded={productsToggle.state}
                        setExpanded={productsToggle.toggleState}
                    />
                }
            />
            {
                productsToggle.state && <div className={'w-full flex flex-col -mt-7'}>
                    {catalog?.productList.map((product, index) => {

                        const [newPrice, price] = useDiscount(product.price, product.discountPercent)

                        return (
                            <Link
                                className={cn(productRowCV)}
                                href={`/product/${product.id}`}
                                key={index}
                            >
                                <section className={"flex flex-row items-center gap-5"}>
                                    <img
                                        className={"h-[60px] aspect-square object-scale-down"}
                                        alt={"Изображение продукта"}
                                        src={product?.mainImage}
                                    />
                                    <div className={"w-full flex flex-col gap-2"}>
                                        <div className={"flex flex-row items-baseline gap-2"}>
                                            <Text
                                                className={"text-link-blue font-medium"}
                                                text={`${newPrice.toFixed(2)} ₽`}
                                            />
                                            {product.discountPercent !== 0 && <Text
                                                className={"text-sm text-text-gray line-through"}
                                                text={`${price.toFixed(2)} ₽`}
                                            />}
                                        </div>
                                        <Text text={product.name}/>
                                    </div>
                                </section>
                            </Link>
                        )
                    })}
                </div>
            }
            <HeaderRow
                leftContent={`${catalog?.categoryList.length} шт.`}
                theme={"bordered"} header={"Категории"}
                rightContent={
                    <ChevronButton
                        isExpanded={categoriesToggle.state}
                        setExpanded={categoriesToggle.toggleState}
                    />
                }
            />
            {
                categoriesToggle.state && <section className={"w-full flex flex-col -mt-7"}>
                    {catalog?.categoryList.map((category, index) => (
                        <div
                            className={"w-full flex flex-col gap-2 py-7 px-5 border-b-2 border-light-gray"}
                            key={index}
                        >
                            <Link href={`/catalog/${category.id}`}>
                                <Text className={"font-medium"} text={category.name}/>
                            </Link>
                        </div>
                    ))}
                </section>
            }
        </section>
    );

};

export default MobileCatalogSearchingMenu;
