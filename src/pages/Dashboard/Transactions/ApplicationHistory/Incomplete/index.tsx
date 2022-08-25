import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, Text, TouchableWithoutFeedback, View } from "react-native";
import { connect } from "react-redux";

import { AdvanceTable, CustomSpacer, StatusBadge } from "../../../../../components";
import { NunitoBold, NunitoRegular } from "../../../../../constants";
import { Language } from "../../../../../constants/language";
import { getDashboard, resubmitOrder } from "../../../../../network-actions";
import { updateSeen } from "../../../../../network-actions/dashboard/UpdateSeen";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../../store";
import {
  borderBottomGray2,
  centerHorizontal,
  centerHV,
  centerVertical,
  colorRed,
  colorWhite,
  flexChild,
  flexRow,
  fs10BoldBlue1,
  fs12RegBlue1,
  fs12RegGray4,
  fsTransformNone,
  justifyContentStart,
  px,
  sh12,
  sh13,
  sh16,
  sh2,
  sh32,
  sw1,
  sw10,
  sw128,
  sw144,
  sw152,
  sw16,
  sw160,
  sw18,
  sw192,
  sw24,
  sw32,
  sw4,
  sw56,
  sw8,
  sw80,
  sw88,
  sw92,
  sw96,
} from "../../../../../styles";
import { EmptyStateTable } from "../../../../../templates";
import { AnimationUtils, isEmpty } from "../../../../../utils";
import { CustomTableItem } from "../CustomTableItem";
import { DashboardAccordion } from "../DashboardAccordion";

const { DASHBOARD_HOME, DASHBOARD_EDD } = Language.PAGE;

interface PendingOrdersProps extends ITransactionPageProps, TransactionsStoreProps {
  downloadInitiated: boolean;
  handleShowOpenAccount: () => void;
  setDownloadInitiated: (toggle: boolean) => void;
}

