import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, TouchableWithoutFeedback, View } from "react-native";
import { connect } from "react-redux";

import { AdvanceTable, CustomSpacer, EmptyTable } from "../../../../../components";
import { Language } from "../../../../../constants/language";
import { getDashboard, resubmitOrder } from "../../../../../network-actions";
import { updateSeen } from "../../../../../network-actions/dashboard/UpdateSeen";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../../store";
import {
  centerHorizontal,
  centerHV,
  colorRed,
  colorWhite,
  flexChild,
  fs12RegBlue1,
  fsTransformNone,
  justifyContentStart,
  px,
  sh2,
  sh32,
  sw1,
  sw10,
  sw128,
  sw148,
  sw16,
  sw170,
  sw18,
  sw32,
  sw4,
  sw56,
  sw8,
  sw80,
  sw84,
  sw92,
} from "../../../../../styles";
import { CustomTableItem } from "../CustomTableItem";
import { OrderRemarks } from "../OrderRemarks";
import { PendingOrderActions } from "./Actions";

const { EMPTY_STATE, DASHBOARD_HOME } = Language.PAGE;

export interface PendingOrdersProps extends TransactionsStoreProps {
  activeTab: boolean;
  handlePrintSummary: (orderNumber: string) => void;
  isFetching: boolean;
  navigation: IStackNavigationProp;
  setIsFetching: (value: boolean) => void;
  setScreen: (route: TransactionsPageType) => void;
}

