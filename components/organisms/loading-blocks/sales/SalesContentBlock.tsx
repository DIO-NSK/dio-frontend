import React from 'react';
import SaleFullCard from "@/components/organisms/cards/sale-full-card/SaleFullCard";
import {ResponseShortSale} from "@/app/admin/sales/model";

const SalesContentBlock = ({sales}: { sales: ResponseShortSale[] }) => (
    <React.Fragment>
        {sales.map((sale, key) => (
            <SaleFullCard card={sale} key={key}/>
        ))}
    </React.Fragment>
)

export default SalesContentBlock;
