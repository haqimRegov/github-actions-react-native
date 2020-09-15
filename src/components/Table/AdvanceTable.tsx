import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { sh16 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";
import { AdvanceTableRow } from "./AdvanceTableRow";
import { TableHeader } from "./TableHeader";

interface AdvanceTableProps {
  activeAccordion?: number[];
  columns: ITableColumn[];
  data: ITableData[];
  onRowSelect?: (record: ITableData[]) => void;
  RenderAccordion?: (record: ITableData, index: number) => JSX.Element;
  RenderOptions?: (props: ITableOptions) => JSX.Element;
  rowSelection?: ITableData[];
  rowSelectionLabel?: string;
  spaceToHeader?: number;
}

export const AdvanceTable: FunctionComponent<AdvanceTableProps> = ({
  activeAccordion,
  columns,
  data,
  onRowSelect,
  RenderAccordion,
  RenderOptions,
  rowSelection,
  rowSelectionLabel,
  spaceToHeader,
}: AdvanceTableProps) => {
  return (
    <View>
      <TableHeader columns={columns} rowSelectionLabel={rowSelectionLabel} withActions={RenderOptions !== undefined} />
      <CustomSpacer space={spaceToHeader || sh16} />
      {data.map((row: ITableData, index: number) => {
        return (
          <AdvanceTableRow
            key={index}
            activeAccordion={activeAccordion}
            columns={columns}
            RenderAccordion={RenderAccordion}
            index={index}
            item={row}
            onRowSelect={onRowSelect}
            RenderOptions={RenderOptions}
            rowSelection={rowSelection}
          />
        );
      })}
    </View>
  );
};