const PendingOrdersComponent: FunctionComponent<PendingOrdersProps> = ({
  activeTab,
  handlePrintSummary,
  isFetching,
  navigation,
  pending,
  resetSelectedOrder,
  search,
  selectedOrders,
  setIsFetching,
  setScreen,
  transactions,
  updateCurrentOrder,
  updatedSelectedOrder,
  updatePendingSort,
  updateTransactions,
}: PendingOrdersProps) => {
  const { filter, orders, page, sort } = pending;
  const fetching = useRef<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<number[]>([]);
  const [showDateBy, setShowDateBy] = useState<"createdOn" | "lastUpdated">("lastUpdated");

  const handleShowDateBy = (text: string) => {
    setShowDateBy(text === DASHBOARD_HOME.LABEL_LAST_UPDATED ? "lastUpdated" : "createdOn");
  };

  const handleShowRemarks = (item: ITableRowData) => {
    const { remark, status } = item.rawData as IDashboardOrder;
    if ((status === "BR - Rerouted" || status === "HQ - Rerouted") && remark) {
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

  const handleOrderDetails = (item: ITableData) => {
    updateCurrentOrder(item as IDashboardOrder);
    setScreen("OrderSummary");
  };

  const handleSelectOrder = (order: IDashboardOrder) => {
    const sectionIndex = selectedOrders.findIndex(({ orderNumber }) => orderNumber === order.orderNumber);
    const newSelectedOrders = [...selectedOrders];
    if (sectionIndex === -1) {
      newSelectedOrders.push(order);
    } else if (sectionIndex > -1) {
      newSelectedOrders.splice(sectionIndex, 1);
    }
    updatedSelectedOrder(newSelectedOrders);
  };

  const tableAccordion = (item: ITableData) => {
    const { remark, status } = item as IDashboardOrder;
    return <Fragment>{remark ? <OrderRemarks remarks={remark} status={status} /> : null}</Fragment>;
  };

  const handleSortOrderNumber = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("orderNumber")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "orderNumber", value: "descending" };
    updatePendingSort([newSort]);
  };

  const handleSortInvestor = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("principal")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "principal", value: "descending" };
    updatePendingSort([newSort]);
  };

  const handleSortAmount = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("totalInvestment")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "totalInvestment", value: "descending" };
    updatePendingSort([newSort]);
  };

  const handleSortTransactionType = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("transactionType")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "transactionType", value: "descending" };
    updatePendingSort([newSort]);
  };

  const handleSortDueDate = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("dueDate")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "dueDate", value: "descending" };
    updatePendingSort([newSort]);
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
      viewStyle: { width: sw84 },
    },
    {
      customItem: true,
      icon: { name: sortPrincipal === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "investorName" }],
      onPressHeader: handleSortInvestor,
      title: DASHBOARD_HOME.LABEL_INVESTOR_NAME_ID_NO,
      titleStyle: { paddingLeft: sw32 },
      viewStyle: { width: sw148 },
    },
    {
      icon: { name: sortTransactionType === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "transactionType", textStyle: fs12RegBlue1 }],
      onPressHeader: handleSortTransactionType,
      textStyle: fsTransformNone,
      title: DASHBOARD_HOME.LABEL_TRANSACTION_TYPE,
      titleStyle: fsTransformNone,
      viewStyle: { width: sw80 },
    },
    {
      customItem: true,
      icon: { name: sortAmount === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "totalInvestment" }],
      onPressHeader: handleSortAmount,
      title: DASHBOARD_HOME.LABEL_TOTAL_INVESTMENTS,
      viewStyle: { width: sw128 },
    },
    {
      customHeader: true,
      customItem: true,
      icon: { name: "caret-down", size: sw16 },
      itemStyle: { ...justifyContentStart, ...px(sw8) },
      key: [{ key: showDateBy }],
      title: showDateBy === "createdOn" ? DASHBOARD_HOME.LABEL_CREATED_ON : DASHBOARD_HOME.LABEL_LAST_UPDATED,
      viewStyle: { width: sw92, ...px(0), ...centerHorizontal },
    },
    {
      customItem: true,
      icon: { name: sortDueDate === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "status" }],
      onPressHeader: handleSortDueDate,
      onPressItem: handleShowRemarks,
      title: DASHBOARD_HOME.LABEL_TRANSACTION_STATUS,
      viewStyle: { width: sw170 },
      withAccordion: true,
    },
  ];

  const onRowSelect = (data: ITableData) => {
    handleSelectOrder(data as IDashboardOrder);
  };

  const renderAccordion = orders.length !== 0 ? tableAccordion : undefined;

  const handleFetch = async () => {
    setIsFetching(true);
    const filterStatus = filter.orderStatus!.map((value) => ({ column: "status", value: value }));
    const filterAccountType = filter.accountType !== "" ? [{ column: "accountType", value: filter.accountType!.split(" ")[0] }] : [];
    const minimumDate = filter.startDate !== undefined ? moment(filter.startDate).startOf("day").format("x") : "0";
    const maximumDate = filter.endDate !== undefined ? moment(filter.endDate).endOf("day").format("x") : moment().endOf("day").format("x");
    const defaultSort: ITransactionsSort[] = sort.length === 0 ? [{ column: "lastUpdated", value: "descending" }] : sort;

    const request: IDashboardRequest = {
      tab: "pending",
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
    const dashboardResponse: IDashboardResponse = await getDashboard(request, navigation);
    if (dashboardResponse !== undefined) {
      const { data, error } = dashboardResponse;
      if (error === null && data !== null) {
        updateTransactions({
          ...transactions,
          pending: {
            ...transactions.pending,
            orders: data.result.orders,
            page: data.result.page,
            pages: data.result.pages,
          },
          pendingCount: data.result.pendingCount,
          approvedCount: data.result.approvedCount,
          rejectedCount: data.result.rejectedCount,
        });
        setIsFetching(false);
      }
      if (error !== null) {
        setIsFetching(false);
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
  };

  const handleResubmitOrder = async (orderNumber: string) => {
    if (fetching.current === false) {
      fetching.current = true;
      const request: IResubmitOrderRequest = { orderNumber: orderNumber };
      const response: IResubmitOrderResponse = await resubmitOrder(request, navigation);
      fetching.current = false;
      if (response !== undefined) {
        const { error } = response;
        if (error === null && response.data !== null) {
          if (response.data.result.status === true) {
            handleFetch();
          }
        }
        if (error !== null) {
          setTimeout(() => {
            Alert.alert(error.message);
          }, 100);
        }
      }
    }
  };

  const handleSeen = async () => {
    fetching.current = true;
    const request: IUpdateSeenRequest = { dashboard: "dashboard", tab: ["pending"] };
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
    handleFetch();
    return () => {
      handleSeen();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, activeTab, sort, page, filter]);

  const noResults = search !== undefined && search !== "";
  const title = noResults === true ? EMPTY_STATE.LABEL_NO_RESULTS : DASHBOARD_HOME.EMPTY_TITLE_TRANSACTIONS;
  const subtitle = noResults === true ? `${EMPTY_STATE.TITLE_SEARCH} '${search}'` : DASHBOARD_HOME.EMPTY_TRANSACTIONS_SUBTITLE;
  const hintText = noResults === true ? EMPTY_STATE.SUBTITLE : undefined;

  const disabledOrders = orders.map((order, index) => (order.withHardcopy === true && order.status === "Submitted" ? -1 : index));

  return (
    <View style={{ ...flexChild }}>
      <AdvanceTable
        activeAccordion={activeAccordion}
        columns={columns}
        data={isFetching === true ? [] : orders}
        disabledIndex={disabledOrders}
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
          viewStyle: { width: sw92 },
        }}
        onRowSelect={onRowSelect}
        rowSelection={selectedOrders}
        rowSelectionKey="orderNumber"
        RenderAccordion={renderAccordion}
        RenderCustomItem={(data: ITableCustomItem) => <CustomTableItem {...data} />}
        RenderEmptyState={() => <EmptyTable hintText={hintText} loading={isFetching} title={title} subtitle={subtitle} />}
        RenderOptions={(props: ITableOptions) => (
          <PendingOrderActions
            {...props}
            handleResubmitOrder={handleResubmitOrder}
            handlePrintSummary={handlePrintSummary}
            setScreen={setScreen}
            setCurrentOrder={updateCurrentOrder}
          />
        )}
        RowSelectionItem={() => (
          <TouchableWithoutFeedback onPress={resetSelectedOrder}>
            <View style={{ width: sw56, ...centerHV }}>
              {selectedOrders.length > 0 ? (
                <View
                  style={{
                    ...centerHV,
                    backgroundColor: colorRed._1,
                    borderRadius: sw4,
                    height: sw18,
                    width: sw18,
                  }}>
                  <View style={{ backgroundColor: colorWhite._1, height: sh2, width: sw10, borderRadius: sw1 }} />
                </View>
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        )}
      />
      <CustomSpacer space={sh32} />
    </View>
  );
};

export const PendingOrders = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(PendingOrdersComponent);
