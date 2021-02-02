import React, { FunctionComponent, useState } from "react";
import { View } from "react-native";

import { flexChild } from "../../../styles";
import { ApplicationHistory } from "./ApplicationHistory";
import { UploadDocuments, UploadHardCopy } from "./Documents";
import { DashboardOrderSummary } from "./OrderSummary";
import { DashboardPayment } from "./Payment";

interface TransactionsProps {
  handleRoute: (route: DashboardPageType) => void;
  navigation: IStackNavigationProp;
}

export const Transactions: FunctionComponent<TransactionsProps> = (props: TransactionsProps) => {
  const { navigation } = props;
  const [route, setRoute] = useState<TransactionsPageType>("Transactions");
  const setScreen = (nextPage: TransactionsPageType) => {
    setRoute(nextPage);
  };
  const pageProps = { setScreen: setScreen, navigation: navigation };
  let transactionsPage: JSX.Element = <ApplicationHistory {...pageProps} />;
  if (route === "UploadDocuments") {
    transactionsPage = <UploadDocuments {...pageProps} />;
  }
  if (route === "UploadHardCopy") {
    transactionsPage = <UploadHardCopy {...pageProps} />;
  }
  if (route === "OrderSummary") {
    transactionsPage = <DashboardOrderSummary {...pageProps} />;
  }
  if (route === "DashboardPayment") {
    transactionsPage = <DashboardPayment {...pageProps} />;
  }

  return <View style={flexChild}>{transactionsPage}</View>;
};
