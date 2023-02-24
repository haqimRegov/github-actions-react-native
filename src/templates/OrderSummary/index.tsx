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
  sw16,
  sw24,
  sw8,
} from "../../styles";
import { isArrayNotEmpty, isNotEmpty } from "../../utils";
import { AccountTab, DocumentsTabNew, ProfileTabNew } from "../Dashboard";
import { OrderDetailsNew } from "./OrderDetailsNew";
import { Tracking } from "./Tracking";

const { DASHBOARD_ORDER_SUMMARY } = Language.PAGE;

interface OrderDetailsProps {
  activeTab: OrderSummaryTabType;
  currentOrder: IDashboardOrder | undefined;
  handleBackToTransactions: () => void;
  handleExportPDF: () => void;
  handleFetch: () => void;
  handleViewAccountDetails: (account: ICurrentAccount) => void;
  handleViewPrincipalInvestorProfile: () => void;
  handleViewJointInvestorProfile: () => void;
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
    handleViewPrincipalInvestorProfile,
    handleViewJointInvestorProfile,
    loading,
    orderSummary,
    setActiveTab,
  } = props;
  const [file, setFile] = useState<FileBase64 | undefined>(undefined);
  const navigation = useNavigation<IStackNavigationProp>();

  const tabs: OrderSummaryTabType[] = ["order", "tracking"];

  const isEtbInvestor = { principal: orderSummary?.profile[0].isEtb, joint: orderSummary?.profile[1]?.isEtb };

  const headerTabs = [
    {
      text: DASHBOARD_ORDER_SUMMARY.TAB_ORDER_DETAILS,
    },
    { text: DASHBOARD_ORDER_SUMMARY.TAB_TRACKING },
  ];

  const documentCheck =
    isNotEmpty(orderSummary) &&
    isNotEmpty(orderSummary!.documentSummary) &&
    (isArrayNotEmpty(orderSummary!.documentSummary.softcopy.documents) ||
      isArrayNotEmpty(orderSummary!.documentSummary.hardcopy.accDocs) ||
      isArrayNotEmpty(orderSummary!.documentSummary.hardcopy.utmcDocs));

  if (documentCheck === true) {
    tabs.splice(1, 0, "document");
    headerTabs.splice(1, 0, { text: DASHBOARD_ORDER_SUMMARY.TAB_DOCUMENT });
  }

  const checkBankIfUpdatedInSales =
    isNotEmpty(currentOrder) &&
    currentOrder!.transactionType === "Sales" &&
    isNotEmpty(orderSummary) &&
    isArrayNotEmpty(orderSummary!.profile) &&
    isNotEmpty(orderSummary!.profile[0].bankInformation) &&
    (isArrayNotEmpty(orderSummary!.profile[0].bankInformation!.localBank) ||
      isArrayNotEmpty(orderSummary!.profile[0].bankInformation!.foreignBank));

  if (currentOrder !== undefined && (currentOrder.transactionType === "Sales-AO" || checkBankIfUpdatedInSales === true)) {
    tabs.splice(1, 0, "account");
    headerTabs.splice(1, 0, { text: DASHBOARD_ORDER_SUMMARY.TAB_ACCOUNT });
  }

  if (currentOrder !== undefined && orderSummary !== undefined && orderSummary.isEtb !== true) {
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

  let content: JSX.Element = (
    <OrderDetailsNew
      {...contentProps}
      isScheduled={currentOrder!.isScheduled}
      transactionType={currentOrder!.transactionType}
      handleViewAccountDetails={handleViewAccountDetails}
    />
  );

  if (activeTab === "document" && documentCheck === true && orderSummary !== undefined) {
    content = <DocumentsTabNew documentSummary={orderSummary.documentSummary} setFile={setFile} />;
  }

  if (activeTab === "account") {
    content = <AccountTab transactionType={currentOrder!.transactionType} {...contentProps} />;
  }
  if (currentOrder !== undefined && orderSummary !== undefined && orderSummary.isEtb !== true && activeTab === "profile") {
    content = <ProfileTabNew {...contentProps} />;
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
    borderTopLeftRadius: sw16,
    borderTopRightRadius: sw16,
  };

  const buttonStyle: ViewStyle = {
    borderColor: colorBlue._1,
    borderWidth: sw1,
    height: sh24,
    width: sw120,
  };

  const buttonPrincipalStyle: ViewStyle = {
    ...buttonStyle,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  };

  const buttonJointStyle: ViewStyle = {
    ...buttonStyle,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  };

  const backgroundText: TextStyle = {
    color: colorWhite._1,
  };

  const investorProfileButton =
    currentOrder?.accountType === "Joint" ? (
      <View style={flexRow}>
        {isEtbInvestor.principal === true || isEtbInvestor.principal === null ? (
          <RoundedButton
            buttonStyle={isEtbInvestor.joint === true || isEtbInvestor.joint === null ? buttonPrincipalStyle : buttonStyle}
            text={DASHBOARD_ORDER_SUMMARY.BUTTON_INVESTOR_PRINCIPAL_PROFILE}
            onPress={handleViewPrincipalInvestorProfile}
            secondary={true}
            textStyle={fs10BoldBlue1}
          />
        ) : null}
        {isEtbInvestor.joint === true || isEtbInvestor.joint === null ? (
          <RoundedButton
            buttonStyle={isEtbInvestor.principal === true || isEtbInvestor.principal === null ? buttonJointStyle : buttonStyle}
            text={DASHBOARD_ORDER_SUMMARY.BUTTON_INVESTOR_JOINT_PROFILE}
            onPress={handleViewJointInvestorProfile}
            secondary={true}
            textStyle={fs10BoldBlue1}
          />
        ) : null}
      </View>
    ) : (
      <RoundedButton
        buttonStyle={buttonStyle}
        onPress={handleViewPrincipalInvestorProfile}
        secondary={true}
        text={DASHBOARD_ORDER_SUMMARY.BUTTON_INVESTOR_PROFILE}
        textStyle={fs10BoldBlue1}
      />
    );

  const isEtb =
    (currentOrder !== undefined && orderSummary !== undefined && (isEtbInvestor.principal === true || isEtbInvestor.joint === true)) ||
    (isEtbInvestor.principal === null && isEtbInvestor.joint === null) ||
    currentOrder?.transactionType === "CR";

  const showStatusIcon =
    currentOrder!.status === "Submitted" &&
    orderSummary?.documentSummary !== undefined &&
    orderSummary.documentSummary.hardcopy.required === true;

  return (
    <Fragment>
      <DashboardLayout
        hideQuickActions={true}
        navigation={navigation}
        sideElement={isEtb ? investorProfileButton : null}
        status={currentOrder!.status}
        statusIcon={showStatusIcon}
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
