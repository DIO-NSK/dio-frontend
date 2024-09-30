import { Seo } from "@/types/dto/Seo";
import { TextTableRow } from "@/types/dto/Table";
import { staticPages } from "./page.data";

export const toTableRow = (seoList: Seo[]): TextTableRow[] => {
    return seoList.map((seo) => ({
        itemsWidth: ['col-span-2', 'col-span-2', 'col-span-4'],
        item: [staticPages[Number(seo.id)].name, `/${seo.urlMask}`, seo.description],
        id: seo?.id
    })) as TextTableRow[]
}