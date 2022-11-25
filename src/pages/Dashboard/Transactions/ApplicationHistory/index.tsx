import moment from "moment";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { CustomFlexSpacer, CustomSpacer, CustomToast, Pagination, PromptModal, SelectionBanner, TabGroup } from "../../../../components";
import { Language } from "../../../../constants";
import { RNShareApi } from "../../../../integrations";
import { getSummaryReceipt } from "../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import {
  alignFlexStart,
  borderBottomGray2,
  centerVertical,
  colorBlue,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldBlue8,
  fs16RegGray6,
  fsAlignLeft,
  fullHW,
  sh1,
  sh112,
  sh153,
  sh16,
  sh24,
  sh32,
  shadow12Black112,
  sw16,
  sw24,
} from "../../../../styles";
import { deleteKey } from "../../../../utils";
import { DashboardLayout, IDashboardLayoutRef } from "../../DashboardLayout";
import { ApprovedOrders } from "./Approved";
import { ApplicationHistoryHeader } from "./Header";
import { PendingOrders } from "./Incomplete";
import { RejectedOrders } from "./Rejected";

const { DASHBOARD_HOME } = Language.PAGE;

interface ApplicationHistoryProps extends TransactionsStoreProps {
  activeTab: TransactionsTabType;
  navigation: IStackNavigationProp;
  setActiveTab: (route: TransactionsTabType) => void;
  setOrderSummaryActiveTab: (tab: OrderSummaryTabType) => void;
  setPage: (page: DashboardPageType) => void;
  setScreen: (route: TransactionsPageType) => void;
}

