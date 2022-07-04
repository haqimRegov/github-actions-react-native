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
import { AccountDetails } from "./Account";
import { Document } from "./Document";
import { OrderDetails } from "./OrderDetails";
import { OrderDetailsCR } from "./OrderDetailsCR";
import { Tracking } from "./Tracking";

const { DASHBOARD_ORDER_SUMMARY } = Language.PAGE;

interface OrderDetailsProps {
  // navigation: IStackNavigationProp;
  // setScreen: (route: TransactionsPageType) => void;
  activeTab: OrderSummaryTabType;
  currentOrder: IDashboardOrder | undefined;
  handleBackToTransactions: () => void;
  handleExportPDF: () => void;
  handleFetch: () => void;
  handleViewAccountDetails: (accNo: string) => void;
  handleViewInvestorProfile: () => void;
  loading: boolean;
  orderSummary: IDashboardOrderSummary | undefined;
  setActiveTab: (route: OrderSummaryTabType) => void;
}

export const OrderSummary: FunctionComponent<OrderDetailsProps> = (props: OrderDetailsProps) => {
  const {
    activeTab,
    currentOrder,
    handleFetch,
    // setScreen,
    orderSummary,
    // navigation,
    handleBackToTransactions,
    setActiveTab,
    handleViewInvestorProfile,
    handleViewAccountDetails,
    handleExportPDF,
    loading,
    // updateCurrentOrder,
    // updateCurrentInvestor,
    // updateCurrentAccount,
  } = props;
  // const [orderSummary, setOrderSummary] = useState<IDashboardOrderSummary | undefined>(undefined);
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

  // const handleBackToTransactions = () => {
  //   updateCurrentOrder(undefined);
  //   setActiveTab("order");
  //   setScreen("Transactions");
  // };

  // const handleViewInvestorProfile = () => {
  //   if (orderSummary?.profile[0].clientId !== undefined && orderSummary?.profile[0].clientId !== null) {
  //     updateCurrentInvestor({
  //       clientId: orderSummary?.profile[0].clientId,
  //       email: orderSummary?.profile[0].contactDetails.email,
  //       idNumber: orderSummary?.profile[0].idNumber,
  //       mobileNo: orderSummary?.profile[0].contactDetails.mobileNumber,
  //       name: orderSummary?.profile[0].name,
  //       riskTolerance: orderSummary?.profile[0].personalDetails.riskProfile,
  //     });
  //     setScreen("InvestorProfile");
  //   }
  // };

  // const handleVi`ewAccountDetails = (accNo: string) => {
  //   updateCurrentAccount({
  //     accountHolder: "Principal",
  //     accountNo: accNo,
  //     accountOpeningDate: "",
  //     address: {},
  //     clientId: "",
  //     dateOfBirth: "",
  //     idNumber: "",
  //     initId: "",
  //     jointName: "",
  //     name: "",
  //     riskTolerance: "",
  //   });
  //   setScreen("AccountInformation");
  // };`

  const contentProps = { data: orderSummary!, setFile: setFile };

  let content: JSX.Element =
    currentOrder?.transactionType === "Sales-AO" ? (
      <OrderDetails {...contentProps} isScheduled={currentOrder!.isScheduled} />
    ) : (
      <OrderDetailsCR {...contentProps} handleViewAccountDetails={handleViewAccountDetails} />
    );

  if (activeTab === "document") {
    content = <Document {...contentProps} />;
  }

  if (activeTab === "profile") {
    content = <AccountDetails {...contentProps} />;
  }

  if (activeTab === "tracking") {
    content = <Tracking {...contentProps} handleExportPDF={handleExportPDF} loading={loading} />;
  }

  // const handleFetch = async () => {
  //   // setLoading(true);
  //   const request: IGetOrderSummaryRequest = { orderNumber: currentOrder!.orderNumber };
  //   console.log("IGetOrderSummaryRequest", request);
  //   console.log("currentOrder", currentOrder);
  //   const orderSummaryResponse: IGetOrderSummaryResponse = await getOrderSummary(request, navigation);
  //   console.log("orderSummaryResponse", orderSummaryResponse);
  //   // setLoading(false);
  //   if (orderSummaryResponse !== undefined) {
  //     const { data, error } = orderSummaryResponse;
  //     if (error === null && data !== null) {
  //       setOrderSummary(data.result);
  //     }
  //     if (error !== null) {
  //       setTimeout(() => {
  //         Alert.alert(error.message);
  //       }, 100);
  //     }
  //   }
  // };

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
