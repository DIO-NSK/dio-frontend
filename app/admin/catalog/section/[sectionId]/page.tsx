"use client"

import AdminPanelHeaderButtonRow
    from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow";
import {useAdminPanelCategoriesPage} from "@/app/admin/catalog/section/[sectionId]/page.hooks";
import TextContentTable from "@/components/organisms/tables/text-content-table/TextContentTable";
import {Breadcrumbs, Link} from "@mui/joy";
import Text from "@/components/atoms/text/text-base/Text";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import AdminPanelSaveDiscardChangesRow
    from "@/components/organisms/rows/admin-panel-save-discard-changes-row/AdminPanelSaveDiscardChangesRow";
import {useRouter} from "next/navigation";

const AdminPanelCategoryPage = () => {

    const {...context} = useAdminPanelCategoriesPage()

    const router = useRouter()

    return (
        <>

            <div className={"w-full flex flex-col gap-4"}>
                <AdminPanelHeaderButtonRow
                    onExportCatalog={context.handleExportCatalog}
                    onAddNewItem={context.handleAddNewCategory}
                    searchInputValue={context.searchbar.searchValue}
                    searchInputOnChange={context.searchbar.setSearchValue}
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
                    <HeaderRow
                        className={"w-full"}
                        theme={"bordered"}
                        header={"Категории"}
                        rightContent={
                            <AdminPanelSaveDiscardChangesRow
                                isEditable={context.editMode.isEditable}
                                onChange={context.editMode.handleSwitchEditable}
                            />
                        }
                    />
                </div>

            </div>

            <TextContentTable
                className={"mt-[-28px]"}
                tableContent={context.tableContent}
                isDraggable={context.editMode.isEditable}
                onRowClick={context.handleRowClick}
            />

        </>
    );

};

export default AdminPanelCategoryPage;
