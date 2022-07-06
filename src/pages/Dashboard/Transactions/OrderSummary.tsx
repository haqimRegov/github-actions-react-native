import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";

import { Language } from "../../../constants";
import { RNInAppBrowser } from "../../../integrations";
import { getOrderSummary, orderTrackingSummary } from "../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../store";
import { OrderSummary } from "../../../templates";

const { DASHBOARD_ORDER_SUMMARY } = Language.PAGE;

interface OrderSummaryPageProps extends TransactionsStoreProps {
  activeTab: OrderSummaryTabType;
  navigation: IStackNavigationProp;
  setActiveTab: (route: OrderSummaryTabType) => void;
  setScreen: (route: TransactionsPageType) => void;
}

const OrderSummaryComponent: FunctionComponent<OrderSummaryPageProps> = (props: OrderSummaryPageProps) => {
  const { activeTab, currentOrder, setScreen, navigation, setActiveTab, updateCurrentOrder, updateCurrentAccount } = props;
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
    setScreen("Transactions");
  };

  const handleViewInvestorProfile = () => {
    if (orderSummary!.profile[0].clientId !== undefined && orderSummary!.profile[0].clientId !== null) {
      updateCurrentAccount({ accountNumber: undefined, clientId: orderSummary!.profile[0].clientId });
      setScreen("InvestorProfile");
    }
  };

  const handleViewAccountDetails = (account: ICurrentAccount) => {
    updateCurrentAccount(account);
    setScreen("AccountInformation");
  };

  const handleFetch = async () => {
    const request: IGetOrderSummaryRequest = { orderNumber: currentOrder!.orderNumber };
    const orderSummaryResponse: IGetOrderSummaryResponse = await getOrderSummary(request, navigation);
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

export const OrderSummaryPage = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(OrderSummaryComponent);
