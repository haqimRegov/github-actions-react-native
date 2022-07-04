import React, { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";

import { AdvanceTable, CustomSpacer } from "../../components";
import { Language, NunitoBold, NunitoRegular } from "../../constants";
import { CustomTableItem } from "../../pages/Dashboard/Transactions/ApplicationHistory/CustomTableItem";
import {
  centerHorizontal,
  centerHV,
  colorBlue,
  fs10BoldBlue1,
  fs12RegBlue1,
  fsTransformNone,
  justifyContentStart,
  px,
  sh13,
  sh8,
  sw144,
  sw152,
  sw16,
  sw192,
  sw24,
  sw56,
  sw8,
  sw94,
  sw96,
} from "../../styles";
import { AnimationUtils } from "../../utils";
import { EmptyStateTable } from "../Dashboard";

const { ORDER_HISTORY } = Language.PAGE;

export interface OrderHistoryTabProps {
  handleFetch: () => void;
  handleViewOrderSummary: (order: IDashboardOrder) => void;
  isFetching: boolean;
  orderHistory: ITransactionsTab;
  setShowDateBy: (value: IShowDateBy) => void;
  showDateBy: IShowDateBy;
  updateOrderHistorySort: (value: ITransactionsSort[]) => void;
}

export const OrderHistoryTab: FunctionComponent<OrderHistoryTabProps> = ({
  handleFetch,
  handleViewOrderSummary,
  isFetching,
  orderHistory,
  setShowDateBy,
  showDateBy,
  updateOrderHistorySort,
}: OrderHistoryTabProps) => {
  const { orders, sort } = orderHistory;
  // const fetching = useRef<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<number[]>([]);
  // const [showDateBy, setShowDateBy] = useState<IShowDateBy>({ type: "Last Updated", key: "descending" });

  const handleShowDateBy = (text: TDateType, key: TSortType) => {
    const newKey = key === "ascending" ? "descending" : "ascending";
    setShowDateBy({ type: text, key: newKey });
    const sortColumns = sort.map((eachSortType) => eachSortType.column);
    const sortType: TransactionsSortColumnType = text === "Created On" ? "createdOn" : "lastUpdated";
    const newSort: ITransactionsSort = sortColumns.includes(sortType) ? { ...sort[0], value: newKey } : { column: sortType, value: newKey };
    updateOrderHistorySort([newSort]);
  };

  const handleShowRemarks = (item: ITableRowData) => {
    const newSections: number[] = [...activeAccordion];
    const sectionIndex = newSections.indexOf(item.index);
    if (sectionIndex > -1) {
      newSections.splice(sectionIndex, 1);
    } else {
      newSections.splice(0, 1, item.index);
    }
    setActiveAccordion(newSections);
  };

  const handleView = (item: ITableRowData) => {
    handleViewOrderSummary(item.rawData as unknown as IDashboardOrder);
  };

  // TODO accordion
  // const tableAccordion = (item: ITableData) => {
  //   return (
  //     <DashboardAccordion
  //       item={item as unknown as IDashboardOrder}
  //       setScreen={setScreen}
  //       setCurrentOrder={updateCurrentOrder}
  //       setOrderSummaryActiveTab={setOrderSummaryActiveTab}
  //     />
  //   );
  // };

  const renderAccordion = orders.length !== 0 ? undefined : undefined;

  const handleSortOrderNumber = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("orderNumber")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "orderNumber", value: "descending" };
    updateOrderHistorySort([newSort]);
  };

  const handleSortAmount = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("totalInvestment")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "totalInvestment", value: "descending" };
    updateOrderHistorySort([newSort]);
  };

  const handleSortTransactionType = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("transactionType")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "transactionType", value: "descending" };
    updateOrderHistorySort([newSort]);
  };

  const handleSortStatus = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("status")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "status", value: "descending" };
    updateOrderHistorySort([newSort]);
  };

  const checkLoading = (functionToBeCalled: () => void) => {
    if (isFetching === false) {
      functionToBeCalled();
    }
  };

  const showDatePopupContent: IHeaderPopupContent[] = [
    { icon: { name: "arrow-down" }, key: "descending", text: ORDER_HISTORY.TABLE_HEADER_CREATED_ON },
    { icon: { name: "arrow-down" }, key: "descending", text: ORDER_HISTORY.TABLE_HEADER_LAST_UPDATED },
  ];

  const popupContentIndex = showDatePopupContent.findIndex((content: IHeaderPopupContent) => content.text === showDateBy.type);

  const findOrderNumber = sort.filter((sortType) => sortType.column === "orderNumber");
  const findAmount = sort.filter((sortType) => sortType.column === "totalInvestment");
  const findTransactionType = sort.filter((sortType) => sortType.column === "transactionType");
  const findStatus = sort.filter((sortType) => sortType.column === "status");
  const sortOrderNumber = findOrderNumber.length > 0 ? findOrderNumber[0].value : "ascending";
  const sortAmount = findAmount.length > 0 ? findAmount[0].value : "ascending";
  const sortTransactionType = findTransactionType.length > 0 ? findTransactionType[0].value : "ascending";
  const sortStatus = findStatus.length > 0 ? findStatus[0].value : "ascending";
  const sortedColumns = sort.map((currentSortType) => currentSortType.column);

  const columns: ITableColumn[] = [
    {
      icon: { name: sortOrderNumber === "descending" ? "arrow-down" : "arrow-up" },
      key: [
        {
          key: "orderNumber",
          textStyle: {
            ...fs12RegBlue1,
            ...fsTransformNone,
            fontFamily: sortedColumns.includes("orderNumber") ? NunitoBold : NunitoRegular,
          },
        },
      ],
      onPressHeader: () => checkLoading(handleSortOrderNumber),
      textStyle: sortedColumns.includes("orderNumber") ? { fontFamily: NunitoBold } : {},
      title: ORDER_HISTORY.TABLE_HEADER_ORDER_NUMBER,
      titleStyle: sortedColumns.includes("orderNumber") ? { ...fs10BoldBlue1, lineHeight: sh13 } : {},
      viewStyle: { width: sw152 },
    },
    {
      icon: { name: sortTransactionType === "descending" ? "arrow-down" : "arrow-up" },
      key: [
        {
          key: "transactionType",
          textStyle: { ...fs12RegBlue1, fontFamily: sortedColumns.includes("transactionType") ? NunitoBold : NunitoRegular },
        },
      ],
      onPressHeader: () => checkLoading(handleSortTransactionType),
      textStyle: fsTransformNone,
      title: ORDER_HISTORY.TABLE_HEADER_TRANSACTION_TYPE,
      titleStyle: sortedColumns.includes("transactionType")
        ? { ...fs10BoldBlue1, ...fsTransformNone, lineHeight: sh13 }
        : { ...fsTransformNone },
      viewStyle: { width: sw144 },
    },
    {
      customItem: true,
      icon: { name: sortAmount === "descending" ? "arrow-down" : "arrow-up" },
      key: [{ key: "totalInvestment" }],
      onPressHeader: () => checkLoading(handleSortAmount),
      title: ORDER_HISTORY.TABLE_HEADER_TOTAL_INVESTMENT,
      titleStyle: sortedColumns.includes("totalInvestment") ? { ...fs10BoldBlue1, lineHeight: sh13 } : {},
      viewStyle: { width: sw144 },
    },
    {
      customHeader: true,
      customItem: true,
      icon: { name: "caret-down", size: sw16 },
      itemStyle: { ...justifyContentStart, ...px(sw8) },
      key: [{ key: showDateBy.type === ORDER_HISTORY.TABLE_HEADER_CREATED_ON ? "createdOn" : "lastUpdated" }],
      title: showDateBy.type,
      viewStyle: { width: sw96, ...px(0), ...centerHorizontal },
    },
    {
      customItem: true,
      icon: { name: sortStatus === "descending" ? "arrow-down" : "arrow-up" },
      key: [{ key: "status" }],
      onPressHeader: () => checkLoading(handleSortStatus),
      onPressItem: handleShowRemarks,
      title: ORDER_HISTORY.TABLE_HEADER_ORDER_STATUS,
      titleStyle: sortedColumns.includes("status") ? { ...fs10BoldBlue1, lineHeight: sh13 } : {},
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

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  return (
    <View style={px(sw24)}>
      <CustomSpacer space={sh8} />
      <AdvanceTable
        activeAccordion={activeAccordion}
        columns={columns}
        data={isFetching === true ? [] : (orderHistory.orders as unknown as ITableData[])}
        // handleRowNavigation={handleOrderDetails}
        headerPopup={{
          content: showDatePopupContent.map((_content, contentIndex) =>
            contentIndex === popupContentIndex
              ? {
                  ..._content,
                  icon: { ..._content.icon, name: showDateBy.key === "ascending" ? "arrow-up" : "arrow-down" },
                  key: showDateBy.key,
                }
              : _content,
          ),
          onPressContent: ({ hide, text, key }) => {
            handleShowDateBy(text as TDateType, key as TSortType);
            AnimationUtils.layout({ duration: 400 });
            setTimeout(() => {
              hide();
            }, 1000);
          },
          selectedIndex: showDateBy.type === ORDER_HISTORY.TABLE_HEADER_CREATED_ON ? [0] : [1],
          title: showDateBy.type,
          viewStyle: { width: sw94 },
        }}
        RenderAccordion={renderAccordion}
        RenderCustomItem={(customItemData: ITableCustomItem) => <CustomTableItem {...customItemData} sortedColumns={sortedColumns} />}
        RenderEmptyState={() => <EmptyStateTable isFetching={isFetching} isNotFiltered={true} noTransactionsYet={false} />}
      />
    </View>
  );
};
