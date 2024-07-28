import React from 'react';
import {PropsWithClassName} from "@/types/props/utils/PropsWithClassName";
import {ResponseProduct} from "@/types/dto/user/product/ResponseProduct";
import Chip from "@/components/atoms/chip/Chip";
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";

type ProductChipsProps = PropsWithClassName<{
    product: ResponseProduct
}>

const ProductChips = ({product, className}: ProductChipsProps) => (
    <div className={cn("flex flex-row items-center gap-3", className)}>
        {
            product?.isNew ? (
                <span className={"px-3 py-2 rounded-lg bg-blue-500"}>
                        <Text
                            className={"uppercase text-xs sm:text-sm font-medium text-white"}
                            text={'Новинка'}
                        />
                    </span>
            ) : null
        }
        {
            product.discountPercent !== 0 ?
                <Chip className={"z-30 bg-green-500"}>
                    <Text
                        className={"text-xs sm:text-sm uppercase text-white font-medium"}
                        text={`Скидка ${product.discountPercent}%`}
                    />
                </Chip> : null
        }
        {
            !product.inStock ?
                <Chip className={"z-30 bg-gray-100"}>
                    <Text
                        className={"text-xs sm:text-sm uppercase text-text-gray"}
                        text={"Нет в наличии"}
                    />
                </Chip> : null
        }
    </div>
);

export default ProductChips;
