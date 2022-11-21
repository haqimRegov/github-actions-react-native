import React, { FunctionComponent, useState } from "react";
import { View } from "react-native";

import { flexChild } from "../../../styles";
import { AccountInformationPage } from "./AccountInformation";
import { InvestorList } from "./InvestorList";
import { InvestorOverview } from "./InvestorOverview";
import { OrderSummaryPage } from "./OrderSummary";
import { InvestorProfilePage } from "./Profile";

interface TransactionsProps {
  handleRoute: (route: DashboardPageType) => void;
  showInvestorOverview: boolean;
}

export const Investors: FunctionComponent<TransactionsProps> = (props: TransactionsProps) => {
  const { handleRoute, showInvestorOverview } = props;
  const [route, setRoute] = useState<InvestorsPageType>(showInvestorOverview === true ? "InvestorOverview" : "InvestorList");
  const [activeTab, setActiveTab] = useState<InvestorsTabType>("all");
  const [orderSummaryActiveTab, setOrderSummaryActiveTab] = useState<OrderSummaryTabType>("order");

  const setScreen = (nextPage: InvestorsPageType) => {
    setRoute(nextPage);
  };

  const pageProps = { setScreen: setScreen };

  let investorsPage: JSX.Element = <InvestorList {...pageProps} activeTab={activeTab} setActiveTab={setActiveTab} />;

  if (route === "InvestorOverview") {
    investorsPage = <InvestorOverview {...pageProps} activeTab={activeTab} setActiveTab={setActiveTab} handleRoute={handleRoute} />;
  }

  if (route === "InvestorProfile") {
    investorsPage = <InvestorProfilePage {...pageProps} />;
  }

  if (route === "AccountInformation") {
    investorsPage = <AccountInformationPage {...pageProps} />;
  }
  if (route === "OrderSummary") {
    investorsPage = <OrderSummaryPage activeTab={orderSummaryActiveTab} setActiveTab={setOrderSummaryActiveTab} {...pageProps} />;
  }

  return <View style={flexChild}>{investorsPage}</View>;
};
