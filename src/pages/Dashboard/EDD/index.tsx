import React, { FunctionComponent, useState } from "react";
import { View } from "react-native";

import { flexChild } from "../../../styles";
import { EDDCases } from "./EDDCases";
import { NewCase } from "./NewCase";
import { ReroutedCase } from "./ReroutedCase";
import { ViewCase } from "./ViewCase";

interface TransactionsProps {
  handleRoute: (route: DashboardPageType) => void;
  navigation: IStackNavigationProp;
}

export const EDD: FunctionComponent<TransactionsProps> = (props: TransactionsProps) => {
  const { navigation } = props;
  const [route, setRoute] = useState<EDDPageType>("Cases");
  const [activeTab, setActiveTab] = useState<EDDTabType>("new");
  const setScreen = (nextPage: EDDPageType) => {
    setRoute(nextPage);
  };
  const pageProps = { setScreen: setScreen, navigation: navigation };
  let eddCases: JSX.Element = <EDDCases {...pageProps} activeTab={activeTab} setActiveTab={setActiveTab} />;
  if (route === "NewCase") {
    eddCases = <NewCase {...pageProps} />;
  }
  if (route === "ViewCase") {
    eddCases = <ViewCase {...pageProps} />;
  }
  if (route === "RerouteCase") {
    eddCases = <ReroutedCase {...pageProps} />;
  }

  return <View style={flexChild}>{eddCases}</View>;
};
