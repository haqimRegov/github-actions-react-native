import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { AdvanceTable, CustomSpacer } from "../../components";
import { Language } from "../../constants";
import {
  centerHV,
  colorBlue,
  fs10BoldBlue1,
  fs12RegBlue1,
  fsTransformNone,
  px,
  sh8,
  sw144,
  sw152,
  sw192,
  sw24,
  sw56,
  sw96,
} from "../../styles";
import { EmptyStateTable } from "../Dashboard";
import { CustomTableItem } from "../OrderSummary/CustomTableItem";

const { ORDER_HISTORY } = Language.PAGE;

export interface OrderHistoryTabProps {
  handleViewOrderSummary: (order: IDashboardOrder) => void;
  orderHistory: IDashboardOrder[] | null;
}

export const OrderHistoryTab: FunctionComponent<OrderHistoryTabProps> = ({
  handleViewOrderSummary,
  orderHistory,
}: OrderHistoryTabProps) => {
  const handleView = (item: ITableRowData) => {
    handleViewOrderSummary(item.rawData as unknown as IDashboardOrder);
  };

  const columns: ITableColumn[] = [
    {
      key: [{ key: "orderNumber" }],
      textStyle: { ...fs12RegBlue1, ...fsTransformNone },
      title: ORDER_HISTORY.TABLE_HEADER_ORDER_NUMBER,
      viewStyle: { width: sw152 },
    },
    {
      key: [{ key: "transactionType" }],
      textStyle: { ...fs12RegBlue1, ...fsTransformNone },
      title: ORDER_HISTORY.TABLE_HEADER_TRANSACTION_TYPE,
      titleStyle: fsTransformNone,
      viewStyle: { width: sw144 },
    },
    {
      customItem: true,
      key: [{ key: "totalInvestment" }],
      title: ORDER_HISTORY.TABLE_HEADER_TOTAL_INVESTMENT,
      viewStyle: { width: sw144 },
    },
    {
      customItem: true,
      key: [{ key: "lastUpdated" }],
      title: ORDER_HISTORY.TABLE_HEADER_LAST_UPDATED,
      titleStyle: fs10BoldBlue1,
      viewStyle: { width: sw96 },
    },
    {
      customItem: true,
      key: [{ key: "status" }],
      title: ORDER_HISTORY.TABLE_HEADER_ORDER_STATUS,
      viewStyle: { width: sw192 },
    },
    {
      itemIcon: { color: colorBlue._1, name: "eye-show", size: sw24 },
      key: [],
      onPressItem: handleView,
      title: ORDER_HISTORY.TABLE_HEADER_ACTION,
      viewStyle: { ...centerHV, width: sw56 },
    },
  ];

  return (
    <View style={px(sw24)}>
      <CustomSpacer space={sh8} />
      <AdvanceTable
        columns={columns}
        data={orderHistory === null ? [] : (orderHistory as unknown as ITableData[])}
        RenderCustomItem={(customItemData: ITableCustomItem) => (
          <CustomTableItem
            {...customItemData}
            item={{ ...customItemData.item, rawData: { ...customItemData.item.rawData, dueDate: null } }}
            sortedColumns={["lastUpdated"]}
          />
        )}
        RenderEmptyState={() => <EmptyStateTable isFetching={false} isNotFiltered={true} noTransactionsYet={false} />}
      />
    </View>
  );
};
