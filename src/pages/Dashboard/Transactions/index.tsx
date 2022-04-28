import React, { FunctionComponent, useState } from "react";
import { View } from "react-native";

import { flexChild } from "../../../styles";
import { ApplicationHistory } from "./ApplicationHistory";
import { UploadDocuments, UploadHardCopy } from "./Documents";
import { DashboardOrderSummary } from "./OrderSummary";
import { DashboardPayment } from "./Payment/Payment";

interface TransactionsProps {
  handleRoute: (route: DashboardPageType) => void;
  isLogout: boolean;
  navigation: IStackNavigationProp;
}

export const Transactions: FunctionComponent<TransactionsProps> = (props: TransactionsProps) => {
  const { navigation, isLogout } = props;
  const [route, setRoute] = useState<TransactionsPageType>("Transactions");
  const [activeTab, setActiveTab] = useState<TransactionsTabType>("incomplete");
  const [orderSummaryActiveTab, setOrderSummaryActiveTab] = useState<OrderSummaryTabType>("order");
  const setScreen = (nextPage: TransactionsPageType) => {
    setRoute(nextPage);
  };
  const pageProps = { setScreen: setScreen, navigation: navigation };
  let transactionsPage: JSX.Element = (
    <ApplicationHistory {...pageProps} activeTab={activeTab} isLogout={isLogout} setActiveTab={setActiveTab} />
  );
  if (route === "UploadDocuments") {
    transactionsPage = <UploadDocuments {...pageProps} />;
  }
  if (route === "UploadHardCopy") {
    transactionsPage = <UploadHardCopy {...pageProps} />;
  }
  if (route === "OrderSummary") {
    transactionsPage = <DashboardOrderSummary activeTab={orderSummaryActiveTab} setActiveTab={setOrderSummaryActiveTab} {...pageProps} />;
  }
  if (route === "DashboardPayment") {
    transactionsPage = <DashboardPayment {...pageProps} />;
  }

  return <View style={flexChild}>{transactionsPage}</View>;
};
