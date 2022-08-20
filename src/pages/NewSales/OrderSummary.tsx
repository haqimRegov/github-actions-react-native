import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";

import { RNInAppBrowser } from "../../integrations";
import { getOrderSummary, orderTrackingSummary } from "../../network-actions";
import { OrderSummary } from "../../templates";

interface OrderSummaryPageProps {
  accountNo: string;
  clientId: string;
  order: IDashboardOrder;
  setClientId: (id: string) => void;
  setCurrentOrder: (order: IDashboardOrder) => void;
  setScreen: (page: TRiskProfilePages) => void;
}

export const NewSalesOrderSummary: FunctionComponent<OrderSummaryPageProps> = ({
  order,
  setClientId,
  setScreen,
}: OrderSummaryPageProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const [orderSummary, setOrderSummary] = useState<IDashboardOrderSummary | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<OrderSummaryTabType>("order");
  const fetching = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleBackToTransactions = () => {
    setScreen("accountDetails");
  };

  const handleViewPrincipalInvestorProfile = () => {
    if (orderSummary!.profile[0].clientId !== undefined && orderSummary!.profile[0].clientId !== null) {
      setClientId(orderSummary!.profile[0].clientId);
      setScreen("profile");
    }
  };
  const handleViewJointInvestorProfile = () => {
    if (orderSummary!.profile[1].clientId !== undefined && orderSummary!.profile[1].clientId !== null) {
      setClientId(orderSummary!.profile[1].clientId);
      setScreen("profile");
    }
  };

  const handleViewAccountDetails = (_) => {
    setScreen("accountDetails");
  };

  const handleFetch = async () => {
    const request: IGetOrderSummaryRequest = { orderNumber: order.orderNumber };
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
      const request = { orderNo: order.orderNumber };
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
      currentOrder={order}
      handleBackToTransactions={handleBackToTransactions}
      handleExportPDF={handleExportPDF}
      handleFetch={handleFetch}
      handleViewAccountDetails={handleViewAccountDetails}
      handleViewPrincipalInvestorProfile={handleViewPrincipalInvestorProfile}
      handleViewJointInvestorProfile={handleViewJointInvestorProfile}
      loading={loading}
      orderSummary={orderSummary}
      setActiveTab={setActiveTab}
    />
  );
};
