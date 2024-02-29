"use client"

import AdminPanelHeaderButtonRow
    from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow";
import {useAdminPanelCategoriesPage} from "@/app/admin/catalog/section/[sectionId]/page.hooks";
import TextContentTable from "@/components/organisms/tables/text-content-table/TextContentTable";
import {Breadcrumbs, Link} from "@mui/joy";
import Text from "@/components/atoms/text/text-base/Text";
import {useRouter} from "next/navigation";
import {
    useAdminPanelHeaderButtonRow
} from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow.hooks";
import {useAdminPanelHeaderRow} from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow.hooks";
import AdminPanelHeaderRow from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow";

const AdminPanelCategoryPage = ({params} : {
    params : { sectionId : number }
}) => {

    const {...context} = useAdminPanelCategoriesPage(params.sectionId)
    const {...headerContext} = useAdminPanelHeaderButtonRow()
    const {...editableContext} = useAdminPanelHeaderRow()

    const router = useRouter()

    return (
        <>

            <div className={"w-full flex flex-col gap-4"}>
                <AdminPanelHeaderButtonRow
                    onExportCatalog={context.handleExportCatalog}
                    onAddNewItem={headerContext.handleAddItem}
                    searchInputValue={headerContext.searchbar.searchValue}
                    searchInputOnChange={headerContext.searchbar.setSearchValue}
                />

                <div className={"w-full flex flex-col"}>
                    <Breadcrumbs
                        sx={{
                            "--Breadcrumbs-gap": "10px",
                            marginLeft : "-10px",
                            marginBottom : "-10px"
                        }}
                    >
                        <Link color={"neutral"} onClick={() => router.push('/admin/catalog')}>
                            <Text text={"Бытовая химия и гигиена"} className={"text-text-gray"}/>
                        </Link>
                        <Text text={"Категории"}/>
                    </Breadcrumbs>
                    <AdminPanelHeaderRow
                        header={"Категории"}
                        isEditable={editableContext.isEditable}
                        onChange={editableContext.handleSwitchEditable}
                        onSaveChanges={() => console.log("Saved changes")}
                        onCancelChanges={() => console.log("Cancel changes")}
                    />
                </div>

            </div>

            <TextContentTable
                className={"mt-[-28px]"}
                tableContent={context.tableContent}
                isDraggable={editableContext.isEditable}
                onRowClick={context.handleRowClick}
            />

        </>
    );

};

export default AdminPanelCategoryPage;
