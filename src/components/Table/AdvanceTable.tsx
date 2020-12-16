import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { sh8 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";
import { AdvanceTableRow } from "./AdvanceTableRow";
import { TableHeader } from "./TableHeader";

export const AdvanceTable: FunctionComponent<AdvanceTableProps> = ({
  activeAccordion,
  columns,
  data,
  handleRowNavigation,
  onRowSelect,
  RenderAccordion,
  RenderCustomHeader,
  RenderCustomItem,
  RenderOptions,
  rowSelection,
  RowSelectionItem,
  rowSelectionKey,
  spaceToHeader,
}: AdvanceTableProps) => {
  return (
    <View>
      <TableHeader
        columns={columns}
        RenderCustomHeader={RenderCustomHeader}
        RowSelectionItem={RowSelectionItem}
        withActions={RenderOptions !== undefined}
      />
      <CustomSpacer space={spaceToHeader || sh8} />
      {data.map((row: ITableData, index: number) => {
        return (
          <AdvanceTableRow
            activeAccordion={activeAccordion}
            columns={columns}
            handleRowNavigation={handleRowNavigation}
            index={index}
            item={row}
            key={index}
            lastIndex={index === data.length - 1}
            onRowSelect={onRowSelect}
            RenderAccordion={RenderAccordion}
            RenderCustomItem={RenderCustomItem}
            RenderOptions={RenderOptions}
            rowSelection={rowSelection}
            rowSelectionKey={rowSelectionKey}
          />
        );
      })}
    </View>
  );
};
