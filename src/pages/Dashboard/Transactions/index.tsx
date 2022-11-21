import React, { FunctionComponent, useState } from "react";
import { View } from "react-native";

import { flexChild } from "../../../styles";
import { AccountInformationPage } from "./AccountInformation";
import { ApplicationHistory } from "./ApplicationHistory";
import { UploadDocuments, UploadHardCopy } from "./Documents";
import { OrderSummaryPage } from "./OrderSummary";
import { DashboardPayment } from "./Payment/Payment";
import { InvestorProfilePage } from "./Profile";

interface TransactionsProps {
  handleRoute: (route: DashboardPageType) => void;
  navigation: IStackNavigationProp;
}

export const Transactions: FunctionComponent<TransactionsProps> = (props: TransactionsProps) => {
  const { handleRoute, navigation } = props;
  const [route, setRoute] = useState<TransactionsPageType>("Transactions");
  const [activeTab, setActiveTab] = useState<TransactionsTabType>("incomplete");
  const [orderSummaryActiveTab, setOrderSummaryActiveTab] = useState<OrderSummaryTabType>("order");

  const setScreen = (nextPage: TransactionsPageType) => {
    setRoute(nextPage);
  };

  const pageProps = { setScreen: setScreen, navigation: navigation };

  let transactionsPage: JSX.Element = (
    <ApplicationHistory
      {...pageProps}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      setPage={handleRoute}
      setOrderSummaryActiveTab={setOrderSummaryActiveTab}
    />
  );

  if (route === "UploadDocuments") {
    transactionsPage = <UploadDocuments {...pageProps} />;
  }

  if (route === "UploadHardCopy") {
    transactionsPage = <UploadHardCopy {...pageProps} />;
  }

  if (route === "OrderSummary") {
    transactionsPage = <OrderSummaryPage activeTab={orderSummaryActiveTab} setActiveTab={setOrderSummaryActiveTab} {...pageProps} />;
  }

  if (route === "DashboardPayment") {
    transactionsPage = <DashboardPayment {...pageProps} />;
  }

  if (route === "InvestorProfile") {
    transactionsPage = <InvestorProfilePage {...pageProps} />;
  }

  if (route === "AccountInformation") {
    transactionsPage = <AccountInformationPage {...pageProps} />;
  }

  return <View style={flexChild}>{transactionsPage}</View>;
};
