import React, { Fragment, FunctionComponent, useState } from "react";
import { View } from "react-native";

import { CustomSpacer, SafeAreaPage, SideMenuV2 } from "../../components";
import { flexRow, fullHW, sw200 } from "../../styles";
import { OrderDetails } from "./OrderDetails";
import { OrderList } from "./OrderList";

interface DashboardPageProps {
  navigation: IStackNavigationProp;
}

export const DashboardPage: FunctionComponent<DashboardPageProps> = ({ navigation }: DashboardPageProps) => {
  const [route, setRoute] = useState<string>("");

  const handleRoute = (nextPage: string) => {
    setRoute(nextPage);
  };

  let content: JSX.Element = <View />;

  const props = { handleRoute: handleRoute, navigation: navigation };

  switch (route) {
    case "OrderDetails":
      content = <OrderDetails {...props} />;
      break;
    default:
      content = <OrderList {...props} />;
  }

  return (
    <Fragment>
      <View style={{ ...flexRow, ...fullHW }}>
        <SideMenuV2 />
        <CustomSpacer isHorizontal={true} space={sw200} />
        <SafeAreaPage>{content}</SafeAreaPage>
      </View>
    </Fragment>
  );
};
