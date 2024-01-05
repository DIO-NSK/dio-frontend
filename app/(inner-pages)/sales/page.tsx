import React from 'react';
import {mockSaleCardArray} from "@/data/saleCardData";
import SaleFullCard from "@/components/organisms/cards/sale-full-card/SaleFullCard";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";

const SaleCatalogScreen = () => {

    return (
        <InnerPageWrapper>
            {
                mockSaleCardArray.map((card) => {
                    return <SaleFullCard card={card}/>
                })
            }
        </InnerPageWrapper>
    )

}

export default SaleCatalogScreen
