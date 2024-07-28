import React from 'react';
import {RangeInputFilter, SelectFilter} from "@/types/dto/user/catalog/Filters";
import LabelInputWrapper from "@/components/wrappers/label-input-wrapper/LabelInputWrapper";
import CheckboxList from "@/components/moleculas/lists/checkbox-list/CheckboxList";
import Button from "@/components/atoms/buttons/button/Button";
import {useFilters} from "@/utlis/hooks/useFilters";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {FiX} from "react-icons/fi";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import RangeInput from "@/components/atoms/inputs/range-input/RangeInput";

const CatalogFilters = ({categoryId, onClose}: { categoryId: number, onClose?: () => void }) => {

    const filterMethods = useFilters(categoryId)

    return (
        <section className={"p-5 -mt-7 sm:p-0 sm:mt-0 flex flex-col gap-5"}>
            <HeaderRow
                header={"Фильтры"} headerCN={"sm:text-lg sm:text-medium"}
                leftContent={<TextButton onClick={filterMethods.handleClearFilters} text={"Очистить все"}/>}
                rightContent={<FiX onClick={onClose} size={"20px"} className={"sm:hidden"}/>}
            />
            {filterMethods.categoryFilters.map((filterGroup, filterKey) => {
                if ((filterGroup.filter as RangeInputFilter).unit) {
                    return (
                        <LabelInputWrapper
                            isDirty={filterGroup.isDirty}
                            header={`${filterGroup.header}, ${(filterGroup.filter as RangeInputFilter).unit}`}
                            key={filterKey}
                        >
                            <RangeInput
                                onChangeFromValue={(value) => filterMethods.handleChangeRangeInput(value, filterKey, "from")}
                                onChangeToValue={(value) => filterMethods.handleChangeRangeInput(value, filterKey, "to")}
                                {...(filterGroup.filter as RangeInputFilter)}
                            />
                        </LabelInputWrapper>
                    )
                } else return (
                    <LabelInputWrapper
                        isDirty={filterGroup.isDirty}
                        header={filterGroup.header}
                        key={filterKey}
                    >
                        <CheckboxList
                            items={(filterGroup.filter as SelectFilter).selectableItems}
                            onSelect={(isSelected, index) =>
                                filterMethods.handleSelectItem(isSelected, index, filterKey)}
                        />
                    </LabelInputWrapper>
                )
            })}
            <Button
                text={"Применить фильтры"}
                onClick={filterMethods.onSubmit}
                classNames={{button: `z-20 w-full sticky bottom-7`}}
            />
        </section>
    );

};

export default CatalogFilters;