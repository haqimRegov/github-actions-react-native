import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";

import { Language } from "../../../constants";
import { RNInAppBrowser } from "../../../integrations";
import { getOrderSummary, orderTrackingSummary } from "../../../network-actions";
import { InvestorsMapDispatchToProps, InvestorsMapStateToProps, InvestorsStoreProps } from "../../../store";
import { OrderSummary } from "../../../templates";

const { DASHBOARD_ORDER_SUMMARY } = Language.PAGE;

interface OrderSummaryPageProps extends InvestorsStoreProps {
  activeTab: OrderSummaryTabType;
  setActiveTab: (route: OrderSummaryTabType) => void;
  setScreen: (route: InvestorsPageType) => void;
}

const OrderSummaryComponent: FunctionComponent<OrderSummaryPageProps> = ({
  activeTab,
  currentOrder,
  setScreen,
  setActiveTab,
  updateCurrentOrder,
  updateCurrentInvestor,
  updateCurrentAccount,
}: OrderSummaryPageProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const [orderSummary, setOrderSummary] = useState<IDashboardOrderSummary | undefined>(undefined);
  const fetching = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleBackToTransactions = () => {
    updateCurrentOrder(undefined);
    setActiveTab("order");
    setScreen("AccountInformation");
  };

  const handleViewInvestorProfile = () => {
    if (orderSummary?.profile[0].clientId !== undefined && orderSummary?.profile[0].clientId !== null) {
      updateCurrentInvestor({
        clientId: orderSummary?.profile[0].clientId,
        email: orderSummary?.profile[0].contactDetails.email,
        idNumber: orderSummary?.profile[0].idNumber,
        mobileNo: orderSummary?.profile[0].contactDetails.mobileNumber,
        name: orderSummary?.profile[0].name,
        riskTolerance: orderSummary?.profile[0].personalDetails.riskProfile,
      });
      setScreen("InvestorProfile");
    }
  };

  const handleViewAccountDetails = (accNo: string) => {
    updateCurrentAccount({
      accountHolder: "Principal",
      accountNo: accNo,
      accountOpeningDate: "",
      address: {},
      clientId: "",
      dateOfBirth: "",
      idNumber: "",
      initId: "",
      jointName: "",
      name: "",
      riskTolerance: "",
    });
    setScreen("AccountInformation");
  };

  const handleFetch = async () => {
    const request: IGetOrderSummaryRequest = { orderNumber: currentOrder!.orderNumber };
    console.log("IGetOrderSummaryRequest", request);
    console.log("currentOrder", currentOrder);
    const orderSummaryResponse: IGetOrderSummaryResponse = await getOrderSummary(request, navigation);
    console.log("orderSummaryResponse", orderSummaryResponse);
    if (orderSummaryResponse !== undefined) {
      const { data, error } = orderSummaryResponse;
      if (error === null && data !== null) {
        setOrderSummary(data.result);
      }
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
  };

  const handleExportPDF = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      const request = { orderNo: currentOrder!.orderNumber };
      const response: IOrderTrackingSummaryResponse = await orderTrackingSummary(request);
      fetching.current = false;
      setLoading(false);
      if (response !== undefined) {
        const { data: responseData, error } = response;
        if (error === null && responseData !== null) {
          if (responseData.result.status === true) {
            RNInAppBrowser.openLink(responseData.result.pdf.url);
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

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OrderSummary
      activeTab={activeTab}
      currentOrder={currentOrder}
      handleBackToTransactions={handleBackToTransactions}
      handleExportPDF={handleExportPDF}
      handleFetch={handleFetch}
      handleViewAccountDetails={handleViewAccountDetails}
      handleViewInvestorProfile={handleViewInvestorProfile}
      loading={loading}
      orderSummary={orderSummary}
      setActiveTab={setActiveTab}
    />
  );
};

export const OrderSummaryPage = connect(InvestorsMapStateToProps, InvestorsMapDispatchToProps)(OrderSummaryComponent);
