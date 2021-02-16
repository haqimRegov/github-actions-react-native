import React, { FunctionComponent, useState } from "react";
import { Alert, Text, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/LocalAssets";
import { CustomFlexSpacer, CustomSpacer, Pagination, PromptModal, SelectionBanner, TabGroup } from "../../../../components";
import { Language } from "../../../../constants";
import { RNShareApi } from "../../../../integrations";
import { getSummaryReceipt } from "../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import {
  borderBottomGray4,
  colorWhite,
  flexChild,
  flexRow,
  fs16SemiBoldBlack2,
  sh112,
  sh153,
  sh16,
  sh24,
  sh443,
  shadowBlack5,
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
  navigation: IStackNavigationProp;
  setActiveTab: (route: TransactionsTabType) => void;
  setScreen: (route: TransactionsPageType) => void;
}

export const ApplicationHistoryComponent: FunctionComponent<ApplicationHistoryProps> = (props: ApplicationHistoryProps) => {
  const {
    activeTab,
    navigation,
    pending,
    search,
    selectedOrders,
    setActiveTab,
    setScreen,
    // setLoading,
    transactions,
    updatedSelectedOrder,
    updateSearch,
    updateTransactions,
    updatePendingFilter,
    updateApprovedFilter,
    updateRejectedFilter,
  } = props;
  const { approvedCount, pendingCount, rejectedCount } = transactions;

  const { filter, page, pages } = props[activeTab];
  const [prompt, setPrompt] = useState<boolean>(false);
  const [filterTemp, setFilterTemp] = useState<ITransactionsFilter>(filter);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>(search);

  const tabs: TransactionsTabType[] = ["pending", "approved", "rejected"];
  const activeTabIndex = tabs.indexOf(activeTab);

  const handleTabs = (index: number) => {
    setActiveTab(tabs[index]);
  };
  const handleDone = () => {
    setPrompt(false);
    updatedSelectedOrder([]);
  };

  const handleNext = () => {
    updateTransactions({
      ...transactions,
      [activeTab]: {
        ...transactions[activeTab],
        page: page + 1,
      },
    });
  };

  const handlePrev = () => {
    updateTransactions({
      ...transactions,
      [activeTab]: {
        ...transactions[activeTab],
        page: page - 1,
      },
    });
  };

  const handleSearch = () => {
    if (filterVisible === false) {
      updateSearch(inputSearch);
    }
  };

  const handleSummaryReceipt = async (request: ISummaryReceiptRequest) => {
    // setLoading(true);
    // eslint-disable-next-line no-console
    console.log("getSummaryReceipt request", request);
    const response: ISummaryReceiptResponse = await getSummaryReceipt(request);
    // setLoading(false);
    // eslint-disable-next-line no-console
    console.log("getSummaryReceipt response", response);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        const documents = data.result.pdf.map((file: FileBase64) => `data:${file.type};base64,${file.base64}`);
        if (data.result.pdf.length > 0) {
          const share = await RNShareApi.filesBase64(documents);
          if (share !== undefined) {
            setPrompt(true);
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
  };

  const handlePrintAll = () => {
    handleSummaryReceipt({ all: true, orders: [] });
  };

  const handlePrintSelected = () => {
    const orders = selectedOrders.map(({ orderNumber }) => orderNumber);
    handleSummaryReceipt({ all: false, orders: orders });
  };

  const handlePrintSummary = (orderNumber: string) => {
    handleSummaryReceipt({ all: false, orders: [orderNumber] });
  };

  const handleShowFilter = () => {
    if (filterVisible === false) {
      setFilterTemp(filter);
    }
    setFilterVisible(!filterVisible);
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

  const tabProps = { setScreen: setScreen, navigation: navigation };
  let content: JSX.Element = <View />;

  if (activeTab === "pending") {
    content = <PendingOrders activeTab={activeTab === "pending"} handlePrintSummary={handlePrintSummary} {...tabProps} />;
  } else if (activeTab === "approved") {
    content = <ApprovedOrders activeTab={activeTab === "approved"} {...tabProps} />;
  } else {
    content = <RejectedOrders activeTab={activeTab === "rejected"} {...tabProps} />;
  }

  const selectionText =
    pending?.orders !== undefined && selectedOrders.length > 1 ? DASHBOARD_HOME.LABEL_ORDERS_SELECTED : DASHBOARD_HOME.LABEL_ORDER_SELECTED;

  const bannerText = `${selectedOrders!.length} ${selectionText}`;
  const submissionSummary = `${DASHBOARD_HOME.LABEL_SUBMISSION_SUMMARY_DOWNLOADED}`;

  const tableContainer: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderBottomRightRadius: sw24,
    borderBottomLeftRadius: sw24,
    minHeight: sh443,
  };

  return (
    <View>
      <DashboardLayout scrollEnabled={!filterVisible} {...props}>
        <View style={flexChild}>
          <ApplicationHistoryHeader
            activeTab={activeTab}
            filter={filterTemp}
            filterVisible={filterVisible}
            handleCancel={handleCancelFilter}
            handleConfirm={handleConfirmFilter}
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
              ...shadowBlack5,
              marginHorizontal: sw24,
              backgroundColor: colorWhite._1,
              borderRadius: sw24,
              ...flexChild,
            }}>
            <CustomSpacer space={sh153} />
            <CustomSpacer space={sh16} />

            <View style={flexRow}>
              <TabGroup
                activeTab={activeTabIndex}
                setActiveTab={handleTabs}
                tabs={[
                  { badgeCount: pendingCount, text: DASHBOARD_HOME.LABEL_PENDING },
                  { badgeCount: approvedCount, text: DASHBOARD_HOME.LABEL_APPROVED },
                  { badgeCount: rejectedCount, text: DASHBOARD_HOME.LABEL_REJECTED },
                ]}
              />
              <View style={{ ...flexRow, ...flexChild, ...borderBottomGray4 }}>
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
        {selectedOrders!.length !== 0 && activeTab === "pending" ? <CustomSpacer space={sh112} /> : null}
      </DashboardLayout>
      {selectedOrders!.length !== 0 && activeTab === "pending" ? (
        <SelectionBanner
          bottomContent={<Text style={fs16SemiBoldBlack2}>{bannerText}</Text>}
          cancelOnPress={handlePrintAll}
          label={DASHBOARD_HOME.LABEL_SUBMISSION_SUMMARY}
          labelCancel={DASHBOARD_HOME.LABEL_PRINT_ALL}
          labelSubmit={DASHBOARD_HOME.LABEL_PRINT_SELECTED}
          submitOnPress={handlePrintSelected}
        />
      ) : null}
      <PromptModal
        labelContinue={DASHBOARD_HOME.BUTTON_DONE}
        handleContinue={handleDone}
        illustration={LocalAssets.illustration.receiptSuccess}
        label={submissionSummary}
        title={DASHBOARD_HOME.LABEL_SUBMISSION_REPORT_DOWNLOADED}
        visible={prompt}
      />
    </View>
  );
};

export const ApplicationHistory = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(ApplicationHistoryComponent);
