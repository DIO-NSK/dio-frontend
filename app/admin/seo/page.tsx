'use client'

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import { TableContent } from "@/components/organisms/tables/text-content-table/TextContentTable";
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";
import { Seo } from "@/types/dto/Seo";
import { TextTableRow } from "@/types/dto/Table";
import { useEffect, useMemo, useState } from "react";
import { getStaticPagesSeo } from "./page.api";
import { toTableRow } from "./page.utils";
import { talbeHeader } from "./page.data";
import { useRouter } from "next/navigation";

const SeoPage = () => {
    const router = useRouter();
    const [seoList, setSeoList] = useState<Seo[]>([]);
    const tableContent = useMemo<TextTableRow[]>(() => toTableRow(seoList), [seoList]);

    const handleRowClick = (id: number) => router.push(`/admin/seo/edit/${id}`);

    useEffect(() => {
        getStaticPagesSeo().then(setSeoList);
    }, []);

    if (seoList) return (
        <>
            <HeaderRow className={"w-full"} theme={"bordered"} header={'SEO'} />
            <TableWrapper tableHeader={talbeHeader}>
                <TableContent tableContent={tableContent} onRowClick={handleRowClick} />
            </TableWrapper>
        </>
    )
}

export default SeoPage;