import React from 'react';
import style from "../InnerPages.module.css"
import {mockSaleCardArray} from "@/data/saleCardData";
import SaleFullCard from "@/components/organisms/cards/sale-full-card/SaleFullCard";

const SaleCatalogScreen = () => {

    return (
        <div style={{padding: "0 100px 0 100px"}} className={style.innerLayout}>
            {
                mockSaleCardArray.map((card) => {
                    return <SaleFullCard card={card}/>
                })
            }
        </div>
    )
}

export default SaleCatalogScreen
