import OurWatersCategoryClientScreen from "@/app/(customer)/(site)/(inner-pages)/our-waters/ui/OurWatersCategoryClientScreen";
import { getOurWatersChips } from "@/app/(customer)/(site)/page.hooks";
import { getSeoByUrlMask } from "@/app/admin/seo/page.api";
import Text from "@/components/atoms/Text/Text";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import { ResponsivePageWrapper } from "@/components/wrappers/responsive-page-wrapper/ResponsivePageWrapper";
import { TextLink } from "@/types/dto/text";

const breadcrumbs: TextLink[] = [
  { text: "Главная", link: "/" },
  { text: "Наши воды", link: "/our-waters" },
];

export const generateMetadata = async () => {
  const { title, description, keywords } = await getSeoByUrlMask(__dirname.split("/").at(-1) as string);

  return {
    title: title,
    description: description,
    keywords: keywords,
  };
};

const OurWatersCategoryScreen = async () => {
  const ourWaters = await getOurWatersChips();

  return (
    <ResponsivePageWrapper>
      <section className={"w-full col-span-full flex flex-col gap-1 -mt-7 sm:mt-0"}>
        <div className={"w-full -mt-1 sm:pt-0"}>
          <CatalogBreadcrumbs breadcrumbs={breadcrumbs} />
        </div>
        <Text text={"Наши воды"} className={"text-lg sm:text-2xl font-medium leading-none"} />
      </section>
      <OurWatersCategoryClientScreen waters={ourWaters} />
    </ResponsivePageWrapper>
  );
};

export default OurWatersCategoryScreen;
