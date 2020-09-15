import React, { Fragment, FunctionComponent, useState } from "react";
import { View } from "react-native";

import { CustomSpacer, SafeAreaPage, SideMenuV2 } from "../../components";
import { flexRow, fullHW, sw200 } from "../../styles";
import { UploadDocuments, UploadHardCopy } from "./Documents";
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

  const props = { handleRoute: handleRoute, navigation: navigation };
  let content: JSX.Element = <OrderList {...props} />;

  if (route === "OrderDetails") {
    content = <OrderDetails {...props} />;
  }
  if (route === "UploadDocuments") {
    content = <UploadDocuments {...props} />;
  }
  if (route === "UploadHardCopy") {
    content = <UploadHardCopy {...props} />;
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
