import { useNavigation } from "@react-navigation/native";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { TextStyle, View, ViewStyle } from "react-native";

import { CustomSpacer, FileViewer, Loading, RoundedButton, TabGroup } from "../../components";
import { Language } from "../../constants";
import { DashboardLayout } from "../../pages/Dashboard/DashboardLayout";
import {
  borderBottomRed1,
  colorBlue,
  colorRed,
  colorWhite,
  flexChild,
  flexRow,
  fs10BoldBlue1,
  sh24,
  sw1,
  sw120,
  sw24,
  sw8,
} from "../../styles";
import { DocumentsTab } from "../Dashboard";
import { AccountDetails } from "./Account";
import { OrderDetails } from "./OrderDetails";
import { OrderDetailsCR } from "./OrderDetailsCR";
import { Tracking } from "./Tracking";

const { DASHBOARD_ORDER_SUMMARY } = Language.PAGE;

interface OrderDetailsProps {
  activeTab: OrderSummaryTabType;
  currentOrder: IDashboardOrder | undefined;
  handleBackToTransactions: () => void;
  handleExportPDF: () => void;
  handleFetch: () => void;
  handleViewAccountDetails: (account: ICurrentAccount) => void;
  handleViewInvestorProfile: () => void;
  loading: boolean;
  orderSummary: IDashboardOrderSummary | undefined;
  setActiveTab: (route: OrderSummaryTabType) => void;
}

export const OrderSummary: FunctionComponent<OrderDetailsProps> = (props: OrderDetailsProps) => {
  const {
    activeTab,
    currentOrder,
    handleBackToTransactions,
    handleExportPDF,
    handleFetch,
    handleViewAccountDetails,
    handleViewInvestorProfile,
    loading,
    orderSummary,
    setActiveTab,
  } = props;
  const [file, setFile] = useState<FileBase64 | undefined>(undefined);
  const navigation = useNavigation<IStackNavigationProp>();

  const tabs: OrderSummaryTabType[] = ["order", "document", "tracking"];

  const headerTabs = [
    {
      text:
        currentOrder?.transactionType === "Sales-AO"
          ? DASHBOARD_ORDER_SUMMARY.TAB_ORDER_DETAILS
          : DASHBOARD_ORDER_SUMMARY.TAB_ORDER_DETAILS_CR,
    },
    { text: DASHBOARD_ORDER_SUMMARY.TAB_DOCUMENT },
    { text: DASHBOARD_ORDER_SUMMARY.TAB_TRACKING },
  ];

  if (currentOrder?.transactionType === "Sales-AO") {
    tabs.splice(1, 0, "profile");
    headerTabs.splice(1, 0, { text: DASHBOARD_ORDER_SUMMARY.TAB_PROFILE });
  }

  const activeTabIndex = tabs.indexOf(activeTab);

  const handleTabs = (index: number) => {
    setActiveTab(tabs[index]);
  };

  const handleCloseViewer = () => {
    setFile(undefined);
  };

  const contentProps = { data: orderSummary!, setFile: setFile };

  let content: JSX.Element =
    currentOrder?.transactionType === "Sales-AO" ? (
      <OrderDetails {...contentProps} isScheduled={currentOrder!.isScheduled} />
    ) : (
      <OrderDetailsCR {...contentProps} handleViewAccountDetails={handleViewAccountDetails} />
    );

  if (activeTab === "document") {
    content = <DocumentsTab documentSummary={orderSummary!.documentSummary} setFile={setFile} />;
  }

  if (activeTab === "profile") {
    content = <AccountDetails {...contentProps} />;
  }

  if (activeTab === "tracking") {
    content = <Tracking {...contentProps} handleExportPDF={handleExportPDF} loading={loading} />;
  }

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardStyle: ViewStyle = {
    ...flexChild,
    backgroundColor: colorWhite._2,
    borderRadius: sw8,
    marginHorizontal: sw24,
    marginVertical: sh24,
  };

  const backgroundStyle: ViewStyle = {
    backgroundColor: colorRed._1,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
  };

  const buttonStyle: ViewStyle = {
    borderColor: colorBlue._1,
    borderWidth: sw1,
    height: sh24,
    width: sw120,
  };

  const backgroundText: TextStyle = {
    color: colorWhite._1,
  };

  return (
    <Fragment>
      <DashboardLayout
        navigation={navigation}
        hideQuickActions={true}
        sideElement={
          currentOrder?.transactionType !== "Sales-AO" ? (
            <RoundedButton
              buttonStyle={buttonStyle}
              onPress={handleViewInvestorProfile}
              secondary={true}
              text={DASHBOARD_ORDER_SUMMARY.BUTTON_INVESTOR_PROFILE}
              textStyle={fs10BoldBlue1}
            />
          ) : undefined
        }
        status={currentOrder!.status}
        title={DASHBOARD_ORDER_SUMMARY.HEADING}
        titleIcon="arrow-left"
        titleIconOnPress={handleBackToTransactions}>
        <View style={orderSummary !== undefined ? undefined : flexChild}>
          <View style={cardStyle}>
            <View style={flexRow}>
              <TabGroup
                selectedViewStyle={backgroundStyle}
                selectedTextStyle={backgroundText}
                activeTab={activeTabIndex}
                setActiveTab={handleTabs}
                tabs={headerTabs}
              />
              <CustomSpacer isHorizontal={true} space={sw24} />
            </View>
            <View style={borderBottomRed1} />
            {orderSummary !== undefined ? content : <Loading />}
            <CustomSpacer space={sh24} />
          </View>
        </View>
      </DashboardLayout>
      {file !== undefined ? (
        <FileViewer handleClose={handleCloseViewer} resourceType="url" value={file} visible={file !== undefined} />
      ) : null}
    </Fragment>
  );
};
