import {getOurWatersChips} from "@/app/(customer)/(site)/page.hooks";
import OurWatersCategoryClientScreen
    from "@/app/(customer)/(site)/(inner-pages)/our-waters/ui/OurWatersCategoryClientScreen";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import Text from "@/components/atoms/text/text-base/Text";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {TextLink} from "@/types/dto/text";

const breadcrumbs: TextLink[] = [
    {text: "Главная", link: "/"},
    {text: "Наши воды", link: "/our-waters"},
]

const OurWatersCategoryScreen = async () => {

    const ourWaters = await getOurWatersChips();

    return (
        <InnerPageWrapper classNames={{desktopWrapper : 'gap-5'}}>
            <section className={"w-full col-span-full flex flex-col gap-1 -mt-7 sm:mt-0"}>
                <div className={"w-full -mt-1 sm:pt-0"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                </div>
                <Text text={'Наши воды'} className={"text-lg sm:text-2xl font-medium leading-none"}/>
            </section>
            <OurWatersCategoryClientScreen waters={ourWaters}/>
        </InnerPageWrapper>
    )
}

export default OurWatersCategoryScreen;