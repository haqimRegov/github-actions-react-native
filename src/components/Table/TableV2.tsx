import React from "react";
import { View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import { colorTransparent } from "../../styles";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

export const CustomTableV2 = ({
  activeAccordion,
  columns,
  data,
  onChangeAccordion,
  onRowSelect,
  RenderAccordion,
  RenderOptions,
  rowSelection,
  rowSelectionLabel,
}: CustomTableProps) => {
  const activeSection = activeAccordion !== undefined ? activeAccordion : [];

  const handleAccordionChange = (indexes: number[]) => {
    if (onChangeAccordion !== undefined) {
      onChangeAccordion(indexes);
    }
  };

  const tableAccordion = (record: ITableData) => {
    return RenderAccordion !== undefined ? <RenderAccordion {...record} /> : <View />;
  };

  const tableItem = (item: ITableData, index: number) => {
    return (
      <TableRow
        activeAccordion={activeAccordion}
        columns={columns}
        index={index}
        item={item}
        onRowSelect={onRowSelect}
        RenderOptions={RenderOptions}
        rowSelection={rowSelection}
      />
    );
  };

  return (
    <View>
      <TableHeader columns={columns} rowSelectionLabel={rowSelectionLabel} />
      <Accordion
        activeSections={activeSection}
        duration={400}
        expandMultiple={true}
        onChange={handleAccordionChange}
        renderContent={tableAccordion}
        renderHeader={tableItem}
        sections={data}
        touchableProps={{ underlayColor: colorTransparent }}
      />
    </View>
  );
};
