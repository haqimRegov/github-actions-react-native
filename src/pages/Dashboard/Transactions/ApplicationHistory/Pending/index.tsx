import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { AdvanceTable, CustomSpacer, EmptyTable, LinkText, MenuPopup } from "../../../../../components";
import { Language } from "../../../../../constants/language";
import { IcoMoon } from "../../../../../icons";
import { getDashboard, resubmitOrder } from "../../../../../network-actions/dashboard";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../../store";
import {
  centerHorizontal,
  centerHV,
  centerVertical,
  colorRed,
  colorWhite,
  flexChild,
  flexRow,
  fs10RegBlue38,
  fs12BoldBlue2,
  fs12RegBlue2,
  fs12RegBlue6,
  fsTransformNone,
  px,
  py,
  sh2,
  sh32,
  sh4,
  sh8,
  sw039,
  sw1,
  sw112,
  sw120,
  sw152,
  sw16,
  sw166,
  sw32,
  sw4,
  sw56,
  sw8,
  sw80,
  sw96,
} from "../../../../../styles";
import { CustomTableItem } from "../CustomTableItem";
import { EDDReasons } from "../EDDReasons";
import { PendingOrderActions } from "./Actions";

const { EMPTY_STATE, DASHBOARD_HOME } = Language.PAGE;

export interface PendingOrdersProps extends TransactionsStoreProps {
  activeTab: boolean;
  handlePrintSummary: (orderNumber: string) => void;
  navigation: IStackNavigationProp;
  setScreen: (route: TransactionsPageType) => void;
}

