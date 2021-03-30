import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { AdvanceTable, CustomSpacer, EmptyTable, LinkText, MenuPopup } from "../../../../../components";
import { Language } from "../../../../../constants/language";
import { IcoMoon } from "../../../../../icons";
import { getDashboard } from "../../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../../store";
import {
  centerVertical,
  flexChild,
  flexRow,
  fs10RegBlue38,
  fs12BoldBlue2,
  fs12RegBlue2,
  fs12RegBlue6,
  fsTransformNone,
  px,
  py,
  sh32,
  sh4,
  sh8,
  sw039,
  sw104,
  sw120,
  sw123,
  sw136,
  sw152,
  sw16,
  sw176,
  sw32,
  sw4,
  sw8,
} from "../../../../../styles";
import { CustomTableItem } from "../CustomTableItem";

const { DASHBOARD_HOME, EMPTY_STATE } = Language.PAGE;

export interface ApprovedOrdersProps extends TransactionsStoreProps {
  activeTab: boolean;
  isFetching: boolean;
  navigation: IStackNavigationProp;
  setIsFetching: (value: boolean) => void;
  setScreen: (route: TransactionsPageType) => void;
}

const ApprovedOrdersComponent: FunctionComponent<ApprovedOrdersProps> = ({
  activeTab,
  approved,
  isFetching,
  navigation,
  search,
  setIsFetching,
  setScreen,
  transactions,
  updateApprovedSort,
  updateCurrentOrder,
  updateTransactions,
}: ApprovedOrdersProps) => {
  const { filter, orders, page, sort } = approved;
  const [showDateBy, setShowDateBy] = useState<"createdOn" | "lastUpdated">("lastUpdated");

  const handleShowDateBy = () => {
    setShowDateBy(showDateBy === "createdOn" ? "lastUpdated" : "createdOn");
  };

  const handleSortOrderNumber = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("orderNumber")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "orderNumber", value: "descending" };
    updateApprovedSort([newSort]);
  };

  const handleSortInvestor = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("principal")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "principal", value: "descending" };
    updateApprovedSort([newSort]);
  };

  const handleSortAmount = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("totalInvestment")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "totalInvestment", value: "descending" };
    updateApprovedSort([newSort]);
  };

  const handleSortTransactionType = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("transactionType")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "transactionType", value: "descending" };
    updateApprovedSort([newSort]);
  };

  const handleSortDueDate = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("dueDate")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "dueDate", value: "descending" };
    updateApprovedSort([newSort]);
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
      title: DASHBOARD_HOME.LABEL_ORDER_NO,
      viewStyle: { width: sw104 },
    },
    {
      customItem: true,
      icon: { name: sortPrincipal === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "investorName", textStyle: { ...fsTransformNone, ...fs12BoldBlue2 } }],
      onPressHeader: handleSortInvestor,
      title: DASHBOARD_HOME.LABEL_INVESTOR_NAME_ID_NO,
      titleStyle: { paddingLeft: sw32 },
      viewStyle: { width: sw176 },
    },
    {
      icon: { name: sortTransactionType === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "transactionType", textStyle: fs12BoldBlue2 }],
      onPressHeader: handleSortTransactionType,
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
      key: [{ key: showDateBy, textStyle: fs12RegBlue2 }],
      onPressHeader: handleShowDateBy,
      title: showDateBy === "createdOn" ? DASHBOARD_HOME.LABEL_CREATED_ON : "Last Updated",
      viewStyle: { width: sw136 },
    },
    {
      customItem: true,
      icon: { name: sortDueDate === "descending" ? "arrow-up" : "arrow-down" },
      key: [{ key: "status" }],
      onPressHeader: handleSortDueDate,
      title: DASHBOARD_HOME.LABEL_TRANSACTION_STATUS,
      viewStyle: { width: sw123 },
    },
  ];

  const handleFetch = async () => {
    setIsFetching(true);
    const filterStatus = filter.orderStatus!.map((value) => ({ column: "status", value: value }));
    const filterAccountType = filter.accountType !== "" ? [{ column: "accountType", value: filter.accountType!.split(" ")[0] }] : [];
    const defaultSort: ITransactionsSort[] = sort.length === 0 ? [{ column: "lastUpdated", value: "descending" }] : sort;
    const minimumDate = filter.startDate !== undefined ? moment(filter.startDate).startOf("day").format("x") : "0";
    const maximumDate = filter.endDate !== undefined ? moment(filter.endDate).endOf("day").format("x") : moment().endOf("day").format("x");
    const request: IDashboardRequest = {
      tab: "approved",
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
    // eslint-disable-next-line no-console
    console.log("getDashboard request", request);
    const dashboardResponse: IDashboardResponse = await getDashboard(request, navigation);
    setIsFetching(false);
    if (dashboardResponse !== undefined) {
      const { data, error } = dashboardResponse;
      if (error === null && data !== null) {
        updateTransactions({
          ...transactions,
          approved: {
            ...transactions.approved,
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
        columns={columns}
        data={isFetching === true ? [] : orders}
        handleRowNavigation={handleOrderDetails}
        RenderCustomHeader={({ item }) => {
          return (
            <MenuPopup
              RenderButton={({ show }) => {
                const headerStyle: ViewStyle = { ...flexRow, ...centerVertical, ...px(sw8), width: sw136 };
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
        RenderEmptyState={() => <EmptyTable loading={isFetching} hintText={hintText} title={title} subtitle={subtitle} />}
      />
      <CustomSpacer space={sh32} />
    </View>
  );
};

export const ApprovedOrders = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(ApprovedOrdersComponent);
