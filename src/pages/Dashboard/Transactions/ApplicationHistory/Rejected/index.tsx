import moment from "moment";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { AdvanceTable, CustomSpacer } from "../../../../../components";
import { NunitoBold, NunitoRegular } from "../../../../../constants";
import { Language } from "../../../../../constants/language";
import { getDashboard } from "../../../../../network-actions";
import { updateSeen } from "../../../../../network-actions/dashboard/UpdateSeen";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../../store";
import {
  centerHV,
  colorBlue,
  flexChild,
  fs10BoldBlue1,
  fs12RegBlue1,
  fsTransformNone,
  px,
  sh13,
  sh32,
  sw128,
  sw16,
  sw160,
  sw192,
  sw24,
  sw32,
  sw56,
  sw80,
  sw88,
  sw94,
  sw96,
} from "../../../../../styles";
import { EmptyStateTable } from "../../../../../templates";
import { AnimationUtils, isEmpty } from "../../../../../utils";
import { CustomTableItem } from "../CustomTableItem";
import { DashboardAccordion } from "../DashboardAccordion";

const { DASHBOARD_HOME } = Language.PAGE;

interface RejectedOrdersProps extends ITransactionPageProps, TransactionsStoreProps {}

const RejectedOrdersComponent: FunctionComponent<RejectedOrdersProps> = ({
  activeTab,
  isFetching,
  isLogout,
  isNotFiltered,
  navigation,
  rejected,
  resetRejectedFilter,
  search,
  setIsFetching,
  setOrderSummaryActiveTab,
  setScreen,
  transactions,
  updateCurrentOrder,
  updateRejectedSort,
  updateTransactions,
}: RejectedOrdersProps) => {
  const { filter, orders, page, sort } = rejected;
  const [activeAccordion, setActiveAccordion] = useState<number[]>([]);
  const [showDateBy, setShowDateBy] = useState<IShowDateBy>({ type: "Last Updated", key: "descending" });

  const handleShowDateBy = (text: TDateType, key: TSortType) => {
    const newKey = key === "ascending" ? "descending" : "ascending";
    setShowDateBy({ type: text, key: newKey });
    const sortColumns = sort.map((eachSortType) => eachSortType.column);
    const sortType: TransactionsSortColumnType = text === "Created On" ? "createdOn" : "lastUpdated";
    const newSort: ITransactionsSort = sortColumns.includes(sortType) ? { ...sort[0], value: newKey } : { column: sortType, value: newKey };
    updateRejectedSort([newSort]);
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

  const handleSortStatus = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("status")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "status", value: "descending" };
    updateRejectedSort([newSort]);
  };

  const handleView = (item: ITableRowData) => {
    updateCurrentOrder(item.rawData as unknown as IDashboardOrder);
    setScreen("OrderSummary");
  };

  const checkLoading = (functionToBeCalled: () => void) => {
    if (isFetching === false) {
      functionToBeCalled();
    }
  };

  const tableAccordion = (item: ITableData) => {
    return (
      <DashboardAccordion
        item={item as unknown as IDashboardOrder}
        setScreen={setScreen}
        setCurrentOrder={updateCurrentOrder}
        setOrderSummaryActiveTab={setOrderSummaryActiveTab}
      />
    );
  };

  const showDatePopupContent: IHeaderPopupContent[] = [
    { icon: { name: "arrow-down" }, key: "descending", text: DASHBOARD_HOME.LABEL_CREATED_ON },
    { icon: { name: "arrow-down" }, key: "descending", text: DASHBOARD_HOME.LABEL_LAST_UPDATED },
  ];

  const popupContentIndex = showDatePopupContent.findIndex((content: IHeaderPopupContent) => content.text === showDateBy.type);

  const findOrderNumber = sort.filter((sortType) => sortType.column === "orderNumber");
  const findAmount = sort.filter((sortType) => sortType.column === "totalInvestment");
  const findPrincipal = sort.filter((sortType) => sortType.column === "principal");
  const findTransactionType = sort.filter((sortType) => sortType.column === "transactionType");
  const findStatus = sort.filter((sortType) => sortType.column === "status");
  const sortOrderNumber = findOrderNumber.length > 0 ? findOrderNumber[0].value : "ascending";
  const sortAmount = findAmount.length > 0 ? findAmount[0].value : "ascending";
  const sortPrincipal = findPrincipal.length > 0 ? findPrincipal[0].value : "ascending";
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
      title: DASHBOARD_HOME.LABEL_ORDER_NO,
      titleStyle: sortedColumns.includes("orderNumber") ? { ...fs10BoldBlue1, lineHeight: sh13 } : {},
      viewStyle: { width: sw88 },
    },
    {
      customItem: true,
      icon: { name: sortPrincipal === "descending" ? "arrow-down" : "arrow-up" },
      key: [{ key: "investorName" }],
      onPressHeader: () => checkLoading(handleSortInvestor),
      title: DASHBOARD_HOME.LABEL_INVESTOR_NAME_ID_NO,
      titleStyle: sortedColumns.includes("principal") ? { ...fs10BoldBlue1, lineHeight: sh13, paddingLeft: sw32 } : { paddingLeft: sw32 },
      viewStyle: { width: sw160 },
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
      title: DASHBOARD_HOME.LABEL_TRANSACTION_TYPE,
      titleStyle: sortedColumns.includes("transactionType") ? { ...fs10BoldBlue1, ...fsTransformNone, lineHeight: sh13 } : fsTransformNone,
      viewStyle: { width: sw80 },
    },
    {
      customItem: true,
      icon: { name: sortAmount === "descending" ? "arrow-down" : "arrow-up" },
      key: [{ key: "totalInvestment" }],
      onPressHeader: () => checkLoading(handleSortAmount),
      title: DASHBOARD_HOME.LABEL_TOTAL_INVESTMENTS,
      titleStyle: sortedColumns.includes("totalInvestment") ? { ...fs10BoldBlue1, lineHeight: sh13 } : {},
      viewStyle: { width: sw128 },
    },
    {
      customHeader: true,
      customItem: true,
      icon: { name: "caret-down", size: sw16 },
      key: [{ key: showDateBy.type === DASHBOARD_HOME.LABEL_CREATED_ON ? "createdOn" : "lastUpdated" }],
      title: showDateBy.type,
      titleStyle:
        sortedColumns.includes("createdOn") || sortedColumns.includes("lastUpdated") ? { ...fs10BoldBlue1, lineHeight: sh13 } : {},
      viewStyle: { width: sw96 },
    },
    {
      customItem: true,
      icon: { name: sortStatus === "descending" ? "arrow-down" : "arrow-up" },
      key: [{ key: "status" }],
      onPressHeader: () => checkLoading(handleSortStatus),
      onPressItem: handleShowRemarks,
      title: DASHBOARD_HOME.LABEL_TRANSACTION_STATUS,
      titleStyle: sortedColumns.includes("status") ? { ...fs10BoldBlue1, lineHeight: sh13 } : {},
      viewStyle: { width: sw192 },
      // withAccordion: true,
    },
    {
      itemIcon: { color: colorBlue._1, name: "eye-show", size: sw24 },
      key: [],
      onPressItem: handleView,
      title: DASHBOARD_HOME.LABEL_VIEW,
      viewStyle: { ...centerHV, width: sw56 },
    },
  ];

  const renderAccordion = orders.length !== 0 ? tableAccordion : undefined;

  const handleFetch = async () => {
    setIsFetching(true);
    const filterStatus = filter.orderStatus!.map((value) => ({ column: "status", value: value }));
    const filterAccountType = filter.accountType!.map((value) => ({ column: "accountType", value: value }));
    const filterTransactionsType = filter.transactionsType!.map((value) => ({ column: "transactionType", value: value }));
    const minimumDate = filter.startDate !== undefined ? moment(filter.startDate).startOf("day").format("x") : "0";
    const maximumDate = filter.endDate !== undefined ? moment(filter.endDate).endOf("day").format("x") : moment().endOf("day").format("x");
    const checkDateSorting =
      filter.dateSorting !== "Created"
        ? {
            column: filter.dateSorting === "Created" ? "createdOn" : "lastUpdated",
            value: `${minimumDate}~${maximumDate}`,
          }
        : undefined;
    const updatedFilter = [...filterTransactionsType, ...filterAccountType, ...filterStatus];
    if (checkDateSorting !== undefined) {
      updatedFilter.push(checkDateSorting);
    }
    const checkStatusSort: ITransactionsSort[] =
      findStatus.length !== 0 ? [...sort, { column: "lastUpdated", value: "descending" }] : [...sort];
    const defaultSort: ITransactionsSort[] = sort.length === 0 ? [{ column: "lastUpdated", value: "descending" }] : checkStatusSort;
    const request: IDashboardRequest = {
      tab: "rejected",
      page: page,
      search: search,
      sort: defaultSort,
      filter: updatedFilter,
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
          availableFilters: {
            accountType: data.result.filters.accountType,
            orderStatus: data.result.filters.agentStatus,
            transactionType: data.result.filters.transactionType,
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
    updateCurrentOrder(item as unknown as IDashboardOrder);
    setScreen("OrderSummary");
  };

  const handleSeen = async () => {
    setIsFetching(true);
    const request: IUpdateSeenRequest = { dashboard: "agentDashboardV2", tab: ["rejected"] };
    const updateSeenResponse: IUpdateSeenResponse = await updateSeen(request, navigation);
    setIsFetching(false);
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

  const noTransactionsYet = orders.length === 0 && (isEmpty(search) || search === "") && isNotFiltered === true;

  return (
    <View style={{ ...flexChild, ...px(sw16) }}>
      <AdvanceTable
        activeAccordion={activeAccordion}
        columns={columns}
        data={isFetching === true ? [] : orders}
        handleRowNavigation={handleOrderDetails}
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
          selectedIndex: showDateBy.type === DASHBOARD_HOME.LABEL_CREATED_ON ? [0] : [1],
          title: showDateBy.type,
          viewStyle: { width: sw94 },
        }}
        RenderAccordion={renderAccordion}
        RenderCustomItem={(data: ITableCustomItem) => <CustomTableItem {...data} sortedColumns={sortedColumns} />}
        RenderEmptyState={() => (
          <EmptyStateTable
            handleClearFilter={resetRejectedFilter}
            isFetching={isFetching}
            isNotFiltered={isNotFiltered}
            noTransactionsYet={noTransactionsYet}
            search={search}
          />
        )}
      />
      <CustomSpacer space={sh32} />
    </View>
  );
};

export const RejectedOrders = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(RejectedOrdersComponent);
