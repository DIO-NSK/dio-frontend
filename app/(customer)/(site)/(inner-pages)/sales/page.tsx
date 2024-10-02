import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import SalesContentBlock from "@/components/organisms/loading-blocks/sales/SalesContentBlock";
import Text from "@/components/atoms/text/text-base/Text";
import {TextLink} from "@/types/dto/text";
import {Suspense} from "react";
import SkeletonSaleCard from "@/components/organisms/loading-blocks/sales/SkeletonSaleCard";
import {getSales} from "@/app/(customer)/(site)/(inner-pages)/sales/page.hooks";
import {Metadata} from "next";
import {ResponsivePageWrapper} from "@/components/wrappers/responsive-page-wrapper/ResponsivePageWrapper";
import {getSeoByUrlMask} from "@/app/admin/seo/page.api";

export const generateMetadata = async (): Promise<Metadata> => {
    const {title, keywords, description} = await getSeoByUrlMask(__dirname.split('/').at(-1) as string);

    return {
        title: title,
        keywords : keywords,
        description : description
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
        <ResponsivePageWrapper>
            <section className={"w-full col-span-full flex flex-col md:gap-2 xl:gap-0 md:mt-0"}>
                <Text text={"Акции"} className={"text-lg sm:text-2xl font-medium leading-none"}/>
                <div className={"w-full -mt-1 sm:pt-0"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                </div>
            </section>
            <Suspense fallback={<Loading/>}>
                <SalesContentBlock sales={sales}/>
            </Suspense>
        </ResponsivePageWrapper>
    )
}

export default SaleCatalogScreen
