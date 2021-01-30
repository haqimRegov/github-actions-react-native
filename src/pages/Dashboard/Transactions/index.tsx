import React, { FunctionComponent, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../store";
import { flexChild } from "../../../styles";
import { ApplicationHistory } from "./ApplicationHistory";
import { UploadDocuments, UploadHardCopy } from "./Documents";
import { OrderSummary } from "./OrderSummary";

interface TransactionsProps extends TransactionsStoreProps {
  handleRoute: (route: DashboardPageType) => void;
  navigation: IStackNavigationProp;
}

export const TransactionsComponent: FunctionComponent<TransactionsProps> = (props: TransactionsProps) => {
  const { currentOrder, navigation } = props;
  const [route, setRoute] = useState<TransactionsPageType>("Transactions");
  const setScreen = (nextPage: TransactionsPageType) => {
    setRoute(nextPage);
  };
  const pageProps = { setScreen: setScreen, navigation: navigation };
  let transactionsPage: JSX.Element = <ApplicationHistory {...pageProps} />;
  if (route === "UploadDocuments") {
    transactionsPage = <UploadDocuments orderNumber={currentOrder} {...pageProps} />;
  }
  if (route === "UploadHardCopy") {
    transactionsPage = <UploadHardCopy orderNumber={currentOrder} {...pageProps} />;
  }
  if (route === "OrderSummary") {
    transactionsPage = <OrderSummary {...pageProps} />;
  }

  return <View style={flexChild}>{transactionsPage}</View>;
};

export const Transactions = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(TransactionsComponent);
