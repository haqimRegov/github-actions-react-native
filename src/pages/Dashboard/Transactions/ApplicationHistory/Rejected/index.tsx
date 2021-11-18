import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { AdvanceTable, CustomSpacer, EmptyTable } from "../../../../../components";
import { Language } from "../../../../../constants/language";
import { getDashboard } from "../../../../../network-actions";
import { updateSeen } from "../../../../../network-actions/dashboard/UpdateSeen";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../../store";
import { flexChild, fs12RegBlue1, fsTransformNone, px, sh32, sw104, sw123, sw136, sw152, sw16, sw176, sw32 } from "../../../../../styles";
import { CustomTableItem } from "../CustomTableItem";
import { OrderRemarks } from "../OrderRemarks";

const { DASHBOARD_HOME, EMPTY_STATE } = Language.PAGE;

interface RejectedOrdersProps extends TransactionsStoreProps {
  activeTab: boolean;
  isFetching: boolean;
  isLogout: boolean;
  navigation: IStackNavigationProp;
  setIsFetching: (value: boolean) => void;
  setScreen: (route: TransactionsPageType) => void;
}

const RejectedOrdersComponent: FunctionComponent<RejectedOrdersProps> = ({
  activeTab,
  isFetching,
  isLogout,
  navigation,
  rejected,
  search,
  setIsFetching,
  setScreen,
  transactions,
  updateCurrentOrder,
  updateRejectedSort,
  updateTransactions,
}: RejectedOrdersProps) => {
  const { filter, orders, page, sort } = rejected;
  const [activeAccordion, setActiveAccordion] = useState<number[]>([]);
  const [showDateBy, setShowDateBy] = useState<"createdOn" | "lastUpdated">("lastUpdated");

  const handleShowDateBy = (text: string) => {
    setShowDateBy(text === DASHBOARD_HOME.LABEL_LAST_UPDATED ? "lastUpdated" : "createdOn");
  };

  const handleShowRemarks = (item: ITableRowData) => {
    const { remark } = item.rawData as IDashboardOrder;
    if (remark) {
      const newSections: number[] = [...activeAccordion];
      const sectionIndex = newSections.indexOf(item.index);
      if (sectionIndex > -1) {
        newSections.splice(sectionIndex, 1);
      } else {
        newSections.splice(0, 1, item.index);
      }
      setActiveAccordion(newSections);
    }
  };

  const handleSortOrderNumber = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("orderNumber")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "orderNumber", value: "descending" };
    updateRejectedSort([newSort]);
  };

  const handleSortInvestor = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("principal")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "principal", value: "descending" };
    updateRejectedSort([newSort]);
  };

  const handleSortAmount = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("totalInvestment")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "totalInvestment", value: "descending" };
    updateRejectedSort([newSort]);
  };

  const handleSortTransactionType = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("transactionType")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "transactionType", value: "descending" };
    updateRejectedSort([newSort]);
  };

  const handleSortDueDate = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("dueDate")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "dueDate", value: "descending" };
    updateRejectedSort([newSort]);
  };

  const findOrderNumber = sort.filter((sortType) => sortType.column === "orderNumber");
  const findAmount = sort.filter((sortType) => sortType.column === "totalInvestment");
  const findPrincipal = sort.filter((sortType) => sortType.column === "principal");
  const findTransactionType = sort.filter((sortType) => sortType.column === "transactionType");
  const findDueDate = sort.filter((sortType) => sortType.column === "dueDate");
  const sortOrderNumber = findOrderNumber.length > 0 ? findOrderNumber[0].value : "ascending";
  const sortAmount = findAmount.length > 0 ? findAmount[0].value : "ascending";
  const sortPrincipal = findPrincipal.length > 0 ? findPrincipal[0].value : "ascending";
  const sortTransactionType = findTransactionType.length > 0 ? findTransactionType[0].value : "ascending";
  const sortDueDate = findDueDate.length > 0 ? findDueDate[0].value : "ascending";

  const columns: ITableColumn[] = [
    {
      icon: { name: sortOrderNumber === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "orderNumber", textStyle: { ...fs12RegBlue1, ...fsTransformNone } }],
      onPressHeader: handleSortOrderNumber,
      title: DASHBOARD_HOME.LABEL_ORDER_NO,
      viewStyle: { width: sw104 },
    },
    {
      customItem: true,
      icon: { name: sortPrincipal === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "investorName" }],
      onPressHeader: handleSortInvestor,
      title: DASHBOARD_HOME.LABEL_INVESTOR_NAME_ID_NO,
      titleStyle: { paddingLeft: sw32 },
      viewStyle: { width: sw176 },
    },
    {
      icon: { name: sortTransactionType === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "transactionType", textStyle: fs12RegBlue1 }],
      onPressHeader: handleSortTransactionType,
      textStyle: fsTransformNone,
      title: DASHBOARD_HOME.LABEL_TRANSACTION_TYPE,
      titleStyle: fsTransformNone,
      viewStyle: { width: sw104 },
    },
    {
      customItem: true,
      icon: { name: sortAmount === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "totalInvestment" }],
      onPressHeader: handleSortAmount,
      title: DASHBOARD_HOME.LABEL_TOTAL_INVESTMENTS,
      viewStyle: { width: sw152 },
    },
    {
      customHeader: true,
      customItem: true,
      icon: { name: "caret-down", size: sw16 },
      key: [{ key: showDateBy }],
      title: showDateBy === "createdOn" ? DASHBOARD_HOME.LABEL_CREATED_ON : DASHBOARD_HOME.LABEL_LAST_UPDATED,
      viewStyle: { width: sw136 },
    },
    {
      customItem: true,
      icon: { name: sortDueDate === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "status" }],
      onPressHeader: handleSortDueDate,
      onPressItem: handleShowRemarks,
      title: DASHBOARD_HOME.LABEL_TRANSACTION_STATUS,
      viewStyle: { width: sw123 },
      withAccordion: true,
    },
  ];

  const tableAccordion = (item: ITableData) => {
    const { remark, status } = item as IDashboardOrder;
    return <Fragment>{item.remark ? <OrderRemarks remarks={remark} status={status} /> : null}</Fragment>;
  };

  const handleFetch = async () => {
    setIsFetching(true);
    const filterStatus = filter.orderStatus!.map((value) => ({ column: "status", value: value }));
    const filterAccountType = filter.accountType !== "" ? [{ column: "accountType", value: filter.accountType!.split(" ")[0] }] : [];
    const defaultSort: ITransactionsSort[] = sort.length === 0 ? [{ column: "lastUpdated", value: "descending" }] : sort;
    const minimumDate = filter.startDate !== undefined ? moment(filter.startDate).startOf("day").format("x") : "0";
    const maximumDate = filter.endDate !== undefined ? moment(filter.endDate).endOf("day").format("x") : moment().endOf("day").format("x");
    const request: IDashboardRequest = {
      tab: "rejected",
      page: page,
      search: search,
      sort: defaultSort,
      filter: [
        {
          column: "transactionType",
          value: "Sales-AO",
        },
        {
          column: filter.dateSorting === "Order Creation Date" ? "createdOn" : "lastUpdated",
          value: `${minimumDate}~${maximumDate}`,
        },
        ...filterAccountType,
        ...filterStatus,
      ],
    };
    const dashboardResponse: IDashboardResponse = await getDashboard(request, navigation, setIsFetching);
    setIsFetching(false);
    if (dashboardResponse !== undefined) {
      const { data, error } = dashboardResponse;
      if (error === null && data !== null) {
        updateTransactions({
          ...transactions,
          rejected: {
            ...transactions.rejected,
            orders: data.result.orders,
            page: data.result.page,
            pages: data.result.pages,
          },
          pendingCount: data.result.pendingCount,
          approvedCount: data.result.approvedCount,
          rejectedCount: data.result.rejectedCount,
        });
      }
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
  };

  const handleOrderDetails = (item: ITableData) => {
    updateCurrentOrder(item as IDashboardOrder);
    setScreen("OrderSummary");
  };

  const handleSeen = async () => {
    setIsFetching(true);
    const request: IUpdateSeenRequest = { dashboard: "dashboard", tab: ["rejected"] };
    const updateSeenResponse: IUpdateSeenResponse = await updateSeen(request, navigation);
    if (updateSeenResponse !== undefined) {
      const { error } = updateSeenResponse;
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (isLogout !== true) {
        handleSeen();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogout]);

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, activeTab, sort, page, filter]);

  const noResults = search !== undefined && search !== "";
  const title = noResults === true ? EMPTY_STATE.LABEL_NO_RESULTS : DASHBOARD_HOME.EMPTY_TITLE_TRANSACTIONS;
  const subtitle = noResults === true ? `${EMPTY_STATE.TITLE_SEARCH} '${search}'` : DASHBOARD_HOME.EMPTY_TRANSACTIONS_SUBTITLE;
  const hintText = noResults === true ? EMPTY_STATE.SUBTITLE : undefined;

  return (
    <View style={{ ...flexChild, ...px(sw16) }}>
      <AdvanceTable
        activeAccordion={activeAccordion}
        columns={columns}
        data={isFetching === true ? [] : orders}
        handleRowNavigation={handleOrderDetails}
        headerPopup={{
          content: [
            { icon: { name: "arrow-down" }, text: DASHBOARD_HOME.LABEL_CREATED_ON },
            { icon: { name: "arrow-down" }, text: DASHBOARD_HOME.LABEL_LAST_UPDATED },
          ],
          onPressContent: ({ hide, text }) => {
            handleShowDateBy(text);
            hide();
          },
          selectedIndex: showDateBy === "createdOn" ? [0] : [1],
          title: showDateBy === "createdOn" ? DASHBOARD_HOME.LABEL_CREATED_ON : DASHBOARD_HOME.LABEL_LAST_UPDATED,
          viewStyle: { width: sw136 },
        }}
        RenderAccordion={tableAccordion}
        RenderCustomItem={(data: ITableCustomItem) => <CustomTableItem {...data} />}
        RenderEmptyState={() => <EmptyTable hintText={hintText} loading={isFetching} title={title} subtitle={subtitle} />}
      />
      <CustomSpacer space={sh32} />
    </View>
  );
};

export const RejectedOrders = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(RejectedOrdersComponent);
