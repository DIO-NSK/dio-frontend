"use client"

import style from "./ProductPriceCard.module.css"
import Text2XL from "@/components/atoms/text/text-2xl/Text2XL";
import {COLOR} from "@/components/colors";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import LikeButton from "@/components/atoms/buttons/like-button/LikeButton";
import React from "react";
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";

const ProductPriceCard = ({price, oldPrice}: {
    price: number,
    oldPrice?: number
}) => {
    return (
        <StickyCardWrapper startCol={"col-start-10"}>

            <div className={style.priceRow}>
                <Text2XL
                    text={price.toString() + " ₽"}
                    color={COLOR["link-blue"]}
                />
                {
                    oldPrice && <Text
                        text={oldPrice + " ₽"}
                        color={COLOR["text-gray"]}
                    />
                }
            </div>

            <div className={style.buttonRow}>
                <Button
                    text={"В корзину"}
                    onClick={() => console.log("В корзину")}
                />
                <LikeButton/>
            </div>

        </StickyCardWrapper>
    )
}

export default ProductPriceCard
