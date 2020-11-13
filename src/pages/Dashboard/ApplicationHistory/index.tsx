import React, { Fragment, FunctionComponent, useState } from "react";
import { Alert, Text, View } from "react-native";
import { connect } from "react-redux";

import { CustomFlexSpacer, CustomSpacer, Pagination, SelectionBanner, TabGroup } from "../../../components";
import { Language } from "../../../constants";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../store";
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
  sh36,
  shadowBlack5,
  sw24,
} from "../../../styles";
import { DashboardLayout } from "../DashboardLayout";
import { ApprovedOrders } from "./Approved";
import { ApplicationHistoryHeader } from "./Header";
import { PendingOrders } from "./Pending";
import { RejectedOrders } from "./Rejected";
import { SubmissionSummaryReceiptModal } from "./SubmissionSummaryReceipt";

const { DASHBOARD_HOME } = Language.PAGE;

interface ApplicationHistoryProps extends TransactionsStoreProps {
  handleRoute: (route: string) => void;
  navigation: IStackNavigationProp;
}

export const ApplicationHistoryComponent: FunctionComponent<ApplicationHistoryProps> = (props: ApplicationHistoryProps) => {
  const { approved, handleRoute, navigation, orderCount, pending, rejected, selectedOrders } = props;
  const tabs = { approved, pending, rejected };
  const [showModal, setShowModal] = useState<boolean>(false);
  const [tab, setTab] = useState<TransactionDashboardType>("pending");
  const [selectedFilter, setSelectedFilter] = useState<any>([]);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>("");

  const handleDone = () => {
    setShowModal(false);
    handleRoute("Application");
  };

  const handleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const handleNext = () => {
    Alert.alert("handlePress");
  };

  const handlePrev = () => {
    Alert.alert("handlePress");
  };

  const handlePending = () => {
    setTab("pending");
  };

  const handleApproved = () => {
    setTab("approved");
  };

  const handleRejected = () => {
    setTab("rejected");
  };

  const handlePrintAll = () => {
    setShowModal(true);
  };

  const handlePrintSelected = () => {
    setShowModal(true);
  };

  const pageProps = { handleRoute: handleRoute, navigation: navigation };
  let content: JSX.Element = <View />;

  if (tab === "pending") {
    content = <PendingOrders {...pageProps} />;
  } else if (tab === "approved") {
    content = <ApprovedOrders {...pageProps} />;
  } else {
    content = <RejectedOrders {...pageProps} />;
  }

  const selectionText =
    pending?.orders !== undefined && selectedOrders.length > 1 ? DASHBOARD_HOME.LABEL_ORDERS_SELECTED : DASHBOARD_HOME.LABEL_ORDER_SELECTED;

  const currentPage = tabs[tab]?.currentPage;
  const totalPages = tabs[tab]?.totalPages;
  const itemCount = orderCount![tab];

  const bannerText = `${selectedOrders!.length} ${selectionText}`;

  return (
    <Fragment>
      <DashboardLayout {...props}>
        <View style={flexChild}>
          <ApplicationHistoryHeader
            filterVisible={filterVisible}
            handleFilter={handleFilter}
            inputSearch={inputSearch}
            selectedFilter={selectedFilter}
            setInputSearch={setInputSearch}
            setSelectedFilter={setSelectedFilter}
          />
          <CustomSpacer space={sh24} />
          <View
            style={{
              ...shadowBlack5,
              marginHorizontal: sw24,
              backgroundColor: colorWhite._1,
              borderRadius: sw24,
            }}>
            <CustomSpacer space={sh153} />
            <CustomSpacer space={sh16} />

            <View style={flexRow}>
              <TabGroup
                tabs={[
                  {
                    badgeCount: orderCount?.pending,
                    onPress: handlePending,
                    text: DASHBOARD_HOME.LABEL_PENDING,
                  },
                  {
                    badgeCount: orderCount?.approved,
                    onPress: handleApproved,
                    text: DASHBOARD_HOME.LABEL_APPROVED,
                  },
                  {
                    badgeCount: orderCount?.rejected,
                    onPress: handleRejected,
                    text: DASHBOARD_HOME.LABEL_REJECTED,
                  },
                ]}
              />

              <View style={{ ...flexRow, ...flexChild, ...borderBottomGray4 }}>
                <CustomFlexSpacer />
                <Pagination
                  label={false}
                  onPressNext={handleNext}
                  onPressPrev={handlePrev}
                  page={currentPage!}
                  totalItems={itemCount}
                  itemsPerPage={10}
                  totalPages={totalPages!}
                />
                <CustomSpacer isHorizontal={true} space={sw24} />
              </View>
            </View>
            <CustomSpacer space={sh16} />
            {content}
          </View>
        </View>
        <CustomSpacer space={sh36} />
        {selectedOrders!.length !== 0 && tab === "pending" ? <CustomSpacer space={sh112} /> : null}
      </DashboardLayout>
      {selectedOrders!.length !== 0 && tab === "pending" ? (
        <SelectionBanner
          bottomContent={<Text style={fs16SemiBoldBlack2}>{bannerText}</Text>}
          cancelOnPress={handlePrintAll}
          label={DASHBOARD_HOME.LABEL_SUBMISSION_SUMMARY}
          labelCancel={DASHBOARD_HOME.LABEL_PRINT_ALL}
          labelSubmit={DASHBOARD_HOME.LABEL_PRINT_SELECTED}
          submitOnPress={handlePrintSelected}
        />
      ) : null}
      <SubmissionSummaryReceiptModal selectedOrders={selectedOrders!.length} handlePress={handleDone} visible={showModal} />
    </Fragment>
  );
};

export const ApplicationHistory = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(ApplicationHistoryComponent);
