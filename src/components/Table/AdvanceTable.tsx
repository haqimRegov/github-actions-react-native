import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { flexChild, sh8 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";
import { AdvanceTableRow } from "./AdvanceTableRow";
import { TableHeader } from "./TableHeader";

export const AdvanceTable: FunctionComponent<AdvanceTableProps> = ({
  activeAccordion,
  columns,
  data,
  disabledIndex,
  handleRowNavigation,
  onRowSelect,
  RenderAccordion,
  RenderCustomHeader,
  RenderCustomItem,
  RenderEmptyState,
  RenderOptions,
  rowSelection,
  RowSelectionItem,
  rowSelectionKey,
  spaceToHeader,
}: AdvanceTableProps) => {
  const emptyState = RenderEmptyState !== undefined ? <RenderEmptyState /> : <View />;

  return (
    <View style={flexChild}>
      <TableHeader
        columns={columns}
        RenderCustomHeader={RenderCustomHeader}
        RowSelectionItem={RowSelectionItem}
        withActions={RenderOptions !== undefined}
      />
      <CustomSpacer space={spaceToHeader || sh8} />
      {data.length === 0
        ? emptyState
        : data.map((row: ITableData, index: number) => {
            return (
              <AdvanceTableRow
                activeAccordion={activeAccordion}
                columns={columns}
                disabled={disabledIndex !== undefined && disabledIndex.includes(index)}
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
