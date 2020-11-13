import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { sh8 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";
import { AdvanceTableRow } from "./AdvanceTableRow";
import { TableHeader } from "./TableHeader";

interface AdvanceTableProps {
  activeAccordion?: number[];
  columns: ITableColumn[];
  data: ITableData[];
  handleRowNavigation?: (item: ITableData) => void;
  onRowSelect?: (record: ITableData[]) => void;
  RenderAccordion?: (record: ITableData, index: number) => JSX.Element;
  RenderCustomItem?: (customItem: ITableCustomItem) => JSX.Element;
  RenderOptions?: (props: ITableOptions) => JSX.Element;
  rowSelection?: ITableData[];
  rowSelectionLabel?: string;
  spaceToHeader?: number;
}

export const AdvanceTable: FunctionComponent<AdvanceTableProps> = ({
  activeAccordion,
  columns,
  data,
  handleRowNavigation,
  onRowSelect,
  RenderAccordion,
  RenderCustomItem,
  RenderOptions,
  rowSelection,
  rowSelectionLabel,
  spaceToHeader,
}: AdvanceTableProps) => {
  return (
    <View>
      <TableHeader columns={columns} rowSelectionLabel={rowSelectionLabel} withActions={RenderOptions !== undefined} />
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
          />
        );
      })}
    </View>
  );
};
