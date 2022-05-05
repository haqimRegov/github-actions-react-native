import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, Text, View, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { connect } from "react-redux";

import { CustomFlexSpacer, CustomSpacer, CustomToast, Pagination, SelectionBanner, TabGroup } from "../../../../components";
import { Language } from "../../../../constants";
import { RNShareApi } from "../../../../integrations";
import { getSummaryReceipt } from "../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import {
  borderBottomGray2,
  centerVertical,
  colorBlue,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldBlue8,
  fs16RegGray6,
  fullHW,
  sh1,
  sh112,
  sh153,
  sh16,
  sh24,
  shadow12Black112,
  sw16,
  sw24,
} from "../../../../styles";
import { DashboardLayout } from "../../DashboardLayout";
import { ApprovedOrders } from "./Approved";
import { ApplicationHistoryHeader } from "./Header";
import { PendingOrders } from "./Pending";
import { RejectedOrders } from "./Rejected";

const { DASHBOARD_HOME } = Language.PAGE;

interface ApplicationHistoryProps extends TransactionsStoreProps {
  activeTab: TransactionsTabType;
  isLogout: boolean;
  navigation: IStackNavigationProp;
  setActiveTab: (route: TransactionsTabType) => void;
  setOrderSummaryActiveTab: (tab: OrderSummaryTabType) => void;
  setScreen: (route: TransactionsPageType) => void;
}

export const ApplicationHistoryComponent: FunctionComponent<ApplicationHistoryProps> = (props: ApplicationHistoryProps) => {
  const {
    activeTab,
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
    transactions,
    updateApprovedFilter,
    updatedSelectedOrder,
    updatePendingFilter,
    updateRejectedFilter,
    updateSearch,
    updateTransactions,
  } = props;
  const { approvedCount, incompleteCount, rejectedCount } = transactions;

  const { filter, orders, page, pages } = props[activeTab];
  const fetching = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [filterTemp, setFilterTemp] = useState<ITransactionsFilter>(filter);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>(search);
  const [downloadInitiated, setDownloadInitiated] = useState<boolean>(false);
  const [downloadToast, setDownloadToast] = useState<boolean>(false);

  const tabs: TransactionsTabType[] = ["incomplete", "rejected", "approved"];
  const activeTabIndex = tabs.indexOf(activeTab);

  const handleTabs = (index: number) => {
    setActiveTab(tabs[index]);
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
              setDownloadToast(true);
              setDownloadInitiated(false);
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
    updatedSelectedOrder([]);
    setDownloadInitiated(false);
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
        resetPendingFilter();
        break;
    }
    updateSearch(inputSearch);
  };

  const handleConfirmFilter = () => {
    switch (activeTab) {
      case "approved":
        updateApprovedFilter(filterTemp);
        break;
      case "rejected":
        updateRejectedFilter(filterTemp);
        break;
      default:
        updatePendingFilter(filterTemp);
        break;
    }
    updateSearch(inputSearch);
  };

  const handleCancelFilter = () => {
    setFilterTemp(filter);
  };

  useEffect(() => {
    if (downloadToast === false) {
      updatedSelectedOrder([]);
    }
  }, [downloadToast]);

  const tabProps = {
    setScreen: setScreen,
    navigation: navigation,
    isFetching: loading,
    isLogout: props.isLogout,
    setIsFetching: setLoading,
    setOrderSummaryActiveTab,
  };
  let content: JSX.Element;

  if (activeTab === "incomplete") {
    content = (
      <PendingOrders
        activeTab={activeTab === "incomplete"}
        downloadInitiated={downloadInitiated}
        setDownloadInitiated={setDownloadInitiated}
        {...tabProps}
      />
    );
  } else if (activeTab === "approved") {
    content = <ApprovedOrders activeTab={activeTab === "approved"} {...tabProps} />;
  } else {
    content = <RejectedOrders activeTab={activeTab === "rejected"} {...tabProps} />;
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
      ? `${selectedOrders.length} ${DASHBOARD_HOME.LABEL_RECEIPTS_DOWNLOADED}`
      : `${selectedOrders.length} ${DASHBOARD_HOME.LABEL_RECEIPT_DOWNLOADED}`;

  const tableContainer: ViewStyle = {
    ...flexChild,
    backgroundColor: colorWhite._2,
    borderBottomRightRadius: sw24,
    borderBottomLeftRadius: sw24,
  };

  return (
    <View style={fullHW}>
      <DashboardLayout scrollEnabled={!filterVisible} {...props}>
        <View style={flexChild}>
          <ApplicationHistoryHeader
            activeTab={activeTab}
            filter={filterTemp}
            filterVisible={filterVisible}
            handleCancel={handleCancelFilter}
            handleConfirm={handleConfirmFilter}
            handleResetFilter={handleResetFilter}
            handleSearch={handleSearch}
            handleShowFilter={handleShowFilter}
            inputSearch={inputSearch}
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

            <View style={flexRow}>
              <TabGroup
                activeTab={activeTabIndex}
                setActiveTab={handleTabs}
                tabs={[
                  { badgeCount: incompleteCount, text: DASHBOARD_HOME.LABEL_PENDING },
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
      {(selectedOrders.length !== 0 || downloadInitiated === true) && activeTab === "incomplete" ? (
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
    </View>
  );
};

export const ApplicationHistory = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(ApplicationHistoryComponent);
