"use client"

import AdminPanelHeaderButtonRow
    from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow";
import {Breadcrumbs, Link} from "@mui/joy";
import Text from "@/components/atoms/text/text-base/Text";
import {useAdminPanelProductsPage} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/page.hooks";
import ProductContentTable from "@/components/organisms/tables/product-content-table/ProductContentTable";
import {adminProductTableContent, adminProductTableHeader} from "@/data/tables/adminProductTable";
import {
    useAdminPanelHeaderButtonRow
} from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow.hooks";
import AdminPanelHeaderRow from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow";
import {useAdminPanelHeaderRow} from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow.hooks";

const AdminPanelProductsPage = () => {

    const {...context} = useAdminPanelProductsPage()
    const {...headerContext} = useAdminPanelHeaderButtonRow()
    const {...editableContext} = useAdminPanelHeaderRow()

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
                    <AdminPanelHeaderRow
                        header={"Товары"}
                        isEditable={editableContext.isEditable}
                        onChange={editableContext.handleSwitchEditable}
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
