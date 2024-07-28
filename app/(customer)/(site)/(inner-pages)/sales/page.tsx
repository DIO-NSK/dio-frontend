import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import SalesContentBlock from "@/components/organisms/loading-blocks/sales/SalesContentBlock";
import Text from "@/components/atoms/text/text-base/Text";
import {TextLink} from "@/types/dto/text";
import {Suspense} from "react";
import SkeletonSaleCard from "@/components/organisms/loading-blocks/sales/SkeletonSaleCard";
import {getSales} from "@/app/(customer)/(site)/(inner-pages)/sales/page.hooks";
import {Metadata} from "next";

export const generateMetadata = async (): Promise<Metadata> => {
    const sales = await getSales();

    return {
        title: `Акции (${sales.length}шт.) — доставка питьевой воды по Новосибирску и области DIO`,
        keywords : sales.map(sale => sale.name),
        openGraph: {
            title: `Акции (${sales.length}шт.) — доставка питьевой воды по Новосибирску и области DIO`,
            images: sales.map(sale => sale.image),
        }
    }
}

const breadcrumbs: TextLink[] = [
    {text: "Главная", link: "/"},
    {text: "Акции", link: "/sales"},
]

const Loading = () => Array.from({length: 4}).map((_, index) => (<SkeletonSaleCard key={index}/>))

const SaleCatalogScreen = async () => {
    const sales = await getSales()

    return (
        <InnerPageWrapper>
            <section className={"w-full col-span-full flex flex-col gap-0 -mt-7 sm:mt-0"}>
                <Text text={"Акции"} className={"text-lg sm:text-2xl font-medium leading-none"}/>
                <div className={"w-full -mt-1 sm:pt-0"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                </div>
            </section>
            <Suspense fallback={<Loading/>}>
                <SalesContentBlock sales={sales}/>
            </Suspense>
        </InnerPageWrapper>
    )
}

export default SaleCatalogScreen