const PendingOrdersComponent: FunctionComponent<PendingOrdersProps> = ({
  activeTab,
  downloadInitiated,
  handleShowOpenAccount,
  incomplete,
  isFetching,
  isLogout,
  isNotFiltered,
  navigation,
  resetPendingFilter,
  resetSelectedOrder,
  search,
  selectedOrders,
  setDownloadInitiated,
  setIsFetching,
  setOrderSummaryActiveTab,
  setScreen,
  transactions,
  updateCurrentOrder,
  updatedSelectedOrder,
  updatePendingSort,
  updateTransactions,
}: PendingOrdersProps) => {
  const { filter, orders, page, pill, sort } = incomplete;
  const { pendingCount, reroutedCount, submittedCount } = transactions;
  const fetching = useRef<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<number[]>([]);
  const [showDateBy, setShowDateBy] = useState<IShowDateBy>({ type: "Last Updated", key: "descending" });

  const handleShowDateBy = (text: TDateType, key: TSortType) => {
    const newKey = key === "ascending" ? "descending" : "ascending";
    setShowDateBy({ type: text, key: newKey });
    const sortColumns = sort.map((eachSortType) => eachSortType.column);
    const sortType: TransactionsSortColumnType = text === "Created On" ? "createdOn" : "lastUpdated";
    const newSort: ITransactionsSort = sortColumns.includes(sortType) ? { ...sort[0], value: newKey } : { column: sortType, value: newKey };
    updatePendingSort([newSort]);
  };

  const handleShowRemarks = (item: ITableRowData) => {
    if (downloadInitiated === false) {
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
    updateCurrentOrder(item as unknown as IDashboardOrder);
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
    setDownloadInitiated(true);
    setActiveAccordion([]);
  };

  const tableAccordion = (item: ITableData) => {
    return (
      <DashboardAccordion
        handleSelectOrder={handleSelectOrder}
        item={item as unknown as IDashboardOrder}
        setScreen={setScreen}
        setCurrentOrder={updateCurrentOrder}
        setOrderSummaryActiveTab={setOrderSummaryActiveTab}
      />
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

  const handleSortStatus = async () => {
    const sortColumns = sort.map((sortType) => sortType.column);
    const newSort: ITransactionsSort = sortColumns.includes("status")
      ? { ...sort[0], value: sort[0].value === "descending" ? "ascending" : "descending" }
      : { column: "status", value: "descending" };
    updatePendingSort([newSort]);
  };

  const checkLoading = (functionToBeCalled: () => void) => {
    if (isFetching === false) {
      functionToBeCalled();
    }
  };

  const showDatePopupContent: IHeaderPopupContent[] = [
    { icon: { name: "arrow-down" }, key: "descending", text: DASHBOARD_HOME.LABEL_CREATED_ON },
    { icon: { name: "arrow-down" }, key: "descending", text: DASHBOARD_HOME.LABEL_LAST_UPDATED },
  ];

  const showCheckbox = selectedOrders.length > 0 || downloadInitiated === true;

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
      textStyle: sortedColumns.includes("principal") ? { fontFamily: NunitoBold } : {},
      title: DASHBOARD_HOME.LABEL_INVESTOR_NAME_ID_NO,
      titleStyle: sortedColumns.includes("principal") ? { ...fs10BoldBlue1, lineHeight: sh13, paddingLeft: sw32 } : { paddingLeft: sw32 },
      viewStyle: { width: showCheckbox === true ? sw152 : sw160 },
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
      titleStyle: sortedColumns.includes("transactionType")
        ? { ...fs10BoldBlue1, ...fsTransformNone, lineHeight: sh13 }
        : { ...fsTransformNone },
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
      itemStyle: { ...justifyContentStart, ...px(sw8) },
      key: [{ key: showDateBy.type === DASHBOARD_HOME.LABEL_CREATED_ON ? "createdOn" : "lastUpdated" }],
      title: showDateBy.type,
      viewStyle: { width: sw96, ...px(0), ...centerHorizontal },
    },
    {
      customItem: true,
      icon: { name: sortStatus === "descending" ? "arrow-down" : "arrow-up" },
      key: [{ key: "status" }],
      onPressHeader: () => checkLoading(handleSortStatus),
      onPressItem: handleShowRemarks,
      title: DASHBOARD_HOME.LABEL_TRANSACTION_STATUS,
      titleStyle: sortedColumns.includes("status") ? { ...fs10BoldBlue1, lineHeight: sh13 } : {},
      viewStyle: { width: showCheckbox === true ? sw144 : sw192 },
    },
    {
      customItem: true,
      key: [{ key: "" }],
      title: DASHBOARD_HOME.LABEL_ACTIONS,
      viewStyle: { width: sw56, ...centerHV },
    },
  ];

  const onRowSelect = (data: ITableData) => {
    handleSelectOrder(data as unknown as IDashboardOrder);
  };

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
    const hardCopyFilter = downloadInitiated === true ? { hardcopyFilter: true } : {};

    const request: IDashboardRequest = {
      tab: pill!,
      page: page,
      search: search,
      sort: defaultSort,
      filter: updatedFilter,
      ...hardCopyFilter,
    };
    const dashboardResponse: IDashboardResponse = await getDashboard(request, navigation, setIsFetching);
    if (dashboardResponse !== undefined) {
      const { data, error } = dashboardResponse;
      if (error === null && data !== null) {
        // delay showing of New Sales modal only after response because of Modal Issue
        handleShowOpenAccount();
        updateTransactions({
          ...transactions,
          incomplete: {
            ...transactions.incomplete,
            orders: data.result.orders,
            page: data.result.page,
            pages: data.result.pages,
          },
          availableFilters: {
            accountType: data.result.filters.accountType,
            orderStatus: data.result.filters.agentStatus,
            transactionType: data.result.filters.transactionType,
          },
          incompleteCount: data.result.incompleteCount,
          approvedCount: data.result.approvedCount,
          rejectedCount: data.result.rejectedCount,
          submittedCount: data.result.submittedCount,
          reroutedCount: data.result.rerouteCount,
          pendingCount: data.result.pendingCount,
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
      const response: IResubmitOrderResponse = await resubmitOrder(request, navigation, setIsFetching);
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
    const request: IUpdateSeenRequest = { dashboard: "agentDashboardV2", tab: [incomplete.pill!] };
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

  const handlePill = async (index: number) => {
    let updatedPill: EDDNewCaseTagKey;
    switch (index) {
      case 1:
        updatedPill = "rerouted";
        break;
      case 2:
        updatedPill = "submitted";
        break;
      default:
        updatedPill = "pending";
    }
    handleSeen();
    setActiveAccordion([]);
    updateTransactions({ ...transactions, incomplete: { ...transactions.incomplete, page: 1, pages: 1, pill: updatedPill } });
  };

  const handleClearFilter = () => {
    resetPendingFilter(pill);
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
  }, [search, activeTab, sort, page, filter, pill, downloadInitiated]);

  const pills: ITagData[] = [
    { text: "Pending", pillCount: pendingCount },
    { text: "Rerouted", pillCount: reroutedCount },
    { text: "Submitted", pillCount: submittedCount },
  ];
  const actionProps = {
    handleResubmitOrder: handleResubmitOrder,
    handleSelectOrder: handleSelectOrder,
    setScreen: setScreen,
    setCurrentOrder: updateCurrentOrder,
  };

  const selectableOrders = showCheckbox === true ? selectedOrders : undefined;
  const disabledOrders = orders.map((order, index) => (order.withHardcopy === true && order.status === "Submitted" ? -1 : index));
  const noTransactionsYet = orders.length === 0 && (isEmpty(search) || search === "") && isNotFiltered === true;

  return (
    <View style={{ ...flexChild }}>
      {downloadInitiated !== true && selectedOrders.length === 0 ? (
        <Fragment>
          <View style={{ ...flexRow, ...centerVertical, ...px(sw24) }}>
            <Text style={fs12RegGray4}>{DASHBOARD_EDD.LABEL_TYPES}</Text>
            <CustomSpacer isHorizontal={true} space={sw8} />
            {pills.map((currentPill: ITagData, index: number) => {
              const { text, pillCount } = currentPill;
              const handlePress = () => {
                if (isFetching === false) {
                  handlePill(index);
                }
              };

              return (
                <View key={index} style={flexRow}>
                  <StatusBadge
                    color={text.toLowerCase() === pill ? "primary" : "secondary"}
                    onPress={handlePress}
                    style={{ ...px(sw16) }}
                    text={`${text} (${pillCount})`}
                    textStyle={{ fontFamily: NunitoBold }}
                  />
                  <CustomSpacer isHorizontal={true} space={sw8} />
                </View>
              );
            })}
          </View>
          <CustomSpacer space={sh12} />
          <View style={borderBottomGray2} />
          <CustomSpacer space={sh16} />
        </Fragment>
      ) : null}
      <View style={{ ...px(sw16), ...flexChild }}>
        <AdvanceTable
          activeAccordion={activeAccordion}
          columns={columns}
          data={isFetching === true ? [] : (orders as unknown as ITableData[])}
          disabledIndex={disabledOrders}
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
            titleStyle:
              sortedColumns.includes("lastUpdated") || sortedColumns.includes("createdOn") ? { ...fs10BoldBlue1, lineHeight: sh13 } : {},
            viewStyle: { width: sw92 },
          }}
          onRowSelect={onRowSelect}
          rowSelection={selectableOrders as unknown as ITableData[]}
          rowSelectionKey="orderNumber"
          RenderAccordion={renderAccordion}
          RenderCustomItem={(data: ITableCustomItem) => (
            <CustomTableItem {...data} downloadInitiated={downloadInitiated} sortedColumns={sortedColumns} {...actionProps} />
          )}
          RenderEmptyState={() => (
            <EmptyStateTable
              handleClearFilter={handleClearFilter}
              isFetching={isFetching}
              isNotFiltered={isNotFiltered}
              noTransactionsYet={noTransactionsYet}
              search={search}
            />
          )}
          RowSelectionItem={() => (
            <Fragment>
              {showCheckbox === true ? (
                <TouchableWithoutFeedback onPress={resetSelectedOrder}>
                  <View style={{ width: sw56, ...centerHV }}>
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
                  </View>
                </TouchableWithoutFeedback>
              ) : null}
            </Fragment>
          )}
        />
      </View>
      <CustomSpacer space={sh32} />
    </View>
  );
};

export const PendingOrders = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(PendingOrdersComponent);
