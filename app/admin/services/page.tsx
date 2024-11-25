"use client";

import { CallRequestStatus } from "@/app/admin/call-requests/main.model";
import {
  $activeServiceType,
  $selectedServices,
  $serviceTableRows,
  getServiceByTypeEvent,
  removeAllServicesEvent,
  selectAllServicesEvent,
  selectServiceEvent,
  setServiceStatusEvent,
  updateServicesEvent,
} from "@/app/admin/services/model";
import Text from "@/components/atoms/Text/Text";
import Button from "@/components/atoms/buttons/button/Button";
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import ServicesContentTable from "@/components/organisms/tables/services-content-table/ServicesContentTable";
import { TableHeaderItem } from "@/types/dto/Table";
import { optionalServiceTypes } from "@/types/dto/admin/service/AdminService";
import { SelectItem } from "@/types/props/SelectItem";
import { useUnit } from "effector-react";
import React, { useEffect, useState } from "react";

const servicesTableHeader: TableHeaderItem[] = [
  { text: "Данные клиента", width: "col-span-2" },
  { text: "Дата", width: "col-span-1" },
  { text: "Тип услуги", width: "col-span-2" },
  { text: "Комментарий", width: "col-span-3" },
];

const multiselectElements: SelectItem<CallRequestStatus>[] = [
  { name: "Актуальные", value: "CURRENT" },
  { name: "Архив", value: "ARCHIVE" },
];

const AdminPanelServicesPage = () => {
  const [activeServiceType, setActiveServiceType] = useUnit([$activeServiceType, getServiceByTypeEvent]);

  const [services, setServiceStatus, updateServices] = useUnit([
    $serviceTableRows,
    setServiceStatusEvent,
    updateServicesEvent,
  ]);

  const [selectedItems, select, selectAll, removeAll] = useUnit([
    $selectedServices,
    selectServiceEvent,
    selectAllServicesEvent,
    removeAllServicesEvent,
  ]);

  const [activeElement, setActiveElement] = useState<SelectItem<CallRequestStatus>>(multiselectElements[0]);
  const updateButtonText = activeElement.value === "CURRENT" ? "Поместить в архив" : "Восстановить";

  const handleUpdateCallRequests = () => {
    if (activeElement.value === "CURRENT") updateServices("ARCHIVE");
    else updateServices("CURRENT");
  };

  useEffect(() => {
    setServiceStatus(activeElement.value);
  }, [activeElement]);

  return (
    <React.Fragment>
      <div className={"w-full px-7 grid grid-cols-8 gap-5"}>
        <MultiselectButton
          activeElement={activeElement}
          selectElement={setActiveElement}
          elements={multiselectElements}
          className={"col-span-3"}
        />
        <SelectInput
          classNames={{ modal: "max-h-[400px]" }}
          width={"col-span-3 col-start-6"}
          items={optionalServiceTypes}
          onSelect={setActiveServiceType}
          selectedItem={activeServiceType}
        />
      </div>
      <HeaderRow
        theme={"bordered"}
        className={"w-full"}
        header={"Услуги"}
        leftContent={
          <div className={"w-fit flex flex-row items-baseline gap-4"}>
            {selectedItems.length > 0 && (
              <div className={"flex flex-row items-baseline gap-4"}>
                <Text text={`Выбрано ${selectedItems.length}`} className={"text-text-gray"} />
                <TextButton
                  className={"text-info-red hover:text-red-700"}
                  text={"Отменить выбор"}
                  onClick={removeAll}
                />
              </div>
            )}
            <TextButton text={"Выбрать всё"} onClick={selectAll} />
          </div>
        }
        rightContent={
          <Button onClick={handleUpdateCallRequests} buttonType={"SECONDARY"} text={updateButtonText} size={"sm"} />
        }
      />
      {services && (
        <ServicesContentTable
          tableHeader={servicesTableHeader}
          selectedItems={selectedItems}
          tableContent={services}
          onSelect={select}
        />
      )}
    </React.Fragment>
  );
};

export default AdminPanelServicesPage;