export const ApplicationHistoryComponent: FunctionComponent<ApplicationHistoryProps> = (props: ApplicationHistoryProps) => {
  const {
    activeTab,
    addClientDirectToAccountOpening,
    addClientNewFund,
    availableFilters,
    downloadInitiated,
    incomplete,
    navigation,
    resetApprovedFilter,
    resetPendingFilter,
    resetRejectedFilter,
    search,
    selectedOrders,
    setActiveTab,
    setOrderSummaryActiveTab,
    setScreen,
    showOpenAccount,
    transactions,
    updateApprovedFilter,
    updateDownloadInitiated,
    updatedSelectedOrder,
    updatePendingFilter,
    updateRejectedFilter,
    updateSearch,
    updateTransactions,
  } = props;
  const { approvedCount, incompleteCount, rejectedCount } = transactions;
  const initialFilter = {
    dateSorting: "",
    startDate: undefined,
    transactionsType: [],
    accountType: [],
    orderStatus: [],
  };

  const { filter, orders, page, pages, pill } = props[activeTab];

  const filterSpecs = deleteKey({ ...filter }, ["endDate"]);
  const fetching = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [filterTemp, setFilterTemp] = useState<ITransactionsFilter>(filter);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>(search);
  const [cancelPrompt, setCancelPrompt] = useState<boolean>(false);
  const [tempTab, setTempTab] = useState<TransactionsTabType | undefined>(undefined);
  const [downloadToastCount, setDownloadToastCount] = useState<number>(selectedOrders.length);
  const [downloadToast, setDownloadToast] = useState<boolean>(false);
  const dashboardLayoutRef = useRef<IDashboardLayoutRef>();

  const tabs: TransactionsTabType[] = ["incomplete", "rejected", "approved"];
  const activeTabIndex = tabs.indexOf(activeTab);

  const isNotFiltered =
    filter.dateSorting === "" &&
    filter.startDate === undefined &&
    filter.transactionsType!.length === 0 &&
    filter.accountType!.length === 0 &&
    filter.orderStatus!.length === 0 &&
    moment().diff(moment(filter.endDate), "days") === 0;

  const resetFilter = () => {
    if (isNotFiltered === false) {
      switch (activeTab) {
        case "incomplete":
          resetPendingFilter();
          break;
        case "rejected":
          resetRejectedFilter();
          break;
        case "approved":
          resetApprovedFilter();
          break;

        default:
          break;
      }
    }
  };

  const handleNewSales = () => {
    addClientNewFund(true);
  };

  const handleAccountOpening = () => {
    addClientDirectToAccountOpening(true);
  };

  const handleTabs = (index: number) => {
    setLoading(true);
    if (downloadInitiated === true && activeTab === "incomplete") {
      setTempTab(tabs[index]);
      setCancelPrompt(true);
    } else {
      // reset current tab filter before moving to another tab
      resetFilter();
      updateSearch("");
      setInputSearch("");
      setActiveTab(tabs[index]);
    }
  };

  const handleNext = () => {
    if (loading === false) {
      updateTransactions({
        ...transactions,
        [activeTab]: {
          ...transactions[activeTab],
          page: page + 1,
        },
      });
    }
  };

  const handlePrev = () => {
    if (loading === false) {
      updateTransactions({
        ...transactions,
        [activeTab]: {
          ...transactions[activeTab],
          page: page - 1,
        },
      });
    }
  };

  const handleSearch = () => {
    if (filterVisible === false) {
      updateSearch(inputSearch);
    }
  };

  const handleSummaryReceipt = async (request: ISummaryReceiptRequest) => {
    setButtonLoading(true);
    if (fetching.current === false) {
      fetching.current = true;
      const response: ISummaryReceiptResponse = await getSummaryReceipt(request, navigation, setLoading);
      fetching.current = false;
      setButtonLoading(false);
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          const documents = data.result.pdf.map((file: FileBase64) => `data:${file.type};base64,${file.base64}`);
          if (data.result.pdf.length > 0) {
            const share = await RNShareApi.filesBase64(documents);
            if (share !== undefined) {
              setDownloadToastCount(selectedOrders.length);
              updatedSelectedOrder([]);
              updateDownloadInitiated(false);
              setDownloadToast(true);
            }
          } else {
            // setLoading(false);
            setTimeout(() => {
              Alert.alert(data.result.message);
            }, 100);
          }
        }
        if (error !== null) {
          // setLoading(false);
          setTimeout(() => {
            Alert.alert(error.message);
          }, 100);
        }
      }
    }
  };

  const handleClear = () => {
    updatedSelectedOrder([]);
  };

  const handleCancel = () => {
    setCancelPrompt(true);
  };

  const handleBack = () => {
    setCancelPrompt(false);
  };

  const handleProceed = () => {
    setCancelPrompt(false);
    updateDownloadInitiated(false);
    updatedSelectedOrder([]);
    if (tempTab !== undefined) {
      setActiveTab(tempTab);
    }
  };

  const handlePrintSelected = () => {
    const downloadOrders = selectedOrders.map(({ orderNumber }) => orderNumber);
    handleSummaryReceipt({ all: false, orders: downloadOrders });
  };

  const handleShowFilter = () => {
    if (filterVisible === false) {
      setFilterTemp(filter);
    }
    setFilterVisible(!filterVisible);
  };

  const handleResetFilter = () => {
    switch (activeTab) {
      case "approved":
        resetApprovedFilter();
        break;
      case "rejected":
        resetRejectedFilter();
        break;
      default:
        resetPendingFilter(pill);
        break;
    }
    updateSearch(inputSearch);
  };

  const handleConfirmFilter = (filterProp?: ITransactionsFilter) => {
    const updatedFilter = filterProp !== undefined ? filterProp : filterTemp;
    switch (activeTab) {
      case "approved":
        updateApprovedFilter(updatedFilter);
        break;
      case "rejected":
        updateRejectedFilter(updatedFilter);
        break;
      default:
        updatePendingFilter(updatedFilter);
        break;
    }
    updateSearch(inputSearch);
  };

  const handleCancelFilter = () => {
    setFilterTemp(filter);
  };

  useEffect(() => {
    if (downloadToast === false) {
      setDownloadToastCount(0);
    }
  }, [downloadToast]);

  const handleShowOpenAccount = () => {
    if (showOpenAccount === true && dashboardLayoutRef.current !== null && dashboardLayoutRef.current !== undefined) {
      dashboardLayoutRef.current.setAddClient(true);
    }
  };

  const tabProps: Omit<ITransactionPageProps, "activeTab"> = {
    isFetching: loading,
    isNotFiltered: isNotFiltered,
    navigation: navigation,
    setIsFetching: setLoading,
    setOrderSummaryActiveTab,
    setScreen: setScreen,
  };

  let content: JSX.Element;

  if (activeTab === "incomplete") {
    content = (
      <PendingOrders
        {...tabProps}
        activeTab={activeTab === "incomplete"}
        handleShowOpenAccount={handleShowOpenAccount}
        setDownloadInitiated={updateDownloadInitiated}
      />
    );
  } else if (activeTab === "approved") {
    content = <ApprovedOrders {...tabProps} activeTab={activeTab === "approved"} />;
  } else {
    content = <RejectedOrders {...tabProps} activeTab={activeTab === "rejected"} />;
  }
  const selectionText =
    incomplete?.orders !== undefined && selectedOrders.length > 1
      ? DASHBOARD_HOME.LABEL_ORDERS_SELECTED
      : DASHBOARD_HOME.LABEL_ORDER_SELECTED;

  const submittedWithHardCopyCount = orders.filter(
    (eachOrder: IDashboardOrder) => eachOrder.status === "Submitted" && eachOrder.withHardcopy === true,
  );

  const bannerText =
    selectedOrders.length === orders.length && submittedWithHardCopyCount.length > 1
      ? `${DASHBOARD_HOME.LABEL_ALL}(${selectedOrders.length}) ${selectionText}`
      : `${selectedOrders.length} ${selectionText}`;
  const toastText =
    selectedOrders.length > 1
      ? `${downloadToastCount} ${DASHBOARD_HOME.LABEL_RECEIPTS_DOWNLOADED}`
      : `${downloadToastCount} ${DASHBOARD_HOME.LABEL_RECEIPT_DOWNLOADED}`;

  const tableContainer: ViewStyle = {
    ...flexChild,
    backgroundColor: colorWhite._2,
    borderBottomRightRadius: sw24,
    borderBottomLeftRadius: sw24,
  };

  return (
    <View style={fullHW}>
      <DashboardLayout
        handleAccountOpening={handleAccountOpening}
        handleNewSales={handleNewSales}
        scrollEnabled={!filterVisible}
        ref={dashboardLayoutRef}
        {...props}>
        <View style={flexChild}>
          <ApplicationHistoryHeader
            activeTab={activeTab}
            availableFilters={availableFilters}
            tempFilter={filterTemp}
            currentFilter={filter}
            filterVisible={filterVisible}
            handleCancel={handleCancelFilter}
            handleConfirm={handleConfirmFilter}
            handleResetFilter={handleResetFilter}
            handleSearch={handleSearch}
            handleShowFilter={handleShowFilter}
            inputSearch={inputSearch}
            isNotFiltered={isNotFiltered}
            prevSearch={search}
            setFilter={setFilterTemp}
            setInputSearch={setInputSearch}
          />
          <CustomSpacer space={sh24} />
          <View
            style={{
              ...flexChild,
              ...shadow12Black112,
              marginHorizontal: sw24,
              backgroundColor: colorWhite._2,
              borderRadius: sw24,
            }}>
            <CustomSpacer space={sh153} />
            <CustomSpacer space={sh16} />
            {(JSON.stringify(filterSpecs) === JSON.stringify(initialFilter)) === false ? <CustomSpacer space={sh32} /> : null}

            <View style={flexRow}>
              <TabGroup
                activeTab={activeTabIndex}
                containerStyle={borderBottomGray2}
                setActiveTab={handleTabs}
                tabs={[
                  { badgeCount: incompleteCount, text: DASHBOARD_HOME.LABEL_INCOMPLETE },
                  { badgeCount: rejectedCount, text: DASHBOARD_HOME.LABEL_REJECTED },
                  { badgeCount: approvedCount, text: DASHBOARD_HOME.LABEL_APPROVED },
                ]}
              />
              <View style={{ ...flexRow, ...flexChild, ...borderBottomGray2 }}>
                <CustomFlexSpacer />
                <Pagination onPressNext={handleNext} onPressPrev={handlePrev} page={page} totalPages={pages} />
                <CustomSpacer isHorizontal={true} space={sw24} />
              </View>
            </View>
            <CustomSpacer space={sh16} />
            <View style={tableContainer}>{content}</View>
          </View>
        </View>
        <CustomSpacer space={sh24} />
        {selectedOrders.length !== 0 && activeTab === "incomplete" ? <CustomSpacer space={sh112} /> : null}
      </DashboardLayout>
      {downloadInitiated === true && activeTab === "incomplete" ? (
        <SelectionBanner
          bottomContent={
            <View style={{ ...flexRow, ...centerVertical }}>
              <Text style={fs16RegGray6}>{bannerText}</Text>
              <CustomSpacer isHorizontal={true} space={sw16} />
              <TouchableWithoutFeedback onPress={handleClear}>
                <View style={{ borderBottomColor: colorBlue._8, borderBottomWidth: sh1 }}>
                  <Text style={fs12BoldBlue8}>{DASHBOARD_HOME.LABEL_CLEAR_ALL}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          }
          cancelOnPress={handleCancel}
          continueLoading={buttonLoading}
          label={DASHBOARD_HOME.LABEL_SUBMISSION_SUMMARY}
          labelCancel={DASHBOARD_HOME.BUTTON_CANCEL}
          labelSubmit={DASHBOARD_HOME.BUTTON_DOWNLOAD}
          submitOnPress={handlePrintSelected}
        />
      ) : null}
      <CustomToast parentVisible={downloadToast} deleteText={toastText} setParentVisible={setDownloadToast} />
      <PromptModal
        backdropOpacity={loading ? 0.4 : undefined}
        contentStyle={alignFlexStart}
        handleCancel={handleBack}
        handleContinue={handleProceed}
        label={DASHBOARD_HOME.LABEL_CANCEL_PROMPT_TITLE}
        labelCancel={DASHBOARD_HOME.BUTTON_GO_BACK}
        labelContinue={DASHBOARD_HOME.BUTTON_YES}
        labelStyle={fsAlignLeft}
        title={DASHBOARD_HOME.LABEL_CANCEL_PROMPT_SUBTITLE}
        titleStyle={fsAlignLeft}
        visible={cancelPrompt}
      />
    </View>
  );
};

export const ApplicationHistory = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(ApplicationHistoryComponent);
