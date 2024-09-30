import { getSeoByUrlMask } from "@/app/admin/seo/page.api";
import Text from "@/components/atoms/text/text-base/Text";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import StaticInfoCol from "@/components/moleculas/cols/static-info-col/StaticInfoCol";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import { serviceCenter } from "@/data/static/serviceCenter";
import { TextLink } from "@/types/dto/text";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getSeoByUrlMask(__dirname.split('/').at(-1) as string);

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords
    }
}

// export const metadata: Metadata = {
//     title: 'Сервисный центер — доставка питьевой воды по Новосибирску и области DIO',
//     keywords: serviceCenter.map(serviceGroup => serviceGroup.blockContent.map(item => item.itemHeader ?? '')).flat(),
//     openGraph : {
//         title : 'Сервисный центер — доставка питьевой воды по Новосибирску и области DIO'
//     }
// }

const breadcrumbs: TextLink[] = [
    { text: "Главная", link: "/" },
    { text: "Сервисный центр", link: "/service-center" },
]

const ServiceCenterPage = () => {
    return (
        <InnerPageWrapper classNames={{ mobileWrapper: "pt-0" }}>
            <div className={"col-span-full flex flex-col gap-[10px]"}>
                <CatalogBreadcrumbs breadcrumbs={breadcrumbs} />
                <Text
                    text={"Сервисный центр"}
                    className={"text-xl sm:text-[24px] text-black font-semibold"}
                />
            </div>
            <StaticInfoCol data={serviceCenter} />
        </InnerPageWrapper>
    );
};

export default ServiceCenterPage;