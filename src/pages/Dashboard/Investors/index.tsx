import React, { FunctionComponent, useState } from "react";
import { View } from "react-native";

import { flexChild } from "../../../styles";
import { InvestorDetailsDashboard } from "./InvestorAccounts";
import { InvestorDashboard } from "./InvestorList";

interface TransactionsProps {
  handleRoute: (route: DashboardPageType) => void;
  isLogout: boolean;
  navigation: IStackNavigationProp;
}

export const Investors: FunctionComponent<TransactionsProps> = (props: TransactionsProps) => {
  const { navigation, isLogout } = props;
  const [route, setRoute] = useState<InvestorsPageType>("InvestorDashboard");
  const [activeTab, setActiveTab] = useState<InvestorsTabType>("all");
  const setScreen = (nextPage: InvestorsPageType) => {
    setRoute(nextPage);
  };
  const pageProps = { setScreen: setScreen, navigation: navigation };
  let investorsPage: JSX.Element = (
    <InvestorDashboard {...pageProps} activeTab={activeTab} isLogout={isLogout} setActiveTab={setActiveTab} />
  );
  if (route === "AccountsList") {
    investorsPage = <InvestorDetailsDashboard {...pageProps} activeTab={activeTab} isLogout={isLogout} setActiveTab={setActiveTab} />;
  }

  return <View style={flexChild}>{investorsPage}</View>;
};