const PendingOrdersComponent: FunctionComponent<PendingOrdersProps> = ({
  activeTab,
  handlePrintSummary,
  pending,
  resetSelectedOrder,
  search,
  selectedOrders,
  setScreen,
  transactions,
  updateCurrentOrder,
  updatedSelectedOrder,
  updatePendingSort,
  updateTransactions,
}: PendingOrdersProps) => {
  const { filter, orders, page, sort } = pending;
  const [loading, setLoading] = useState<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<number[]>([]);
  const [showDateBy, setShowDateBy] = useState<"createdOn" | "lastUpdated">("lastUpdated");

  const handleShowDateBy = () => {
    setShowDateBy(showDateBy === "createdOn" ? "lastUpdated" : "createdOn");
  };

  const handleShowEDDReasons = (item: ITableRowData) => {
    const { status } = item.rawData as IDashboardOrder;
    if (status === "BR - Rerouted" || status === "HQ - Rerouted") {
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
    return (
      <Fragment>
        {item.remark !== undefined ? (
          <Fragment>
            <EDDReasons data={item.remark} />
          </Fragment>
        ) : null}
      </Fragment>
    );
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
      key: [{ key: "orderNumber", textStyle: { ...fs12RegBlue6, ...fsTransformNone, letterSpacing: -sw039 } }],
      onPressHeader: handleSortOrderNumber,
      viewStyle: {
        width: sw96,
      },
      title: DASHBOARD_HOME.LABEL_ORDER_NO,
    },
    {
      customItem: true,
      icon: { name: sortPrincipal === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "investorName", textStyle: { ...fsTransformNone, ...fs12BoldBlue2 } }],
      titleStyle: { paddingLeft: sw32 },
      onPressHeader: handleSortInvestor,
      viewStyle: {
        width: sw152,
      },
      title: DASHBOARD_HOME.LABEL_INVESTOR_NAME_ID_NO,
    },
    {
      icon: { name: sortTransactionType === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "transactionType", textStyle: fs12BoldBlue2 }],
      onPressHeader: handleSortTransactionType,
      viewStyle: {
        width: sw80,
      },
      title: DASHBOARD_HOME.LABEL_TRANSACTION_TYPE,
      titleStyle: fsTransformNone,
    },
    {
      customItem: true,
      icon: { name: sortAmount === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "totalInvestment" }],
      onPressHeader: handleSortAmount,
      viewStyle: {
        width: sw112,
      },
      title: DASHBOARD_HOME.LABEL_TOTAL_INVESTMENTS,
    },
    {
      customHeader: true,
      customItem: true,
      icon: {
        name: "caret-down",
        size: sw16,
      },
      key: [{ key: showDateBy, textStyle: fs12RegBlue2 }],
      onPressHeader: handleShowDateBy,
      viewStyle: {
        width: sw96,
        ...px(0),
        ...centerHorizontal,
      },
      title: showDateBy === "createdOn" ? DASHBOARD_HOME.LABEL_CREATED_ON : "Last Updated",
    },
    {
      icon: { name: sortDueDate === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "status" }],
      onPressHeader: handleSortDueDate,
      viewStyle: { width: sw166 },
      customItem: true,
      title: DASHBOARD_HOME.LABEL_TRANSACTION_STATUS,
      onPressItem: handleShowEDDReasons,
      withAccordion: true,
    },
  ];

  const onRowSelect = (data: ITableData) => {
    handleSelectOrder(data as IDashboardOrder);
  };

  const renderAccordion = orders.length !== 0 ? tableAccordion : undefined;

  const handleFetch = async () => {
    setLoading(true);
    const filterStatus = filter.orderStatus!.map((value) => ({ column: "status", value: value }));
    const filterAccountType = filter.accountType !== "" ? [{ column: "accountType", value: filter.accountType!.split(" ")[0] }] : [];
    // const minimumDate =
    //   filter.startDate !== undefined ? moment(filter.startDate).format("x") : moment("01/01/2000", DEFAULT_DATE_FORMAT).format("x");
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
        // {
        //   column: "lastUpdated",
        //   value: `${minimumDate}~${moment(filter.endDate).format("x")}`,
        // },
        // {
        //   column: filter.dateSorting === "Order Creation Date" ? "createdOn" : "lastUpdated",
        //   value: `${minimumDate}~${moment(filter.endDate!).valueOf()}`,
        // },
        ...filterAccountType,
        ...filterStatus,
      ],
    };
    // eslint-disable-next-line no-console
    console.log("getDashboard request", request);
    const dashboardResponse: IDashboardResponse = await getDashboard(request);

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
        setLoading(false);
      }
      if (error !== null) {
        setLoading(false);
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
  };

  const handleResubmitOrder = async (orderNumber: string) => {
    const request: IResubmitOrderRequest = { orderNumber: orderNumber };
    // eslint-disable-next-line no-console
    console.log("resubmitOrder request", request);
    const response: IResubmitOrderResponse = await resubmitOrder(request);
    // eslint-disable-next-line no-console
    console.log("resubmitOrder response", response);

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
  };

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, activeTab, sort, page, filter]);

  const noResults = search !== undefined && search !== "";
  const title = noResults === true ? EMPTY_STATE.LABEL_NO_RESULTS : DASHBOARD_HOME.EMPTY_TITLE_TRANSACTIONS;
  const subtitle = noResults === true ? `${EMPTY_STATE.TITLE_SEARCH} '${search}'` : DASHBOARD_HOME.EMPTY_TRANSACTIONS_SUBTITLE;
  const hintText = noResults === true ? EMPTY_STATE.SUBTITLE : undefined;

  return (
    <View style={flexChild}>
      <AdvanceTable
        activeAccordion={activeAccordion}
        columns={columns}
        data={loading === true ? [] : orders}
        rowSelection={selectedOrders}
        rowSelectionKey="orderNumber"
        onRowSelect={onRowSelect}
        handleRowNavigation={handleOrderDetails}
        RenderAccordion={renderAccordion}
        RenderCustomHeader={({ item }) => {
          return (
            <MenuPopup
              RenderButton={({ show }) => {
                const headerStyle: ViewStyle = { ...flexRow, ...centerVertical, ...px(sw8), width: sw96 };
                return (
                  <TouchableWithoutFeedback onPress={show}>
                    <View style={headerStyle}>
                      <Text style={fs10RegBlue38}>{item.title}</Text>
                      {item.icon === undefined ? null : (
                        <Fragment>
                          <CustomSpacer isHorizontal={true} space={sw4} />
                          <IcoMoon {...item.icon} />
                        </Fragment>
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                );
              }}
              RenderContent={({ hide }) => {
                const handleToggle = () => {
                  handleShowDateBy();
                  hide();
                };
                return (
                  <View style={{ width: sw120, ...px(sw16), ...py(sh8) }}>
                    <LinkText
                      onPress={handleToggle}
                      style={{ ...fs12BoldBlue2, ...py(sh4) }}
                      text={showDateBy === "createdOn" ? "Last Updated" : DASHBOARD_HOME.LABEL_CREATED_ON}
                    />
                  </View>
                );
              }}
            />
          );
        }}
        RenderCustomItem={(data: ITableCustomItem) => <CustomTableItem {...data} />}
        RenderEmptyState={() => <EmptyTable hintText={hintText} loading={loading} title={title} subtitle={subtitle} />}
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
                    height: sw16,
                    width: sw16,
                  }}>
                  <View style={{ backgroundColor: colorWhite._1, height: sh2, width: sw8, borderRadius: sw1 }} />
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
