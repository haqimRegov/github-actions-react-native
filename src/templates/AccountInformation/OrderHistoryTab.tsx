import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { AdvanceTable, CustomSpacer } from "../../components";
import { Language } from "../../constants";
import { CustomTableItem } from "../../pages/Dashboard/Transactions/ApplicationHistory/CustomTableItem";
import {
  centerHorizontal,
  centerHV,
  colorBlue,
  fs12RegBlue1,
  fsTransformNone,
  justifyContentStart,
  px,
  sh8,
  sw144,
  sw152,
  sw192,
  sw24,
  sw56,
  sw8,
  sw96,
} from "../../styles";
import { EmptyStateTable } from "../Dashboard";

const { ORDER_HISTORY } = Language.PAGE;

export interface OrderHistoryTabProps {
  handleViewOrderSummary: (order: IInvestorOrderHistory) => void;
  orderHistory: IInvestorOrderHistory[] | null;
}

export const OrderHistoryTab: FunctionComponent<OrderHistoryTabProps> = ({
  handleViewOrderSummary,
  orderHistory,
}: OrderHistoryTabProps) => {
  const handleView = (item: ITableRowData) => {
    handleViewOrderSummary(item.rawData as unknown as IInvestorOrderHistory);
  };

  const columns: ITableColumn[] = [
    {
      key: [{ key: "orderNo", textStyle: { ...fs12RegBlue1, ...fsTransformNone } }],
      title: ORDER_HISTORY.TABLE_HEADER_ORDER_NUMBER,
      viewStyle: { width: sw152 },
    },
    {
      key: [{ key: "transactionType", textStyle: fs12RegBlue1 }],
      textStyle: fsTransformNone,
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
      customHeader: true,
      customItem: true,
      itemStyle: { ...justifyContentStart, ...px(sw8) },
      key: [{ key: "lastUpdated" }],
      title: ORDER_HISTORY.TABLE_HEADER_LAST_UPDATED,
      viewStyle: { width: sw96, ...px(0), ...centerHorizontal },
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
        RenderCustomItem={(customItemData: ITableCustomItem) => <CustomTableItem {...customItemData} sortedColumns={["lastUpdated"]} />}
        RenderEmptyState={() => <EmptyStateTable isFetching={false} isNotFiltered={true} noTransactionsYet={false} />}
      />
    </View>
  );
};
