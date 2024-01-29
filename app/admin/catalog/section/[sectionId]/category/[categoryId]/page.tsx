"use client"

import AdminPanelHeaderButtonRow
    from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow";
import {Breadcrumbs, Link} from "@mui/joy";
import Text from "@/components/atoms/text/text-base/Text";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import AdminPanelSaveDiscardChangesRow
    from "@/components/organisms/rows/admin-panel-save-discard-changes-row/AdminPanelSaveDiscardChangesRow";
import {useAdminPanelProductsPage} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/page.hooks";
import ProductContentTable from "@/components/organisms/tables/product-content-table/ProductContentTable";
import {adminProductTableContent, adminProductTableHeader} from "@/data/adminProductTable";

const AdminPanelProductsPage = () => {

    const {...context} = useAdminPanelProductsPage()

    return (
        <>

            <div className={"w-full flex flex-col gap-4"}>

                <AdminPanelHeaderButtonRow
                    onExportCatalog={context.handleExportCatalog}
                    onAddNewItem={context.handleAddNewProduct}
                    searchInputValue={context.searchbar.searchValue}
                    searchInputOnChange={context.searchbar.setSearchValue}
                />

                <div className={"w-full flex flex-col"}>
                    <Breadcrumbs
                        sx={{
                            "--Breadcrumbs-gap": "10px",
                            marginLeft: "-10px",
                            marginBottom: "-10px"
                        }}
                    >
                        {
                            context.breadcrumbsData.map((breadcrumb, index, array) => {
                                return index !== array.length - 1 ? <Link color={"neutral"} onClick={breadcrumb.action}>
                                    <Text text={breadcrumb.text} className={"text-text-gray"}/>
                                </Link> : <Text text={breadcrumb.text} className={"text-text-gray"}/>
                            })
                        }
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

            <ProductContentTable
                tableHeader={adminProductTableHeader}
                tableContent={adminProductTableContent}
                onProductClick={context.handleProductClick}
            />

        </>
    );
};

export default AdminPanelProductsPage;
