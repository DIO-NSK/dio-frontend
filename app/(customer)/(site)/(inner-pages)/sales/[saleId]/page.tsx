import CardBulletCol from "@/components/moleculas/cols/card-bullet-col/CardBulletCol";
import React from "react";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import Text from "@/components/atoms/text/text-base/Text";
import {TextLink} from "@/types/dto/text";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import SliderGroup from "@/components/wrappers/slider-group/SliderGroup";
import ProductPhotoSlider from "@/components/moleculas/sliders/product-photo-slider/ProductPhotoSlider";
import {cn} from "@/utlis/cn";
import MobilePhotoSlider from "@/components/mobile/organisms/photo-slider/MobilePhotoSlider";

import {getSaleById, getSales} from '../page.hooks'
import SalePriceCard from "@/app/(customer)/(site)/(inner-pages)/sales/[saleId]/ui/SalePriceCard";
import SaleCardMobileInfoBlock from "@/app/(customer)/(site)/(inner-pages)/sales/[saleId]/ui/SaleCardMobileInfoBlock";
import {Metadata} from "next";
import MobileProductStickyButton from "@/components/atoms/buttons/MobileProductStickyButton";

const productCardCV = {
    mainWrapper: cn([
        "sm:border-2 sm:border-light-gray sm:scale-[0.95]",
        "sm:hover:scale-[0.95] sm:w-full"
    ])
}

export const generateStaticParams = async () => {
    const sales = await getSales();
    return sales.map(sale => ({saleId: sale.id.toString()}))
}

export const generateMetadata = async ({params: {saleId}}: { params: { saleId: number } }): Promise<Metadata> => {
    const sale = await getSaleById(saleId)

    return {
        title: sale.name,
        description : sale.description,
        keywords : sale.ruleList,
        openGraph: {
            title: sale.name,
            description : sale.description,
            images: sale.images,
        }
    }
}

const SalePage = async ({params: {saleId}}: { params: { saleId: number } }) => {

    const sale = await getSaleById(saleId)

    const breadcrumbs: TextLink[] = [
        {text: "Главная", link: "/"},
        {text: "Акции", link: "/sales"},
        {text: sale?.name ?? "", link: `/sales/${saleId}`},
    ]

    return (
        <div className={"w-full md:col-span-full flex flex-col gap-5 xl:gap-7"}>
            <div className={"px-5 md:px-6 lg:px-[90px] xl:px-[100px] w-full sm:col-span-full sm:grid sm:grid-cols-12 sm:gap-5 xl:gap-y-7"}>
                <section className={"sm:col-span-full flex flex-col gap-2"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                    <Text text={sale.name} className={"sm:text-2xl text-xl font-medium"}/>
                </section>
                <div className={"w-full col-span-full md:col-span-8 xl:col-span-9 flex flex-col gap-5 xl:gap-7"}>
                    <ProductPhotoSlider photos={sale.images}/>
                    <MobilePhotoSlider
                        photos={sale.images?.map(image => ({image: image}))}
                        className={"mt-5 mb-0"} showQuantity
                    />
                    <div className={"w-full md:w-[calc(100vw-48px)] lg:w-full flex flex-col gap-2"}>
                        <Text text={"Описание"} className={"md:text-xl text-lg font-medium"}/>
                        <Text text={sale.description} className={"w-full"}/>
                    </div>
                    <CardBulletCol
                        header={"Для участия в акции"}
                        items={sale.ruleList}
                    />
                </div>
                <SalePriceCard sale={sale} saleId={saleId}/>
            </div>
            <div className={"w-full md:px-6 lg:px-[90px] xl:px-[100px] py-7 border-y-2 border-light-gray"}>
                <SliderGroup headerSize={'sm'} header={"Товары, участвующие в акции"}>
                    {sale.products?.map((product, index) => (
                        <ProductCard classNames={productCardCV} productCard={product} key={index}/>
                    ))}
                </SliderGroup>
            </div>
            <SaleCardMobileInfoBlock sale={sale} saleId={saleId}/>
            <MobileProductStickyButton item={sale} id={saleId}/>
        </div>
    );
};

export default SalePage;
